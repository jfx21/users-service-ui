import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../security/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const { authToken, logout} = useAuth();
  const navigate = useNavigate();
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          

          {authToken && (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className={location.pathname === '/dashboard' ? 'active' : ''}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  className={location.pathname === '/account' ? 'active' : ''}
                >
                  Account
                </Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          )}

          {!authToken && (
            <>
              <li>
                <Link
                  to="/register"
                  className={location.pathname === '/register' ? 'active' : ''}
                >
                  Register
                </Link>
              </li>
              <li>
                <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
