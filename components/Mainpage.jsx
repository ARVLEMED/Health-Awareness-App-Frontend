import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Layout from './Layout'; // Layout component for consistency
import Navbar from './Navbar'; // Import the Navbar component
import wellnessimage from '../src/assets/wellness.png';
import { getToken } from './Auth'; // Import the getToken function
import { Link } from 'react-router-dom'; // Link component for navigation

const MainPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated
  useEffect(() => {
    const token = getToken(); // Use getToken to fetch the token
    if (token) {
      setIsAuthenticated(true); // If token exists, user is authenticated
    } else {
      setIsAuthenticated(false); // Otherwise, not authenticated
    }
  }, []);

  return (
    <Layout>
      {/* Navbar with Links */}
      <Navbar />

      <Box className="main-page">
        {/* Main Header */}
        <Typography variant="h4" color="primary" sx={{ textAlign: 'center', marginBottom: 2 }}>
          Welcome to Your Health Dashboard
        </Typography>

        {!isAuthenticated ? (
          // If the user is not authenticated, show a login prompt
          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <Typography variant="h6" color="textSecondary">
              You are not logged in. Please{' '}
              <Link to="/login" style={{ color: '#388e3c', textDecoration: 'underline' }}>
                log in
              </Link>{' '}
              to access the dashboard.
            </Typography>
          </Box>
        ) : (
          // If the user is authenticated, show the wellness section
          <Box className="continuum-section">
            <Typography variant="h4" color="primary" sx={{ textAlign: 'center', marginBottom: 2 }}>
              Illness-Wellness Continuum
            </Typography>
            <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 4 }}>
              The Illness-Wellness Continuum is a model that shows a range of states from illness to wellness.
              <br />
              Most important is the direction an individual is facing on the pathway;
              <ul>
                <li>If towards high levels of health, a person has a genuinely optimistic or positive outlook despite his/her health status</li>
                <li>If towards premature death, a person has a genuinely pessimistic or negative outlook about his/her health status</li>
              </ul>
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
              {/* Continuum Image/Chart (Placeholder) */}
              <img
                src={wellnessimage}
                alt="Illness Wellness Continuum"
                style={{ width: '80%', maxWidth: '800px' }}
              />
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default MainPage;
