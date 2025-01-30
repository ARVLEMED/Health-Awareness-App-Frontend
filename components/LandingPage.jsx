import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Card, CardContent, Link as MuiLink, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '../src/assets/logo.avif'; // Importing the logo
import HomeIcon from '@mui/icons-material/Home'; // Import Home Icon
import './Landingpage.css'; // Import CSS file
import axios from 'axios'; // Import Axios for making HTTP requests

const LandingPage = () => {
  const [healthTip, setHealthTip] = useState(''); // State to hold the random health tip
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); // State to handle error

  // Fetch a random health tip from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/health-tips/random') // Backend API URL for random tip
      .then((response) => {
        setHealthTip(response.data.data.tip); // Save the random tip to state
        setLoading(false); // Set loading state to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching health tip: ", error);
        setError('Failed to load health tip');
        setLoading(false); // Set loading state to false
      });
  }, []);

  return (
    <>
      {/* Navigation Bar */}
      <Box className="navbar">
        <IconButton component={Link} to="/" aria-label="Home">
          <HomeIcon />
        </IconButton>
        <Box className="nav-links">
          <Button variant="outlined" color="primary" component={Link} to="/about" aria-label="About">
            About
          </Button>
          <Button variant="contained" color="primary" component={Link} to="/login" aria-label="Login">
            Login
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/signup" aria-label="Sign Up">
            Sign Up
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box className="main-content">
        {/* Logo Section - Centered inside the main container */}
        <Box className="logo-section">
          <img
            src={Logo}
            alt="Health Awareness App Logo"
            className="logo-image"
          />
          <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
            Health Awareness App
          </Typography>
        </Box>

        {/* Welcome Text */}
        <Typography component="h3" variant="h5" color="primary" gutterBottom>
          Your companion for a healthier lifestyle. Discover health tips, track your wellness, and much more.
        </Typography>

        {/* Health Tips Section */}
        <Box className="health-tips-section">
          <Typography variant="h4" color="secondary" gutterBottom>
            Health Tip of the Day
          </Typography>
          <Card className="health-tip-card">
            <CardContent>
              {loading ? (
                <Typography variant="h6" color="textPrimary">
                  Loading health tip...
                </Typography>
              ) : error ? (
                <div>
                  <Typography variant="h6" color="error">
                    {error}
                  </Typography>
                  <Button onClick={() => setLoading(true)} variant="outlined" color="primary">
                    Retry
                  </Button>
                </div>
              ) : (
                <Typography variant="h6" color="textPrimary" sx={{ fontStyle: 'italic' }}>
                  "{healthTip}"
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>

        {/* Feedback and Copyright Section */}
        <Box className="feedback-section">
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Have feedback? <MuiLink href="/feedback" underline="hover" color="primary">Let us know</MuiLink>.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            © {new Date().getFullYear()} Health Awareness App. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
