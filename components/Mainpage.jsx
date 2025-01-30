import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from './Layout'; // Layout component for consistency
import './Mainpage.css'; // Import CSS file for custom styling
import Navbar from './Navbar'; // Import the Navbar component
import wellnessimage from '../src/assets/wellness.png';

const MainPage = () => {
  return (
    <Layout>
      {/* Navbar with Links */}
      <Navbar />

      <Box className="main-page">
        {/* Main Header */}
        <Typography variant="h4" color="primary" sx={{ textAlign: 'center', marginBottom: 2 }}>
          Welcome to Your Health Dashboard
        </Typography>

        {/* Illness-Wellness Continuum Section */}
        <Box className="continuum-section">
          <Typography variant="h4" color="primary" sx={{ textAlign: 'center', marginBottom: 2 }}>
            Illness-Wellness Continuum
          </Typography>
          <Typography variant="h6" color="textSecondary" sx={{ marginBottom: 4 }}>
            The Illness-Wellness Continuum is a model that shows a range of states from illness to wellness.
            <br/> 
            Most important is the direction an individual is facing on the pathway;
            <ul>
            <li>If towards high levels of health, a person has a genuinely optimistic or positive outlook despite his/her health status</li>
    
            <li>If towards premature death, a person has a genuinely pessimistic or negative outlook about his/her health status</li>
            </ul>
            
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
            {/* Continuum Image/Chart (Placeholder) */}
            <img src={wellnessimage} alt="Illness Wellness Continuum" style={{ width: '80%', maxWidth: '800px' }} />
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default MainPage;
