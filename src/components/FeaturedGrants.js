import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Typography } from '@mui/material'; // Keep Typography for title

// Helper function to parse "DD-Mon-YY" into a Date object
function parseDeadline(deadlineStr) {
  if (!deadlineStr || typeof deadlineStr !== 'string') return null;
  const parts = deadlineStr.split('-');
  if (parts.length !== 3) return null;

  const day = parseInt(parts[0], 10);
  const monthStr = parts[1];
  const yearShort = parseInt(parts[2], 10);

  const monthMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
  const month = monthMap[monthStr];
  const year = 2000 + yearShort; // Assuming 20YY

  if (isNaN(day) || month === undefined || isNaN(year)) return null;

  // Use UTC to avoid timezone issues if dates are meant to be universal
  const date = new Date(Date.UTC(year, month, day));
  // Validate the parsed date components
  if (date.getUTCFullYear() !== year || date.getUTCMonth() !== month || date.getUTCDate() !== day) {
      return null;
  }
  return date;
}


const FeaturedGrants = () => {
  const [featuredGrant, setFeaturedGrant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetFeaturedGrant = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/grants');
        const allGrants = response.data;
        const now = new Date();

        // Filter for grants with valid, future deadlines and parse them
        const upcomingGrants = allGrants
          .map(grant => ({
            ...grant,
            parsedDeadline: parseDeadline(grant.deadline)
          }))
          .filter(grant => grant.parsedDeadline && grant.parsedDeadline > now);

        // Sort by deadline ascending
        upcomingGrants.sort((a, b) => a.parsedDeadline - b.parsedDeadline);

        // Set the grant with the nearest deadline
        setFeaturedGrant(upcomingGrants.length > 0 ? upcomingGrants[0] : null);

      } catch (error) {
        console.error("Error fetching grants for featured section:", error);
        setFeaturedGrant(null); // Handle error state
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetFeaturedGrant();
  }, []);

  // --- Copy styles from ExploreGrants.js ---
  const cardStyle = {
    backgroundColor: '#f5f5f5',
    padding: '15px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    maxWidth: '300px', // Adjust width as needed for a single featured card
    margin: '0 auto', // Center the card
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
    <div style={{ padding: '40px', backgroundColor: 'white' }}>
      <Typography variant="h4" align="center" gutterBottom style={{ color: '#333' }}>
        Featured Grant
      </Typography>
      {loading ? (
        <Typography align="center">Loading featured grant...</Typography>
      ) : featuredGrant ? (
        <div style={cardStyle}>
          <div>
            <img
              src={featuredGrant.imageUrl || 'https://via.placeholder.com/300x140?text=Grant+Image'}
              alt={featuredGrant.title}
              style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '5px' }}
            />
            <h3 style={cardTitleStyle}>{featuredGrant.title}</h3>
            <p style={cardTextStyle}>
              Amount: {featuredGrant.amount}
            </p>
            <p style={deadlineStyle}>
              Deadline: {featuredGrant.deadline}
            </p>
          </div>
          <Link to={`/grants/${featuredGrant._id}`} style={cardLinkStyle}>Learn More</Link>
        </div>
      ) : (
        <Typography align="center">No upcoming grants found.</Typography>
      )}
    </div>
  );
};

export default FeaturedGrants;