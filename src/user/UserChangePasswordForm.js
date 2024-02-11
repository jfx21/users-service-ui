import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserChangePasswordForm = () => {
  const username = Cookies.get('username')
  console.log(username)
  const [passwordInfo, setPasswordInfo] = useState({
    username: username,
    currentPassword: '',
    newPassword: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = (await axios.post('http://localhost:8080/user/change-password', passwordInfo));

      if (response.status === 200) {
        setSuccessMessage('Password changed successfully');
        setPasswordInfo({
          currentPassword: '',
          newPassword: '',
        });
      } else {
        console.log('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error changing password:', error.response?.data || 'An unexpected error occurred');
    }
  };

  const handleChange = (e) => {
    setPasswordInfo({
      ...passwordInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Current Password:
          <input type="password" name="currentPassword" value={passwordInfo.currentPassword} onChange={handleChange} />
        </label>
        <br />
        <label>
          New Password:
          <input type="password" name="newPassword" value={passwordInfo.newPassword} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default UserChangePasswordForm;
