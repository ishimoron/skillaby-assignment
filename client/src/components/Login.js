import React from 'react';
import axios from 'axios';

import toast, { Toaster } from 'react-hot-toast';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const sendData = async (data) => {
    const { username, firstName, lastName, email, password } = data;
    try {
      const response = await axios.post('/api/user', {
        username,
        firstName,
        lastName,
        email,
        password,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="mb-4 mt-4 d-flex justify-content-center align-items-center">
      <Toaster position="top-left" />
      <Form onSubmit={handleSubmit(sendData)} className="w-50">
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            {...register('username', {
              required: 'Username is required field',
              minLength: {
                value: 5,
                message: 'Minimum length should be 5 characters',
              },
            })}
          />
          {errors.username && (
            <span className="d-block text-danger">
              {errors.username.message}
            </span>
          )}
        </Form.Group>

        <Form.Group controlId="firstName" className="mt-2">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            {...register('firstName', {
              required: 'First Name is required field',
              minLength: {
                value: 5,
                message: 'Minimum length should be 5 characters',
              },
            })}
          />
          {errors.firstName && (
            <span className="d-block text-danger">
              {errors.firstName.message}
            </span>
          )}
        </Form.Group>

        <Form.Group controlId="lastName" className="mt-2">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            {...register('lastName', {
              required: 'Last Name is required field',
              minLength: {
                value: 5,
                message: 'Minimum length should be 5 characters',
              },
            })}
          />
          {errors.lastName && (
            <span className="d-block text-danger">
              {errors.lastName.message}
            </span>
          )}
        </Form.Group>

        <Form.Group controlId="email" className="mt-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            {...register('email', {
              required: 'Please enter a valid email',
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && (
            <span className="d-block text-danger">
              Please enter a valid email
            </span>
          )}
        </Form.Group>

        <Form.Group controlId="password" className="mt-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                message:
                  'Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number, and be at least 8 characters long',
              },
              maxLength: {
                value: 30,
                message: 'Password must be at least 30 characters long',
              },
            })}
          />
          {errors.password && (
            <span className="d-block text-danger">
              {errors.password.message}
            </span>
          )}
        </Form.Group>

        <Button type="submit" size="lg" className="mt-4 w-100">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default Login;
