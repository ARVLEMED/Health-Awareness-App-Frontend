import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import './About.css'; // Import CSS file for custom styling

const AboutPage = () => {
  return (
    <Box className="about-page">
      {/* About Header */}
      <Typography variant="h3" color="primary" sx={{ textAlign: 'center', marginBottom: 4 }}>
        About Health Awareness App
      </Typography>

      {/* About Content */}
      <Card className="about-content-card">
        <CardContent>
          <Typography variant="h6" color="textPrimary" sx={{ marginBottom: 3 }}>
            The Health Awareness App is designed to help users live a healthier lifestyle by providing daily health tips, information about
            diseases, drugs and preventive measures as per the Community Health Guidlines. It also provides vast articles on health helping
            the users be up to date with current health trends. The later version of the app will be empowered with AI to provide guidlines 
            on first AID and Emergencies with the capacity to recommend nearby health facilities based on the location of the user in cases 
            of severity of signs and symptoms or emergencies with provision of contacts for the facilities.
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Our mission is to promote wellness through accessible information and easy-to-use features. Our goal is to empower individuals to take control of their health with the support of science-backed health tips and lifestyle guidance.
            <br/>
            Hosea 4:6 -"My people are destroyed for lack of knowledge..."
          </Typography>
        </CardContent>
      </Card>

      {/* Navigation Button */}
      <Box sx={{ marginTop: 4, textAlign: 'center' }}>
        <Button variant="contained" color="primary" component={Link} to="/" aria-label="Back to Home">
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default AboutPage;
