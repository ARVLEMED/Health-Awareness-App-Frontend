import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import Layout from './Layout';
import Navbar from './Navbar';
import { getToken } from './Auth'; // Import the getToken function

const CommunityHealth = () => {
  const [preventiveMeasures, setPreventiveMeasures] = useState([]);
  const [error, setError] = useState(null);  // For handling errors

  useEffect(() => {
    const fetchPreventiveMeasures = async () => {
      const token = getToken();  // Use getToken function to retrieve the token

      if (!token) {
        console.error('No token found, please log in!');
        setError('You need to be logged in to access this data.');
        return;
      }

      try {
        const response = await fetch('https://health-awareness-app-backend-8.onrender.com/api/preventive-measures', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Attach the JWT token to the request
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.success) {
          setPreventiveMeasures(data.data);  // Assuming the data is in 'data' field
        } else {
          console.error('Error fetching preventive measures:', data.message);
          setError(data.message);  // Show error message from the backend
        }
      } catch (error) {
        console.error('Error fetching preventive measures:', error);
        setError('Failed to fetch preventive measures. Please try again later.');
      }
    };

    fetchPreventiveMeasures();
  }, []);

  return (
    <Layout>
      <Navbar />
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3, color: '#388e3c' }}>
          Community Health Preventive Measures
        </Typography>
        
        {error && (
          <Typography variant="body1" sx={{ color: 'red', marginBottom: 2 }}>
            {error}  {/* Show the error message */}
          </Typography>
        )}

        <Grid container spacing={4}>
          {preventiveMeasures.length > 0 ? (
            preventiveMeasures.map((measure, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                      {measure.title}
                    </Typography>
                    <Typography variant="body1" sx={{ marginTop: 1, color: '#616161' }}>
                      {measure.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" sx={{ color: '#757575' }}>
              No preventive measures available.
            </Typography>
          )}
        </Grid>
      </Box>
    </Layout>
  );
};

export default CommunityHealth;
