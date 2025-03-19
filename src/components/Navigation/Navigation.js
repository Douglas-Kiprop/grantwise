import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Typography, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from '../../context/AuthContext'; // Make sure this path is correct

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GrantWise
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/" startIcon={<HomeIcon />}>
            Home
          </Button>
          
          <Button color="inherit" component={Link} to="/grants" startIcon={<ListAltIcon />}>
            Grants
          </Button>

          {isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/dashboard" startIcon={<DashboardIcon />}>
                Dashboard
              </Button>
              
              <Button color="inherit" component={Link} to="/profile" startIcon={<PersonIcon />}>
                Profile
              </Button>
              
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;