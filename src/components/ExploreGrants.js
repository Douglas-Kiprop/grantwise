import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported

// Accept categoryName as a prop
const ExploreGrants = ({ categoryName }) => {
  const [grants, setGrants] = useState([]);
  // Add loading/error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
        // Add sortBy=deadline and sortOrder=asc to the API request
        const response = await axios.get(`/api/grants/search?category=${encodeURIComponent(categoryName)}&limit=4&sortBy=deadline&sortOrder=asc`);
        setGrants(response.data || []); // Ensure grants is always an array
      } catch (error) {
        console.error(`Error fetching ${categoryName} grants:`, error);
        setError(`Could not load grants for ${categoryName}.`);
        setGrants([]); // Set to empty array on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchGrantsByCategory();
  }, [categoryName]); // Re-run effect if categoryName changes

  // --- Add the missing style definitions here ---
  // --- Adjust Style Definitions ---
  const sectionStyle = { padding: '40px 20px', backgroundColor: '#f9f9f9' };
  const containerStyle = { maxWidth: '1200px', margin: '0 auto' };
  const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' };
  const cardStyle = { backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' };
  const cardTitleStyle = { fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '10px', color: '#333' };
  // Style for the "Amount:" label (Bold, Black/Dark Gray)
  const amountLabelStyle = { fontWeight: 'bold', color: '#333', marginRight: '5px' };
  // Style for the Amount value (Bold, Black/Dark Gray)
  const amountValueStyle = { fontWeight: 'bold', color: '#333', display: 'inline' };
  // Style for the "Deadline:" label (Bold, Lighter Gray)
  const deadlineLabelStyle = { fontWeight: 'bold', color: '#777', marginRight: '5px' };
  // Style for the Deadline value (Bold, Lighter Gray)
  const deadlineValueStyle = { fontWeight: 'bold', color: '#777', display: 'inline' };
  // Specific style for the deadline paragraph container
  const deadlineContainerStyle = { fontSize: '0.9rem', marginBottom: '15px' };
  // Style for the Learn More link
  const cardLinkStyle = { color: '#007bff', textDecoration: 'none', fontWeight: 'normal' };
  const titleStyle = { fontSize: '2rem', textAlign: 'center', marginBottom: '30px', textTransform: 'capitalize' };
  const messageStyle = { textAlign: 'center', padding: '20px', color: '#555' };
  // --- End of Adjusted Style Definitions ---


  // Don't render the section if no category name is provided
  if (!categoryName) {
      return null;
  }

  return (
    <section id={`${categoryName}-grants`} style={sectionStyle}>
      <div style={containerStyle}>
        {/* Use the categoryName prop for the title - uses titleStyle */}
        <h2 style={titleStyle}>
          {categoryName} Grants
        </h2>

        {/* Uses messageStyle */}
        {isLoading && <div style={messageStyle}>Loading {categoryName} grants...</div>}
        {/* Uses messageStyle */}
        {error && <div style={{ ...messageStyle, color: 'red' }}>{error}</div>}

        {/* Uses messageStyle */}
        {!isLoading && !error && grants.length === 0 && (
            <div style={messageStyle}>No grants currently found for {categoryName}.</div>
        )}

        {!isLoading && !error && grants.length > 0 && (
          <div style={gridStyle}>
            {grants.map((grant) => {
              // --- Format Amount ---
              let displayAmount = 'N/A';
              // First, check if grant.amount exists and is not null
              if (grant.amount != null) {
                  const originalAmountString = String(grant.amount);
                  // Remove non-numeric characters (keeping decimal points) to get the value
                  const cleanedAmountString = originalAmountString.replace(/[^0-9.]/g, '');
                  // Attempt to convert the cleaned string to a number
                  const amountValue = Number(cleanedAmountString);

                  // Check if the conversion resulted in a valid number
                  if (!isNaN(amountValue)) {
                      // Format the number with commas
                      const formattedNumber = amountValue.toLocaleString();

                      // Now, determine the currency display based on the original string
                      if (originalAmountString.includes('€') || originalAmountString.toLowerCase().includes('euro')) {
                          // If Euro symbol or 'euro' text is present
                          displayAmount = '€' + formattedNumber; // Standardize to Euro symbol
                      } else if (originalAmountString.includes('AUD')) {
                          // If 'AUD' is present
                          displayAmount = 'AUD$ ' + formattedNumber;
                      } else if (originalAmountString.includes('$')) {
                          // If '$' is present (and not AUD$)
                          displayAmount = '$' + formattedNumber;
                      } else {
                          // Default/Fallback: If no specific indicator found, but it's a number.
                          // We could just show the number, or default to '$'.
                          // Let's default to '$' for now, but this could be adjusted.
                          // This covers cases like just "50000" or other currencies.
                          displayAmount = '$' + formattedNumber;
                          // Alternatively, to show only the number without assuming currency:
                          // displayAmount = formattedNumber;
                      }
                  }
              }
              // --- Remove the console log if it's still there ---

              // --- Format Deadline ---
              let displayDeadline = 'N/A';
              if (grant.deadline) {
                try {
                  // Use options for 'DD Mon YYYY' format (e.g., 18 Apr 2025)
                  displayDeadline = new Date(grant.deadline).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  });
                } catch (e) {
                  console.error("Error formatting date:", grant.deadline, e);
                  // Keep 'N/A' if formatting fails
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

                  {/* --- Updated Amount Display --- */}
                  <p style={{ fontSize: '0.9rem', marginBottom: '5px' }}> {/* Container paragraph */}
                    {/* Use specific style for amount label */}
                    <span style={amountLabelStyle}>Amount:</span>
                    <span style={amountValueStyle}>{displayAmount}</span>
                  </p>

                  {/* --- Updated Deadline Display --- */}
                  <p style={deadlineContainerStyle}> {/* Container paragraph */}
                    {/* Use specific style for deadline label */}
                    <span style={deadlineLabelStyle}>Deadline:</span>
                    <span style={deadlineValueStyle}>{displayDeadline}</span>
                  </p>

                  {/* --- Updated Link Style --- */}
                  <Link to={`/grants/${grant._id}`} style={cardLinkStyle}>Learn More</Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreGrants;