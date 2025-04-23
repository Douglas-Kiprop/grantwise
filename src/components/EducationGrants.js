import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

// Accept categoryName as a prop
const EducationGrants = ({ categoryName }) => {
  // Note: This component originally showed 3 cards, we'll fetch 4 but the layout might need adjustment
  const [grants, setGrants] = useState([]);
  // Add loading/error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // Add environment variable
  const apiBaseUrl = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    // Only fetch if categoryName is provided
    if (!categoryName) {
        setGrants([]);
        setIsLoading(false); // Ensure loading is false if no category
        setError(null);
        return;
    }

    const fetchGrantsByCategory = async () => {
      setIsLoading(true);
      setError(null);
      setGrants([]); // Clear previous grants
      try {
        const url = `${apiBaseUrl}/grants/search?category=${encodeURIComponent(categoryName)}&limit=4&sortBy=deadline&sortOrder=asc`;
        console.log(`Fetching grants from: ${url}`); // Log the URL
        const response = await axios.get(url);
        console.log(`API response for ${categoryName}:`, response.data); // Log the response
        const data = response.data.data && Array.isArray(response.data.data) ? response.data.data : response.data;
        if (!Array.isArray(data)) {
          console.error(`Expected array for ${categoryName} grants, got:`, data);
          setGrants([]);
        } else {
          // If you strictly want only 3 cards, slice here
          setGrants(data.slice(0, 3));
        }
      } catch (error) {
        console.error(`Error fetching ${categoryName} grants:`, error.response || error.message);
        setError(`Could not load grants for ${categoryName}.`);
        setGrants([]); // Set to empty array on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchGrantsByCategory();
  }, [categoryName, apiBaseUrl]); // Re-run effect if categoryName or apiBaseUrl changes

  // --- Style Definitions ---
  const sectionStyle = { padding: '40px 20px', backgroundColor: '#f9f9f9' };
  const containerStyle = { maxWidth: '1200px', margin: '0 auto' };
  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' };
  const cardStyle = { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };
  const cardTitleStyle = { fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px', color: '#333' };
  const amountLabelStyle = { fontWeight: 'bold', color: '#333', marginRight: '5px' };
  const amountValueStyle = { fontWeight: 'bold', color: '#333', display: 'inline' };
  const deadlineLabelStyle = { fontWeight: 'bold', color: '#777', marginRight: '5px' };
  const deadlineValueStyle = { fontWeight: 'bold', color: '#777', display: 'inline' };
  const deadlineContainerStyle = { fontSize: '0.9rem', marginBottom: '15px' };
  const cardLinkStyle = { color: '#007bff', textDecoration: 'none', fontWeight: 'normal' };
  const titleStyle = { fontSize: '2rem', textAlign: 'center', marginBottom: '30px', textTransform: 'capitalize' };
  const messageStyle = { textAlign: 'center', padding: '20px', color: '#555' };

  // Don't render the section if no category name is provided
  if (!categoryName) {
      return null;
  }

  return (
    <section id={`${categoryName}-grants`} style={sectionStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>
          {categoryName} Grants
        </h2>
        {isLoading && <div style={messageStyle}>Loading {categoryName} grants...</div>}
        {error && <div style={{ ...messageStyle, color: 'red' }}>{error}</div>}
        {!isLoading && !error && grants.length === 0 && (
            <div style={messageStyle}>No grants currently found for {categoryName}.</div>
        )}
        {!isLoading && !error && grants.length > 0 && (
          <div style={gridStyle}>
            {console.log(`Grants before map for ${categoryName}:`, grants)} {/* Log grants */}
            {Array.isArray(grants) ? (
              grants.map((grant) => {
                let displayAmount = 'N/A';
                if (grant.amount != null) {
                  const originalAmountString = String(grant.amount);
                  const cleanedAmountString = originalAmountString.replace(/[^0-9.]/g, '');
                  const amountValue = Number(cleanedAmountString);
                  if (!isNaN(amountValue)) {
                    const formattedNumber = amountValue.toLocaleString();
                    if (originalAmountString.includes('€') || originalAmountString.toLowerCase().includes('euro')) {
                      displayAmount = '€' + formattedNumber;
                    } else if (originalAmountString.includes('AUD')) {
                      displayAmount = 'AUD$ ' + formattedNumber;
                    } else if (originalAmountString.includes('$')) {
                      displayAmount = '$' + formattedNumber;
                    } else {
                      displayAmount = '$' + formattedNumber;
                    }
                  }
                }

                let displayDeadline = 'N/A';
                if (grant.deadline) {
                  try {
                    displayDeadline = new Date(grant.deadline).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    });
                  } catch (e) {
                    console.error("Error formatting date:", grant.deadline, e);
                  }
                }

                return (
                  <div key={grant._id} style={cardStyle}>
                    <img
                      src={grant.imageUrl || `https://via.placeholder.com/300x140?text=${encodeURIComponent(grant.title)}`}
                      alt={grant.title}
                      style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '5px', marginBottom: '15px' }}
                    />
                    <h3 style={cardTitleStyle}>{grant.title}</h3>
                    <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}>
                      <span style={amountLabelStyle}>Amount:</span>
                      <span style={amountValueStyle}>{displayAmount}</span>
                    </p>
                    <p style={deadlineContainerStyle}>
                      <span style={deadlineLabelStyle}>Deadline:</span>
                      <span style={deadlineValueStyle}>{displayDeadline}</span>
                    </p>
                    <Link to={`/grants/${grant._id}`} style={cardLinkStyle}>Learn More</Link>
                  </div>
                );
              })
            ) : (
              <div style={messageStyle}>No valid grants data available for {categoryName}</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
//git 
export default EducationGrants;