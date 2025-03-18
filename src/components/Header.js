import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const headerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const logoStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const navStyle = {
    display: 'flex',
    gap: '20px',
    marginRight: '60px',  // Increased from 20px to 60px to move links left
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    transition: 'opacity 0.3s ease',
  };

  const handleMouseOver = (e) => {
    e.target.style.opacity = '0.8';
  };

  const handleMouseOut = (e) => {
    e.target.style.opacity = '1';
  };

  return (
    <header style={headerStyle}>
      <Link to="/" style={logoStyle}>Grantwise</Link>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Home</Link>
        <Link to="/grants" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Grants</Link>
        <a href="#about-section" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>About</a>
        <a href="#footer" style={linkStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Contact</a>
      </nav>
    </header>
  );
};

export default Header;