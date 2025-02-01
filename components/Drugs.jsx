import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Card, CardContent, Grid } from '@mui/material';
import Layout from './Layout';
import Navbar from './Navbar';
import { getToken } from './Auth'; // Utility to get token from localStorage

const Drugs = () => {
  const [drugs, setDrugs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDrug, setSelectedDrug] = useState(null);

  useEffect(() => {
    const fetchDrugs = async () => {
      const token = getToken(); // Get JWT token from localStorage
      if (!token) {
        console.error('No token found, please log in!');
        return;
      }

      try {
        const response = await fetch('https://health-awareness-app-backend-8.onrender.com/api/drugs', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Attach the JWT token to the request
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        if (data.success) {
          setDrugs(data.data);
        } else {
          console.error('Error fetching drugs:', data.message);
        }
      } catch (error) {
        console.error('Error fetching drugs:', error);
      }
    };

    fetchDrugs();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDrugSelect = (drug) => {
    setSelectedDrug(drug);
  };

  const filteredDrugs = drugs.filter((drug) =>
    drug.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <Navbar />
      <Box sx={{ padding: '20px', overflow: 'hidden', maxHeight: '100vh' }}>
        <Typography variant="h4" sx={{ marginBottom: '20px', marginTop: '20px', color: '#388e3c', fontWeight: 'bold' }}>
          Drugs Information
        </Typography>

        <TextField
          label="Search for a drug"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ marginBottom: '20px' }}
        />

        <Grid container spacing={3}>
          {/* Drugs List */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ marginBottom: '10px', color: 'green' }}>
              Drug List
            </Typography>
            <Box sx={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {filteredDrugs.map((drug, index) => (
                <Card
                  key={index}
                  sx={{
                    marginBottom: '10px',
                    cursor: 'pointer',
                    backgroundColor: selectedDrug?.id === drug.id ? '#e8f5e9' : '#ffffff',
                  }}
                  onClick={() => handleDrugSelect(drug)}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#388e3c' }}>
                      {drug.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Category: {drug.category}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>

          {/* Drug Details */}
          <Grid item xs={12} md={8}>
            {selectedDrug ? (
              <Card sx={{ padding: '20px', boxShadow: 3, maxHeight: '80vh', overflowY: 'auto' }}>
                <Typography variant="h5" sx={{ marginBottom: '20px', color: '#388e3c' }}>
                  {selectedDrug.name}
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                  Usage:
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                  {selectedDrug.usage}
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                  Dosage:
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                  {selectedDrug.dosage}
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                  Side Effects:
                </Typography>
                <Box sx={{ maxHeight: '200px', overflowY: 'auto', paddingLeft: '20px' }}>
                  <ul>
                    {selectedDrug.sideEffects?.map((sideEffect, index) => (
                      <li key={index}>
                        <Typography variant="body1">{sideEffect}</Typography>
                      </li>
                    )) || <Typography variant="body1">No side effects listed</Typography>}
                  </ul>
                </Box>
                <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                  Precautions:
                </Typography>
                <Box sx={{ maxHeight: '200px', overflowY: 'auto', paddingLeft: '20px' }}>
                  <ul>
                    {Array.isArray(selectedDrug.precautions) && selectedDrug.precautions.length > 0 ? (
                      selectedDrug.precautions.map((precaution, index) => (
                        <li key={index}>
                          <Typography variant="body1">{precaution}</Typography>
                        </li>
                      ))
                    ) : (
                      <Typography variant="body1">No precautions available</Typography>
                    )}
                  </ul>
                </Box>
              </Card>
            ) : (
              <Typography variant="body1" sx={{ color: '#757575' }}>
                Select a drug to see details.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
};

export default Drugs;
