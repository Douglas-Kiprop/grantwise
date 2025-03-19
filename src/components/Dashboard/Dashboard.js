import React, { useState, useEffect } from 'react';
import { Box, Grid, Paper, Typography, Container, CircularProgress } from '@mui/material';
import { 
  LineChart, Line, PieChart, Pie, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import axios from 'axios';

const Dashboard = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/grants/analytics', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAnalyticsData(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching analytics:', error);
        setError('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
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

  if (!analyticsData) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Typography>No data available</Typography>
    </Box>
  );

  // Format data for charts
  const categoryData = analyticsData.categoryAnalysis.map(cat => ({
    name: cat._id,
    value: cat.count
  }));

  const monthlyData = analyticsData.monthlyTrends.map(trend => ({
    name: `${trend._id.year}-${trend._id.month}`,
    grants: trend.count,
    amount: trend.totalAmount
  }));

  const statusData = analyticsData.statusStats.map(stat => ({
    name: stat._id,
    count: stat.count,
    amount: stat.totalAmount
  }));

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Grant Analytics Dashboard
        </Typography>

        {/* Overview Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Total Grants</Typography>
              <Typography variant="h4">{analyticsData.overview.totalGrants}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">Total Amount</Typography>
              <Typography variant="h4">${analyticsData.overview.totalAmount.toLocaleString()}</Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Charts */}
        <Grid container spacing={3}>
          {/* Category Distribution */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Category Distribution</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Monthly Trends */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Monthly Trends</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="grants" stroke="#8884d8" />
                  <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Status Statistics */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Grant Status Distribution</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                  <Bar dataKey="amount" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;