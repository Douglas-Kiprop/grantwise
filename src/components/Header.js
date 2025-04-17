import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const isLandingPage = location.pathname === '/';
  
  const headerStyle = {
    position: 'fixed', // Keep fixed positioning
    top: 0,
    left: 0,
    right: 0,
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    // Change background from transparent to a semi-transparent dark color
    // Option 1: Solid semi-transparent black
    // background: 'rgba(0, 0, 0, 0.4)', // Adjust the last value (0.4) for desired opacity
    // Option 2: Subtle gradient (often looks good for overlays)
    background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2))', // Fades slightly
    color: 'white',
    transition: 'background-color 0.3s ease', // Optional: smooth transition if background changes
  };
  
  // Add a subtle text shadow for readability
  const textShadowStyle = {
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)', // Adjust shadow as needed
  };
  
  const logoStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '24px',
    fontWeight: 'bold',
    ...textShadowStyle // Apply text shadow
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
    ...textShadowStyle // Apply text shadow
  };
  
  const handleMouseOver = (e) => {
    // Keep hover effect simple or adjust as needed
    e.target.style.color = '#eee'; // Slightly lighter on hover
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
            {/* Apply linkStyle which includes text shadow */}
            <a href="#about-section" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>About</a>
            <Link to="/login" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Login</Link>
            <Link to="/register" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Register</Link>
          </>
        ) : (
          <>
            {/* Apply linkStyle which includes text shadow */}
            <Link to="/dashboard" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Home</Link>
            <Link to="/profile" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Profile</Link>
            <button
              onClick={logout}
              // Combine styles, including text shadow from linkStyle
              style={{...linkStyle, border: 'none', background: 'none', cursor: 'pointer', padding: 0, fontSize: 'inherit'}}
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