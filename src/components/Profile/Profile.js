import React, { useState, useEffect } from 'react';
import { 
  Container, Paper, Typography, Box, Button, TextField, Alert,
  Divider, Avatar, IconButton
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import PasswordStrengthIndicator from '../common/PasswordStrengthIndicator';
import axios from 'axios';
import { validatePassword } from '../../utils/passwordValidation';
import DashboardHeader from '../Dashboard/DashboardHeader';

const Profile = () => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    organization: '',
    phone: '',
    name: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);

      try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/api/profile/upload-image', 
          formData,
          {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        setProfileImage(response.data.imageUrl);
        setSuccess('Profile picture updated successfully');
      } catch (err) {
        setError('Failed to upload profile picture');
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      // Update the URL to match your backend route
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setProfile(response.data);
    } catch (err) {
      console.error('Profile error:', err.response || err);
      setError(err.response?.data?.message || 'Failed to load profile');
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // Update the URL to match your backend route
      await axios.put('http://localhost:5000/api/profile', profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Profile updated successfully');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
      setSuccess('');
    }
  };

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    const validation = validatePassword(passwordData.newPassword);
    if (!validation.isValid) {
      setError(validation.errors.join('\n'));
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/profile/password', passwordData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Password updated successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
      setSuccess('');
    }
  };

  return (
    <>
      <DashboardHeader />
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>Profile</Typography>
          <Paper elevation={3} sx={{ p: 4 }}>
            {/* Add this before the form */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  src={profileImage || profile.imageUrl}
                  sx={{ width: 100, height: 100 }}
                />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                  sx={{
                    position: 'absolute',
                    bottom: -10,
                    right: -10,
                    backgroundColor: 'white'
                  }}
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleImageUpload}
                  />
                  <PhotoCamera />
                </IconButton>
              </Box>
            </Box>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
            
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                fullWidth
                name="username"
                label="Username"
                value={profile.username}
                disabled
              />
              <TextField
                margin="normal"
                fullWidth
                name="name"
                label="Full Name"
                value={profile.name}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                fullWidth
                name="email"
                label="Email"
                value={profile.email}
                disabled
              />
              <TextField
                margin="normal"
                fullWidth
                name="organization"
                label="Organization"
                value={profile.organization}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                fullWidth
                name="phone"
                label="Phone Number"
                value={profile.phone}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                Update Profile
              </Button>
            </form>
            
            <Divider sx={{ my: 4 }} />
            
            <Typography variant="h5" gutterBottom>Change Password</Typography>
            <form onSubmit={handlePasswordChange}>
              <TextField
                margin="normal"
                fullWidth
                name="currentPassword"
                label="Current Password"
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value
                })}
              />
              <TextField
                margin="normal"
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value
                })}
              />
              <PasswordStrengthIndicator password={passwordData.newPassword} />
              <TextField
                margin="normal"
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value
                })}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
              >
                Change Password
              </Button>
            </form>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Profile;