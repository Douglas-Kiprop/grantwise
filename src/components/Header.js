import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const isLandingPage = location.pathname === '/';
  
  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent)',
    overflow: 'hidden',
    maxWidth: '100vw'
  };
  
  const logoStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '24px',
    fontWeight: 'bold',
  };
  
  const navStyle = {
    display: 'flex',
    gap: '30px',
    marginRight: '80px',
  };
  
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  };
  
  const handleMouseOver = (e) => {
    e.target.style.color = '#ddd';
  };
  
  const handleMouseOut = (e) => {
    e.target.style.color = 'white';
  };
  
  return (
    <header style={headerStyle}>
      <Link to="/" style={logoStyle}>Grantwise</Link>
      <nav style={navStyle}>
        {isLandingPage ? (
          <>
            <a href="#about-section" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>About</a>
            <Link to="/login" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Login</Link>
            <Link to="/register" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Home</Link>
            <Link to="/profile" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Profile</Link>
            <button 
              onClick={logout} 
              style={{...linkStyle, border: 'none', background: 'none', cursor: 'pointer'}}
              onMouseOver={handleMouseOver} 
              onMouseOut={handleMouseOut}
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;