import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeaturedGrants = () => {
  const [featuredGrant, setFeaturedGrant] = useState(null);

  useEffect(() => {
    // Simulated grant data with a real image from Pexels
    const mockGrant = {
      id: 1,
      title: "Youth Innovation Fund 2024",
      amount: "$5,000",
      deadline: "2025-04-15",
      description: "Supporting young entrepreneurs in Kenya with innovative ideas.",
      imageUrl: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    };
    setFeaturedGrant(mockGrant);
  }, []);

  const sectionStyle = {
    backgroundColor: '#e6f2ff',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    borderRadius: '8px',
    boxSizing: 'border-box',
    width: '100%',
  };

  const contentStyle = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    flexDirection: window.innerWidth < 768 ? 'column' : 'row',
  };

  const imageStyle = {
    width: window.innerWidth < 768 ? '100%' : '50%',
    borderRadius: '5px',
  };

  const ctaButtonStyle = {
    display: 'inline-block',
    padding: '0.8rem 2rem',
    border: '2px solid #333',
    borderRadius: '5px',
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    marginTop: '1rem',
    transition: 'all 0.3s ease',
  };

  if (!featuredGrant) return null;

  return (
    <section id="featured-grants" style={sectionStyle}>
      <div style={contentStyle}>
        <img src={featuredGrant.imageUrl} alt={featuredGrant.title} style={imageStyle} />
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
            Featured Grant: {featuredGrant.title}
          </h2>
          <p style={{ color: '#000', fontWeight: 'bold', fontSize: '1.2rem' }}>
            Amount: {featuredGrant.amount}
          </p>
          <p style={{ color: '#666', fontWeight: 'bold' }}>
            Deadline: {new Date(featuredGrant.deadline).toLocaleDateString()}
          </p>
          <p style={{ margin: '1rem 0' }}>{featuredGrant.description}</p>
          <Link to={`/grants/${featuredGrant.id}`} style={ctaButtonStyle}>Apply Now</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGrants;