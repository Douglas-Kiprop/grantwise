import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ExploreGrants = () => {
  const [grants, setGrants] = useState([]);

  useEffect(() => {
    // Simulated business grants with real images from Pexels
    const mockGrants = [
      {
        id: 5,
        title: "Small Business Growth Fund",
        amount: "$7,500",
        deadline: "2025-08-01",
        imageUrl: "https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        id: 6,
        title: "Tech Startup Accelerator",
        amount: "$15,000",
        deadline: "2025-08-15",
        imageUrl: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        id: 7,
        title: "Women Entrepreneurs Initiative",
        amount: "$10,000",
        deadline: "2025-09-01",
        imageUrl: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        id: 8,
        title: "Rural Business Development",
        amount: "$12,500",
        deadline: "2025-09-15",
        imageUrl: "https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg?auto=compress&cs=tinysrgb&w=600"
      }
    ];
    setGrants(mockGrants);
  }, []);

  const sectionStyle = {
    backgroundColor: 'white', // Changed to white
    padding: '40px',
    color: '#333', // Changed to dark text for white background
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  };

  const cardStyle = {
    backgroundColor: '#f5f5f5',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  };

  const cardTitleStyle = {
    fontSize: '1.3rem',
    margin: '10px 0',
    color: '#333',
  };

  const cardTextStyle = {
    color: '#000',
    fontWeight: 'bold',
    margin: '8px 0',
  };

  const deadlineStyle = {
    color: '#666',
    fontWeight: 'bold',
    margin: '8px 0',
  };

  const cardLinkStyle = {
    color: '#0066cc',
    textDecoration: 'underline',
    display: 'inline-block',
    marginTop: '10px',
  };

  return (
    <section id="business-grants" style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '20px' }}>Business Grants</h2>
        <div style={gridStyle}>
          {grants.map((grant, index) => (
            <div key={index} style={cardStyle}>
              <img src={grant.imageUrl} alt={grant.title} style={{ width: '100%', borderRadius: '5px' }} />
              <h3 style={cardTitleStyle}>{grant.title}</h3>
              <p style={cardTextStyle}>
                Amount: {grant.amount}
              </p>
              <p style={deadlineStyle}>
                Deadline: {new Date(grant.deadline).toLocaleDateString()}
              </p>
              <Link to={`/grants/${grant.id}`} style={cardLinkStyle}>Learn More</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreGrants;