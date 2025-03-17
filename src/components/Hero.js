import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const heroStyle = {
    height: '600px',
    backgroundImage: `linear-gradient(rgba(70, 70, 70, 0.6), rgba(40, 40, 40, 0.7)), url("https://images.pexels.com/photos/15496542/pexels-photo-15496542.jpeg")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  };

  const headingStyle = {
    color: 'white',
    fontSize: '48px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const subheadingStyle = {
    color: 'white',
    fontSize: '20px',
    textAlign: 'center',
    marginBottom: '2rem',
    maxWidth: '800px',
    textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
  };

  const ctaButtonStyle = {
    padding: '15px 30px',
    color: 'white',
    backgroundColor: 'rgba(51, 51, 51, 0.8)',
    border: '2px solid white',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '18px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const ctaHoverStyle = {
    backgroundColor: 'white',
    color: '#333',
  };

  return (
    <div style={heroStyle}>
      <h1 style={headingStyle}>AI Powered Grant Finder</h1>
      <p style={subheadingStyle}>
        Discover the perfect funding opportunities for your projects in Kenya with our intelligent grant matching system
      </p>
      <a 
        href="#featured-grants" 
        style={ctaButtonStyle}
        onClick={(e) => {
          e.preventDefault();
          document.getElementById('featured-grants').scrollIntoView({ 
            behavior: 'smooth' 
          });
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = 'white';
          e.target.style.color = '#333';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = 'rgba(51, 51, 51, 0.8)';
          e.target.style.color = 'white';
        }}
      >
        Explore Grants
      </a>
    </div>
  );
};

export default Hero;