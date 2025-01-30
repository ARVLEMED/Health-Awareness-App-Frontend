import React from 'react';
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import Layout from './Layout';
import Navbar from './Navbar';

const CommunityHealth = () => {
  const preventiveMeasures = [
    {
      title: 'Vaccination',
      description: 'Ensure timely vaccination for various diseases like measles, polio, and influenza.',
    },
    {
      title: 'Sanitation and Hygiene',
      description: 'Regular handwashing and proper sanitation can reduce the spread of many infectious diseases.',
    },
    {
      title: 'Exercise and Fitness',
      description: 'Encourage regular physical activity to prevent diseases like heart disease, diabetes, and obesity.',
    },
    {
      title: 'Safe Drinking Water',
      description: 'Access to clean and safe drinking water prevents waterborne diseases and promotes overall health.',
    },
    {
      title: 'Mental Health Awareness',
      description: 'Educate the community about mental health, stress management, and access to psychological services.',
    },
  ];

  return (
    <Layout>
      <Navbar/>
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: 3, color: '#388e3c' }}>
        Community Health Preventive Measures
      </Typography>
      <Grid container spacing={4}>
        {preventiveMeasures.map((measure, index) => (
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
        ))}
      </Grid>
    </Box>
    </Layout>
  );
};

export default CommunityHealth;
