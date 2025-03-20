import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import DashboardHeader from '../Dashboard/DashboardHeader';

const Home = () => {
  const grantData = [
    { month: 'Jan', applications: 4, approved: 2 },
    { month: 'Feb', applications: 6, approved: 3 },
    { month: 'Mar', applications: 8, approved: 5 },
    { month: 'Apr', applications: 10, approved: 6 },
  ];

  return (
    <>
      <DashboardHeader />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to GrantWise
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Your Grant Management Solution
          </Typography>

          <Grid container spacing={3} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f5f5f5' }}>
                <Typography variant="h6">Total Grants</Typography>
                <Typography variant="h3" color="primary">24</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f5f5f5' }}>
                <Typography variant="h6">Applications</Typography>
                <Typography variant="h3" color="secondary">12</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f5f5f5' }}>
                <Typography variant="h6">Success Rate</Typography>
                <Typography variant="h3" style={{ color: '#4caf50' }}>75%</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>Grant Applications Overview</Typography>
                <LineChart width={800} height={300} data={grantData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="applications" stroke="#8884d8" />
                  <Line type="monotone" dataKey="approved" stroke="#82ca9d" />
                </LineChart>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Home;