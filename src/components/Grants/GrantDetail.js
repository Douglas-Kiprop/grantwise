import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, Paper, Typography, Box, Button, 
  CircularProgress, Alert, Grid, Divider 
} from '@mui/material';
import axios from 'axios';
import DashboardHeader from '../Dashboard/DashboardHeader';

const GrantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [grant, setGrant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Define apiBaseUrl using the environment variable
  const apiBaseUrl = process.env.REACT_APP_API_URL || ''; // Use empty string as fallback like in GrantList

  useEffect(() => {
    const fetchGrant = async () => {
      try {
        // Use apiBaseUrl in the request
        const response = await axios.get(`${apiBaseUrl}/grants/${id}`);
        setGrant(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load grant details');
        console.error("Grant detail fetch error:", err); // Added console log for debugging
      } finally {
        setLoading(false);
      }
    };

    fetchGrant();
  }, [id, apiBaseUrl]); // Add apiBaseUrl to the dependency array

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Alert severity="error">{error}</Alert>
    </Box>
  );

  if (!grant) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Typography>Grant not found</Typography>
    </Box>
  );

  return (
    <>
      <DashboardHeader />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Button onClick={() => navigate('/grants')} sx={{ mb: 3 }}>
          Back to Grants
        </Button>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                {grant.title}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1" paragraph>
                {grant.description}
              </Typography>
              <Box sx={{ my: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Eligibility
                </Typography>
                <Typography variant="body1">
                  {grant.eligibility}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h6" gutterBottom>
                  Grant Details
                </Typography>
                <Box sx={{ my: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Amount
                  </Typography>
                  <Typography variant="h5">
                    {grant.amount}
                  </Typography>
                </Box>
                <Box sx={{ my: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Deadline
                  </Typography>
                  <Typography variant="h6">
                    {grant.deadline}
                  </Typography>
                </Box>
                <Box sx={{ my: 2 }}>
                  <Typography variant="subtitle1" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="h6">
                    {grant.category}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={() => window.open(grant.applicationUrl, '_blank')}
                >
                  Apply Now
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default GrantDetail;