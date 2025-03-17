import React from 'react';

const About = () => {
  const sectionStyle = {
    backgroundColor: '#333', // Changed to dark background similar to footer
    padding: '60px 20px',
    color: 'white', // Changed text color to white for better contrast
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  };

  const contentStyle = {
    flex: 1,
  };

  const imageStyle = {
    flex: 1,
    width: '100%',
    borderRadius: '5px',
  };

  return (
    <section id="about-section" style={sectionStyle}>
      <div style={containerStyle}>
        <div style={contentStyle}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Empowering Kenyans with Funding Opportunities
          </h2>
          <p style={{ color: '#f0f0f0', lineHeight: 1.6 }}>
            Our mission is to make grant discovery seamless for Kenyan individuals, 
            businesses, and organizations. We believe in connecting ambitious projects 
            with the right funding opportunities, fostering innovation and growth 
            across the nation. Through our platform, we aim to simplify the grant 
            discovery process and help turn promising ideas into reality.
          </p>
        </div>
        <img 
          src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600" 
          alt="Empowering Kenyans with funding opportunities" 
          style={imageStyle}
        />
      </div>
    </section>
  );
};

export default About;