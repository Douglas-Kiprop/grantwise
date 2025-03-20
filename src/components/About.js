import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';

const About = () => {
  return (
    <Box sx={{ 
      py: 6, 
      bgcolor: '#333333'  // Dark grey
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ pr: { md: 4 } }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 600,
                  mb: 2,
                  color: '#ffffff',  // White text for dark background
                  fontSize: '1.8rem'
                }}
              >
                Empowering Kenyans with Funding Opportunities
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#e0e0e0',  // Light grey text for readability
                  mb: 2
                }}
              >
                Our mission is to make grant discovery seamless for Kenyan individuals, 
                businesses, and organizations. We believe in connecting ambitious projects 
                with the right funding opportunities, fostering innovation and growth 
                across the nation.
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: '1rem',
                  lineHeight: 1.6,
                  color: '#e0e0e0'  // Light grey text for readability
                }}
              >
                Through our platform, we aim to simplify the grant 
                discovery process and help turn promising ideas into reality.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ 
              overflow: 'hidden',
              borderRadius: 2,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.01)'
              }
            }}>
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                alt="Team collaborating on projects"
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;