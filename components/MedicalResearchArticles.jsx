import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import Layout from './Layout';
import Navbar from './Navbar';

const MedicalResearchArticles = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <Layout>
      <Navbar/>
    <Box sx={{ padding: '20px' }}>
      {/* Adjusted Headline Styling */}
      <Typography
        variant="h4"
        sx={{
          marginBottom: '20px', // Ensure proper spacing below the headline
          color: '#388e3c', // Green color for visibility
          fontWeight: 'bold',
          textAlign: 'center', // Center alignment for better presentation
          textTransform: 'uppercase', // Optional: Add uppercase styling for emphasis
          marginTop: '60px', // Ensure there is space between the top of the page and the headline
        }}
      >
        Medical Research Articles
      </Typography>

      {/* Information Message */}
      <Typography
        variant="h6"
        sx={{
          color: '#d32f2f', // Red color for emphasis
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        This feature will be available in Version 2 of the app. We apologize for the inconvenience.
      </Typography>

      {/* You can add any other relevant information or controls if needed */}
    </Box>
    </Layout>
  );
};

export default MedicalResearchArticles;
