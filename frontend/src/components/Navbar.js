import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <h1>Task Manager</h1>
      
      <div className="nav-links">
        {isAuthenticated ? (
          <>
            <span>
              {user?.username} ({user?.role})
            </span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
