import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import toast, { Toaster } from 'react-hot-toast';

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get('/api/user')
      .then((res) => setUsers(res.data))
      .catch(() => toast.error('impossible get users'));
  }, []);

  return (
    <>
      <Toaster position="top-left" />
      <div>
        <Table striped bordered hover responsive className="custom-table">
          <thead>
            <tr>
              <th className="equal-width">ID</th>
              <th className="equal-width">Username</th>
              <th className="equal-width">Email</th>
              <th className="equal-width">TalentLMS ID</th>
            </tr>
          </thead>
          <tbody>
            {users.users &&
              users.users.map(({ email, talentlms_id, id, username }) => (
                <tr key={id}>
                  <td className="equal-width">{id}</td>
                  <td className="equal-width">{username}</td>
                  <td className="equal-width">{email}</td>
                  <td className="equal-width">{talentlms_id}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Users;
