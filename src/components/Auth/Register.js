import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api'; // Import the api utility instead of axios

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      // Use the api utility instead of direct axios call
      const response = await api.post('/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      console.log('Registration response:', response.data);
      
      if (response.data.token) {
        // Use the login function from AuthContext
        register(response.data);
        console.log('Registration successful, navigating to dashboard...');
        
        // Force navigation with window.location
        window.location.href = '/dashboard';
      } else {
        setError('Registration failed: No token received');
      }
    } catch (err) {
      console.error('Registration error details:', err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">Register</Typography>
        <Paper elevation={3} sx={{ p: 4, mt: 3, width: '100%' }}>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              name="username"  // Changed from 'name' to 'username'
              label="Username"  // Changed label
              type="text"
              id="username"  // Changed id
              autoFocus
              value={formData.username}  // Changed from name to username
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            <PasswordStrengthIndicator password={formData.password} />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Register;