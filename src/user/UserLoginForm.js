import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../security/AuthContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserLoginForm = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    general: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/user/login',
        loginInfo,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      const userData = response.data;
      const username = Cookies.set('username', userData.username )
      login(userData);
      navigate('/dashboard');

      console.log('User logged in successfully:', response.data);
    } catch (error) {
      console.error('Error logging in:', error.response?.data);

      if (error.response?.status === 401) {
        setErrors({
          email: '',
          password: '',
          general: 'Invalid username or password',
        });
      } else if (error.response?.status === 404) {
        setErrors({
          email: '',
          password: '',
          general: 'User not found',
        });
      } else {
        setErrors({
          email: '',
          password: '',
          general: error.response?.data || 'An error occurred during login.',
        });
      }
    }
  };

  const handleChange = (e) => {
    setErrors({
      email: '',
      password: '',
      general: '',
    });

    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" name="email" onChange={handleChange} />
        <span style={{ color: 'red' }}>{errors.email}</span>
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" onChange={handleChange} />
        <span style={{ color: 'red' }}>{errors.password}</span>
      </label>
      <br />
      <p align="center">
        <button type="submit">Login</button>
      </p>
      <p align="center" style={{ color: 'red' }}>
        {errors.general}
      </p>
    </form>
  );
};

export default UserLoginForm;
