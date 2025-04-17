import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#000',
    color: 'white',
    padding: '40px 20px',
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  };

  const logoSectionStyle = {
    maxWidth: '300px',
  };

  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const linkStyle = {
    color: '#ccc',
    textDecoration: 'none',
    marginBottom: '10px',
    display: 'block',
  };

  // Add style for the logo link to remove default link styling
  const logoLinkStyle = {
    color: 'white', // Inherit or set specific color
    textDecoration: 'none', // Remove underline
  };

  return (
    <footer id="footer" style={footerStyle}>
      <div style={containerStyle}>
        <div style={logoSectionStyle}>
          {/* Wrap the H2 with a Link to the homepage */}
          <Link to="/" style={logoLinkStyle}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: 'rem' }}>
              Grantwise
            </h2>
          </Link>
        </div>

        <div style={columnStyle}>
          <h3 style={{ marginBottom: '1rem' }}>Explore</h3>
          <Link to="/grants" style={linkStyle}>All Grants</Link>
          <Link to="/categories" style={linkStyle}>Categories</Link>
          <Link to="/featured" style={linkStyle}>Featured</Link>
        </div>

        <div style={columnStyle}>
          <h3 style={{ marginBottom: '1rem' }}>Support</h3>
          <Link to="/help" style={linkStyle}>Help Center</Link>
          <Link to="/contact" style={linkStyle}>Contact Us</Link>
          <Link to="/faq" style={linkStyle}>FAQ</Link>
        </div>

        <div style={columnStyle}>
          <h3 style={{ marginBottom: '1rem' }}>About</h3>
          {/* Updated About links */}
          <Link to="/about/mission" style={linkStyle}>Our Mission</Link>
          <Link to="/about/team" style={linkStyle}>Our Team</Link>
          <Link to="/privacy" style={linkStyle}>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;