import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, Grid, Card, CardContent, CardMedia, 
  Typography, Button, Box, CircularProgress, Chip // Added Chip
} from '@mui/material';
import axios from 'axios';
import DashboardHeader from '../Dashboard/DashboardHeader';

const GrantList = () => {
  const [grants, setGrants] = useState([]);

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        const apiBaseUrl = process.env.REACT_APP_API_URL || '';
        const response = await axios.get(`${apiBaseUrl}/grants`); // Updated
        setGrants(response.data);
      } catch (error) {
        console.error('Error fetching grants:', error);
      }
    };
    fetchGrants();
  }, []);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]); // State for categories
  const [selectedCategory, setSelectedCategory] = useState('all'); // State for selected filter

  // Add apiBaseUrl here
  const apiBaseUrl = process.env.REACT_APP_API_URL || '';

  // Fetch categories on component mount - FIXED
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/grants/categories`);
        // Ensure 'all' is always an option, even if the API returns it
        const uniqueCategories = ['all', ...new Set(response.data.filter(cat => cat))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to load categories", err);
        setCategories(['all']); // Default to 'all' if fetch fails
      }
    };
    fetchCategories();
  }, [apiBaseUrl]); // Add apiBaseUrl to the dependency array

  // Fetch grants based on selected category - FIXED
  useEffect(() => {
    const fetchGrants = async () => {
      setLoading(true); // Set loading true when fetching starts
      setError(''); // Clear previous errors
      let url = `${apiBaseUrl}/grants`;
      // Append category query parameter if a specific category (not 'all') is selected
      if (selectedCategory && selectedCategory !== 'all') {
        url += `?category=${encodeURIComponent(selectedCategory)}`;
      }

      try {
        const response = await axios.get(url);
        setGrants(response.data);
      } catch (err) {
        setError(`Failed to load grants${selectedCategory !== 'all' ? ` for category: ${selectedCategory}` : ''}`);
        console.error("Grant fetch error:", err);
        setGrants([]); // Clear grants on error
      } finally {
        setLoading(false); // Set loading false when fetching finishes
      }
    };

    fetchGrants();
  }, [selectedCategory, apiBaseUrl]); // Add apiBaseUrl to dependencies

  // --- Loading and Error states are handled within the return block now ---
  // if (loading) return (
  //   <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
  //     <CircularProgress />
  //   </Box>
  // );

  // if (error) return (
  //   <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
  //     <Typography color="error">{error}</Typography>
  //   </Box>
  // );

  return (
    <>
      <DashboardHeader />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Available Grants
        </Typography>

        {/* Category Filter Section */}
        <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {categories.length > 1 ? categories.map((category) => ( // Only show filters if categories loaded
            <Chip
              key={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)} // Capitalize
              clickable
              color={selectedCategory === category ? 'primary' : 'default'}
              onClick={() => setSelectedCategory(category)}
              sx={{ textTransform: 'capitalize' }} // Ensure consistent capitalization display
            />
          )) : (
             !loading && <Typography variant="body2">Loading categories...</Typography> // Show loading text if categories aren't ready
          )}
        </Box>

        {/* Grant Grid Section - Now includes loading/error handling */}
        {loading ? (
           <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '40vh' }}>
             <CircularProgress />
           </Box>
        ) : error ? (
           <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '40vh' }}>
             <Typography color="error" align="center">{error}</Typography>
           </Box>
        ) : (
          <Grid container spacing={3}>
            {Array.isArray(grants) && grants.length > 0 ? grants.map((grant) => (
              <Grid item xs={12} sm={6} md={4} key={grant._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={grant.imageUrl || 'https://via.placeholder.com/300x140?text=Grant+Image'} // Added placeholder
                    alt={grant.title}
                  />
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div> {/* Wrap content to push button down */}
                      <Typography gutterBottom variant="h5" component="h2">
                        {grant.title}
                      </Typography>
                      <Typography>
                        Amount: {grant.amount}
                      </Typography>
                      <Typography>
                        Deadline: {grant.deadline}
                      </Typography>
                    </div>
                    <Button
                      component={Link}
                      to={`/grants/${grant._id}`}
                      variant="contained"
                      sx={{ mt: 2, alignSelf: 'flex-start' }} // Align button to start
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            )) : (
              // Message when no grants match the filter
              <Grid item xs={12}>
                <Typography sx={{ width: '100%', textAlign: 'center', mt: 4 }}>
                  No grants found {selectedCategory !== 'all' ? `for the category: ${selectedCategory}` : ''}.
                </Typography>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default GrantList;