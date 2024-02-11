import React from 'react';
import UserRegistrationForm from './user/UserRegistrationForm';
import UserLoginForm from './user/UserLoginForm';
import UserChangePasswordForm from './user/UserChangePasswordForm';
import HomePage from './HomePage';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './styles/index.css'
import './styles/styles.css'
import NotFoundPage from './components/functional/NotFoundPage';
import WeatherDashboard from './components/WeatherDashboard';
import Navigation from './components/Navigation';
import Account from './user/Account';
import { AuthProvider } from './security/AuthContext';

const App = () => {
  return (
    <AuthProvider>
    <Router
    ><Navigation />
        <Routes>
          <Route path="/register" element={<UserRegistrationForm />} />
          <Route path="/login" element={<UserLoginForm />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<WeatherDashboard />}/>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/account" element={<Account />}/>
        </Routes>
    </Router>
    </AuthProvider>
  );
};

export default App;
