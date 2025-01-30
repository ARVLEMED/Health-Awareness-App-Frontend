import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Card, CardContent, Grid } from '@mui/material';
import Layout from './Layout';
import Navbar from './Navbar';
import { green } from '@mui/material/colors';

const Diseases = () => {
  const [diseases, setDiseases] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisease, setSelectedDisease] = useState(null);

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/diseases');
        const data = await response.json();

        if (data.success) {
          setDiseases(data.data);
        } else {
          console.error('Error fetching diseases:', data.message);
        }
      } catch (error) {
        console.error('Error fetching diseases:', error);
      }
    };

    fetchDiseases();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDiseaseSelect = (disease) => {
    setSelectedDisease(disease);
  };

  const filteredDiseases = diseases.filter((disease) =>
    disease.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Navbar />
      <Box sx={{ padding: '20px', overflow: 'hidden', maxHeight: '100vh' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px', marginTop: '20px', color: '#388e3c', fontWeight: 'bold' }}>
          Diseases Information
        </Typography>

        <TextField
          label="Search for a disease"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginBottom: '20px' }}
        />

        <Grid container spacing={3}>
          {/* Diseases List */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ marginBottom: '10px', color: 'green' }}>
              Disease List
            </Typography>
            <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {filteredDiseases.map((disease, index) => (
                <Card
                  key={index}
                  sx={{
                    marginBottom: '10px',
                    cursor: 'pointer',
                    backgroundColor: selectedDisease?.id === disease.id ? '#e8f5e9' : '#ffffff',
                  }}
                  onClick={() => handleDiseaseSelect(disease)}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#388e3c' }}>
                      {disease.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Category: {disease.category}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Disease Details */}
          <Grid item xs={12} md={8}>
            {selectedDisease ? (
              <Card sx={{ padding: '20px', boxShadow: 3, maxHeight: '80vh', overflowY: 'auto' }}>
                <Typography variant="h5" sx={{ marginBottom: '20px', color: '#388e3c' }}>
                  {selectedDisease.name}
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                  Causes:
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                  {selectedDisease.causes}
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                  Symptoms:
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                  {selectedDisease.symptoms}
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                  Prevention:
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                  {selectedDisease.prevention}
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                  Treatment:
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                  {selectedDisease.treatment}
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                  Mode of Spread:
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                  {selectedDisease.mode_of_spread}
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                  Incubation Period:
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                  {selectedDisease.incubation_period}
                </Typography>
              </Card>
            ) : (
              <Typography variant="body1" sx={{ color: '#757575' }}>
                Select a disease to see details.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Diseases;
