import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EducationGrants = () => {
  const [grants, setGrants] = useState([]);

  useEffect(() => {
    // Simulated education grants with real images from Pexels
    const mockGrants = [
      {
        id: 13,
        title: "STEM Scholarship Program",
        amount: "$10,000",
        deadline: "2025-11-01",
        imageUrl: "https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        id: 14,
        title: "Teacher Development Fund",
        amount: "$6,500",
        deadline: "2025-11-15",
        imageUrl: "https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        id: 15,
        title: "School Infrastructure Grant",
        amount: "$25,000",
        deadline: "2025-12-01",
        imageUrl: "https://images.pexels.com/photos/256395/pexels-photo-256395.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        id: 16,
        title: "Digital Learning Initiative",
        amount: "$8,000",
        deadline: "2025-12-15",
        imageUrl: "https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=600"
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
    <section id="education-grants" style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '20px' }}>Education Grants</h2>
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

export default EducationGrants;