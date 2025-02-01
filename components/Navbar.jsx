import React from 'react';
import { Box, Button, AppBar, Toolbar, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home'; // Home icon for the navbar
import './Navbar.css'; // Importing Navbar styling


const Navbar = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('access_token');  // Ensure the same key as used when storing the token
    navigate('/');  // Redirect to the login or home page
  };
  

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px' }}>
        {/* Home Button */}
        <IconButton component={Link} to="/mainpage" color="primary" aria-label="Home">
          <HomeIcon />
        </IconButton>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" component={Link} to="/diseases">
            Diseases
          </Button>
          <Button variant="contained" color="primary" component={Link} to="/drugs">
            Drugs
          </Button>
          <Button variant="contained" color="primary" component={Link} to="/community-health">
            Community Health
          </Button>
          <Button variant="contained" color="primary" component={Link} to="/research">
            Medical Research Articles
          </Button>
          <Button variant="contained" color="primary" component={Link} to="/bmicalculator">
            BMI Calculation
          </Button>
        </Box>

        {/* Logout Button (Far right) */}
        <Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            sx={{
              backgroundColor: '#d32f2f', // Red for logout
              '&:hover': {
                backgroundColor: '#b71c1c', // Darker red on hover
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
