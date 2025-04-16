import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Button, Grid } from '@mui/material'; // Keep Grid
import { Link } from 'react-router-dom'; // Import Link

const NGOGrants = () => {
  const [ngoGrants, setNgoGrants] = useState([]);

  useEffect(() => {
    const fetchNgoGrants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/grants?category=ngo');
        setNgoGrants(response.data.slice(0, 4));
      } catch (error) {
        setNgoGrants([]);
      }
    };
    fetchNgoGrants();
  }, []);

  // --- Copy styles from ExploreGrants.js ---
  const cardStyle = {
    backgroundColor: '#f5f5f5',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  };
  const cardTitleStyle = { fontSize: '1.3rem', margin: '10px 0', color: '#333' };
  const cardTextStyle = { color: '#000', fontWeight: 'bold', margin: '8px 0' };
  const deadlineStyle = { color: '#666', fontWeight: 'bold', margin: '8px 0' };
  const cardLinkStyle = { color: '#0066cc', textDecoration: 'underline', display: 'inline-block', marginTop: '10px' };
  // --- End copied styles ---

  return (
    <div style={{ padding: '40px', backgroundColor: 'white' }}> {/* Add section padding/background */}
      <Typography variant="h4" align="center" gutterBottom style={{ color: '#333' }}> {/* Style title */}
        NGO Grants
      </Typography>
      <Grid container spacing={3} justifyContent="center" style={{ maxWidth: '1200px', margin: '0 auto' }}> {/* Add container style */}
        {ngoGrants.map(grant => (
          <Grid item xs={12} sm={6} md={3} key={grant._id}>
            {/* --- Apply ExploreGrants card structure and styles --- */}
            <div style={cardStyle}>
              <div>
                <img
                  src={grant.imageUrl || 'https://via.placeholder.com/300x140?text=Grant+Image'}
                  alt={grant.title}
                  style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '5px' }}
                />
                <h3 style={cardTitleStyle}>{grant.title}</h3>
                <p style={cardTextStyle}>
                  Amount: {grant.amount}
                </p>
                <p style={deadlineStyle}>
                  Deadline: {grant.deadline}
                </p>
              </div>
              <Link to={`/grants/${grant._id}`} style={cardLinkStyle}>Learn More</Link>
            </div>
            {/* --- End card structure --- */}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default NGOGrants;