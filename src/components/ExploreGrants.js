import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios

const ExploreGrants = () => {
  const [grants, setGrants] = useState([]);

  useEffect(() => {
    // Fetch real business grants from the API
    const fetchBusinessGrants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/grants?category=business');
        setGrants(response.data.slice(0, 4)); // Show up to 4 grants
      } catch (error) {
        console.error("Error fetching business grants:", error);
        setGrants([]); // Set to empty array on error
      }
    };
    fetchBusinessGrants();
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
          {grants.map((grant) => ( // Use grant._id for key
            <div key={grant._id} style={cardStyle}>
              {/* Use a placeholder if imageUrl is not available in your real data */}
              <img
                src={grant.imageUrl || 'https://via.placeholder.com/300x140?text=Grant+Image'}
                alt={grant.title}
                style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '5px' }}
              />
              <h3 style={cardTitleStyle}>{grant.title}</h3>
              <p style={cardTextStyle}>
                Amount: {grant.amount} {/* Display amount directly */}
              </p>
              <p style={deadlineStyle}>
                Deadline: {grant.deadline} {/* Display deadline directly */}
              </p>
              {/* Link to the grant detail page using grant._id */}
              <Link to={`/grants/${grant._id}`} style={cardLinkStyle}>Learn More</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreGrants;