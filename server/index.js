const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const axios = require('axios');
const db = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const createUser = async (userData) => {
  try {
    const baseUrl = process.env.DOMAIN;
    const apiKey = process.env.API_KEY;

    const response = await axios.post(`${baseUrl}/usersignup`, userData, {
      headers: {
        Authorization: `Basic ${apiKey}`,
      },
      auth: {
        username: apiKey,
      },
    });

    console.log('User created:', response.data);

    return response.data.id;
  } catch (error) {
    console.error('Error creating user:', error.response.data.error.message);
    throw error;
  }
};

app.post('/api/user', async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let talentlmsUserId;
    try {
      const userData = {
        login: username,
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      };
      talentlmsUserId = await createUser(userData);
    } catch (error) {
      return res.status(409).json({
        message:
          'A user with the same email address or username already exists',
      });
    }

    const query =
      'INSERT INTO users (username, email, password, talentlms_id) VALUES (?, ?, ?, ?)';
    const result = await db.execute(query, [
      username,
      email,
      hashedPassword,
      talentlmsUserId,
    ]);

    console.log('Query result:', result);

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error processing data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/user', async (req, res) => {
  try {
    const query = 'SELECT * FROM users';
    const [users] = await db.execute(query);

    res.status(200).json({ users }).end();
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Internal server error' }).end();
  }
});
