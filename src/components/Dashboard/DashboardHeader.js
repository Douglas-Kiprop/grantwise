import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <AppBar position="static" sx={{ 
      mb: 4, 
      bgcolor: '#212121',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
    }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          onClick={() => navigate('/')}
          sx={{ 
            flexGrow: 1,
            fontWeight: 500,
            letterSpacing: '0.5px',
            cursor: 'pointer',
            '&:hover': { 
              opacity: 0.8
            }
          }}
        >
          GrantWise
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {isDashboard && (
            <Button 
              color="inherit" 
              onClick={() => navigate('/')}
              sx={{ 
                '&:hover': { 
                  bgcolor: 'rgba(255, 255, 255, 0.08)'
                }
              }}
            >
              Home
            </Button>
          )}
          {!isDashboard && (
            <Button 
              color="inherit" 
              onClick={() => navigate('/dashboard')}
              sx={{ 
                '&:hover': { 
                  bgcolor: 'rgba(255, 255, 255, 0.08)'
                }
              }}
            >
              Dashboard
            </Button>
          )}
          <Button 
            color="inherit" 
            onClick={() => navigate('/grants')}
            sx={{ 
              '&:hover': { 
                bgcolor: 'rgba(255, 255, 255, 0.08)'
              }
            }}
          >
            Grants
          </Button>
          <Button 
            color="inherit" 
            onClick={() => navigate('/profile')}
            sx={{ 
              '&:hover': { 
                bgcolor: 'rgba(255, 255, 255, 0.08)'
              }
            }}
          >
            Profile
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;