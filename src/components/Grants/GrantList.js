import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, Grid, Card, CardContent, CardMedia, 
  Typography, Button, Box, CircularProgress 
} from '@mui/material';
import axios from 'axios';
import DashboardHeader from '../Dashboard/DashboardHeader';

const GrantList = () => {
  const [grants, setGrants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/grants');
        setGrants(response.data);
        setError('');
      } catch (err) {
        setError('Failed to load grants');
      } finally {
        setLoading(false);
      }
    };

    fetchGrants();
  }, []);

  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Typography color="error">{error}</Typography>
    </Box>
  );

  return (
    <>
      <DashboardHeader />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Available Grants
        </Typography>
        <Grid container spacing={3}>
          {grants.map((grant) => (
            <Grid item xs={12} sm={6} md={4} key={grant._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={grant.imageUrl || 'https://via.placeholder.com/300x140'}
                  alt={grant.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {grant.title}
                  </Typography>
                  <Typography>
                    Amount: ${grant.amount}
                  </Typography>
                  <Typography>
                    Deadline: {new Date(grant.deadline).toLocaleDateString()}
                  </Typography>
                  <Button 
                    component={Link} 
                    to={`/grants/${grant._id}`}
                    variant="contained"
                    sx={{ mt: 2 }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default GrantList;