import React from 'react';
import { useAuth } from '../security/AuthContext';
import UserChangePasswordForm from './UserChangePasswordForm';

const Account = () => {
  const { authToken, logout } = useAuth();  

  // const handleDeleteAccount = async () => {
  //   try {
  //     await axios.delete('http://localhost:8080/user/settings/delete-account', {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`,
  //       },
  //     });
  //     logout();
  //   } catch (error) {
  //     console.error('Error deleting user account:', error.response?.data || 'An unexpected error occurred');
  //   }
  // };

  if (!authToken) {
    return <div>Please log in to access your account.</div>;
  }

  return (
    <div>
      <h2>Account Page</h2>
      {/* <button onClick={handleDeleteAccount}>Delete Account</button> */}
      <UserChangePasswordForm />
    </div>
  );
};

export default Account;
