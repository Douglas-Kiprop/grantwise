import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const headerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 10,
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    boxSizing: 'border-box',
  };

  const logoStyle = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '24px',
    fontFamily: '"Poppins", sans-serif',
    textDecoration: 'none',
  };

  const navStyle = {
    display: 'flex',
    gap: '20px',
    marginRight: '20px',
  };

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    transition: 'opacity 0.3s ease',
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header style={headerStyle}>
      <Link to="/" style={logoStyle}>Grantwise</Link>
      <nav style={navStyle}>
        <Link to="/" style={navLinkStyle} onMouseOver={(e) => e.target.style.opacity = 0.8} onMouseOut={(e) => e.target.style.opacity = 1}>Home</Link>
        <Link to="/grants" style={navLinkStyle} onMouseOver={(e) => e.target.style.opacity = 0.8} onMouseOut={(e) => e.target.style.opacity = 1}>Grants</Link>
        <a 
          href="#about-section" 
          style={navLinkStyle} 
          onMouseOver={(e) => e.target.style.opacity = 0.8} 
          onMouseOut={(e) => e.target.style.opacity = 1}
        >
          About
        </a>
        <a 
          href="#footer" 
          style={navLinkStyle} 
          onMouseOver={(e) => e.target.style.opacity = 0.8} 
          onMouseOut={(e) => e.target.style.opacity = 1}
        >
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;