import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ThreeCardGrants = () => {
  const [grants, setGrants] = useState([]);

  useEffect(() => {
    // Updated to have 4 youth grants with real images from Pexels
    const mockGrants = [
      {
        id: 1,
        title: "Youth Innovation Challenge",
        amount: "$3,000",
        deadline: "2025-05-15",
        imageUrl: "https://images.pexels.com/photos/7103/writing-notes-idea-conference.jpg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        id: 2,
        title: "Young Entrepreneurs Fund",
        amount: "$5,500",
        deadline: "2025-06-01",
        imageUrl: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        id: 3,
        title: "Digital Skills for Youth",
        amount: "$2,800",
        deadline: "2025-06-15",
        imageUrl: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600"
      },
      {
        id: 4,
        title: "Youth Leadership Program",
        amount: "$4,200",
        deadline: "2025-07-01",
        imageUrl: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600"
      }
    ];
    setGrants(mockGrants);
  }, []);

  const sectionStyle = {
    padding: '40px 20px',
    backgroundColor: 'white',
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
    color: '#666', // Changed to grey
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
    <section id="youth-grants" style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '20px' }}>Youth Grants</h2>
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

export default ThreeCardGrants;