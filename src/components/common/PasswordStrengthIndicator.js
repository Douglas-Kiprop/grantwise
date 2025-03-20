import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20;
    return strength;
  };

  const getStrengthColor = (strength) => {
    if (strength <= 20) return 'error';
    if (strength <= 60) return 'warning';
    return 'success';
  };

  const getStrengthLabel = (strength) => {
    if (strength <= 20) return 'Weak';
    if (strength <= 60) return 'Medium';
    return 'Strong';
  };

  const strength = calculateStrength(password);

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <LinearProgress 
        variant="determinate" 
        value={strength} 
        color={getStrengthColor(strength)}
      />
      <Typography variant="caption" color="textSecondary">
        Password Strength: {getStrengthLabel(strength)}
      </Typography>
    </Box>
  );
};

export default PasswordStrengthIndicator;