import React, { useState } from 'react';
import axios from 'axios';
import UserLoginForm from './UserLoginForm';
import { useAuth } from '../security/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserRegistrationForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [user, setUser] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    username: '',
  });

  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(true);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    phoneNumber: '',
    username: '',
    general: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,7}$/;
    const passwordRegex =/(?=.*[A-Z])(?=.*[!@#$%^&*()-=_+])[A-Za-z\d!@#$%^&*()-=_+]{8,}$/;    
    const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

    setErrors({
      email: '',
      password: '',
      phoneNumber: '',
      username: '',
      general: '',
    });

    if (!emailRegex.test(user.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Please enter a valid email address.' }));
      return;
    }

    if (!passwordRegex.test(user.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password does not meet the requirements.',
      }));
      return;
    }

    if (!phoneRegex.test(user.phoneNumber)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phoneNumber: 'Please enter a valid 9-digit phone number.',
      }));
      return;
    }

    if (!usernameRegex.test(user.username)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: 'Username must be alphanumeric and underscore, 3-20 characters.',
      }));
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/user/register', user);

      console.log('Success!');
      const { token } = response.data;
      login(token); 
      navigate('/login'); 
    } catch (error) {
      console.error('Error registering user:', error.response.data);

      if (error.response.data.isUserInputCorrect === false) {
        const validationExceptions = error.response.data.validationExceptions.validationExceptions;

        if (validationExceptions.includes('Email is taken')) {
          setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is already taken.' }));
        }

        if (validationExceptions.includes('PhoneNumber is taken')) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber: 'Phone number is already taken.',
          }));
        }

        if (validationExceptions.includes('Username is taken')) {
          setErrors((prevErrors) => ({ ...prevErrors, username: 'Username is already taken.' }));
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: 'An error occurred. Please try again later.',
        }));
      }
    }
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowRegistrationForm(false);
  };

  return (
    <div>
      {showRegistrationForm && (
        <form onSubmit={handleSubmit}>
          <h2>User Registration</h2>
          <label>
            Username:
            <input type="text" name="username" onChange={handleChange} />
            <span style={{ color: 'red' }}>{errors.username}</span>
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" onChange={handleChange} />
            <span style={{ color: 'red' }}>{errors.email}</span>
          </label>
          <br />
          <label>
            Phone Number:
            <input type="tel" name="phoneNumber" onChange={handleChange} />
            <span style={{ color: 'red' }}>{errors.phoneNumber}</span>
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" onChange={handleChange} />
            <span style={{ color: 'red' }}>{errors.password}</span>
          </label>
          <p style={{ color: 'red' }}>{errors.general}</p>

          <p align="center">
            <button type="submit">Register</button>
          </p>
          <div align="center">
            <h5>Already have an account?</h5>
            <button type="button" onClick={handleLoginClick}>
              Login here!
            </button>
          </div>
        </form>
      )}

      {showLoginForm && <UserLoginForm />}
    </div>
  );
};

export default UserRegistrationForm;
