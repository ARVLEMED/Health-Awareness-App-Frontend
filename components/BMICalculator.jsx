import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box, Grid } from '@mui/material';
import HeightIcon from '@mui/icons-material/Height';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import InputAdornment from '@mui/material/InputAdornment';
import Layout from './Layout';
import Navbar from './Navbar';
import { getToken } from './Auth'; // Import the getToken function
import { Link } from 'react-router-dom'; // Link component for navigation

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State to track authentication

  // Check if the user is authenticated
  useEffect(() => {
    const token = getToken(); // Use getToken to fetch the token
    if (token) {
      setIsAuthenticated(true); // If token exists, user is authenticated
    } else {
      setIsAuthenticated(false); // Otherwise, not authenticated
    }
  }, []);

  // Function to calculate BMI
  const calculateBMI = () => {
    if (weight && height) {
      const bmiValue = (weight / (height * height)).toFixed(2);
      setBmi(bmiValue);

      if (bmiValue < 18.5) {
        setStatus('Underweight');
      } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
        setStatus('Normal weight');
      } else if (bmiValue >= 25 && bmiValue < 29.9) {
        setStatus('Overweight');
      } else {
        setStatus('Obesity');
      }
    }
  };

  return (
    <Layout>
      <Navbar />
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
        {!isAuthenticated ? (
          // If the user is not authenticated, show a login prompt
          <Box sx={{ textAlign: 'center', marginTop: 4 }}>
            <Typography variant="h6" color="textSecondary">
              You are not logged in. Please{' '}
              <Link to="/login" style={{ color: '#388e3c', textDecoration: 'underline' }}>
                log in
              </Link>{' '}
              to access the BMI calculator.
            </Typography>
          </Box>
        ) : (
          // If the user is authenticated, show the BMI calculator
          <Card sx={{ maxWidth: 600, borderRadius: 3, boxShadow: 4 }}>
            <CardContent sx={{ textAlign: 'center', padding: 4 }}>
              <Typography variant="h4" sx={{ marginBottom: 2, color: '#388e3c', fontWeight: 'bold' }}>
                BMI Calculator
              </Typography>

              <Grid container spacing={2} justifyContent="center">
                {/* Weight Input */}
                <Grid item xs={12} md={5}>
                  <TextField
                    label="Weight (kg)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FitnessCenterIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>

                {/* Height Input */}
                <Grid item xs={12} md={5}>
                  <TextField
                    label="Height (m)"
                    variant="outlined"
                    fullWidth
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <HeightIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ marginBottom: 2 }}
                  />
                </Grid>
              </Grid>

              <Button
                variant="contained"
                color="primary"
                onClick={calculateBMI}
                sx={{
                  marginTop: 2,
                  backgroundColor: '#388e3c',
                  '&:hover': {
                    backgroundColor: '#2c6e2f',
                  },
                }}
              >
                Calculate BMI
              </Button>

              {bmi && (
                <Box sx={{ marginTop: 4 }}>
                  <Typography variant="h5">Your BMI: {bmi}</Typography>
                  <Typography variant="h6" sx={{ color: status === 'Normal weight' ? 'green' : 'red' }}>
                    Status: {status}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        )}
      </Box>
    </Layout>
  );
};

export default BMICalculator;
