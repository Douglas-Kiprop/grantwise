import React from 'react';

const Hero = () => {
  const heroStyle = {
    backgroundImage: `url("https://images.pexels.com/photos/15496542/pexels-photo-15496542.jpeg?auto=compress&cs=tinysrgb&w=1920")`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '600px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    padding: '0 20px',
  };

  return (
    <div style={heroStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          AI POWERED GRANT FINDER
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
          Discover the perfect funding opportunities for your projects in Kenya with our intelligent grant matching system
        </p>
        <button 
          style={{
            padding: '10px 30px',
            border: '2px solid white',
            borderRadius: '4px',
            backgroundColor: 'transparent',
            color: 'white',
            fontSize: '1.1rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = 'white';
            e.target.style.color = 'black';
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = 'white';
          }}
          onClick={() => {
            document.getElementById('featured-grants').scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Hero;