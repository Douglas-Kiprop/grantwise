import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NGOGrants = () => {
  const [grants, setGrants] = useState([]);

  useEffect(() => {
    // Simulated NGO grants with real images from Pexels
    const mockGrants = [
      {
        id: 9,
        title: "Community Empowerment Fund",
        amount: "$7,500",
        deadline: "2025-09-01",
        imageUrl: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        id: 10,
        title: "Social Impact Initiative",
        amount: "$12,000",
        deadline: "2025-09-15",
        imageUrl: "https://images.pexels.com/photos/6994992/pexels-photo-6994992.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        id: 11,
        title: "Grassroots Development Program",
        amount: "$8,200",
        deadline: "2025-10-01",
        imageUrl: "https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        id: 12,
        title: "Humanitarian Aid Grant",
        amount: "$15,000",
        deadline: "2025-10-15",
        imageUrl: "https://images.pexels.com/photos/6647019/pexels-photo-6647019.jpeg?auto=compress&cs=tinysrgb&w=600"
      }
    ];
    setGrants(mockGrants);
  }, []);

  const sectionStyle = {
    backgroundColor: 'white', // Changed to white
    padding: '40px',
    color: '#333',
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
    <section id="ngo-grants" style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '20px' }}>NGO Grants</h2>
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

export default NGOGrants;