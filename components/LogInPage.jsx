import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, CssBaseline, Grid } from '@mui/material';
import axios from 'axios'; // Import axios to make HTTP requests
import "../src/App.css";
import HomeNavbar from './HomeNavbar';
import Layout from './Layout';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to hold error message if login fails
  const navigate = useNavigate(); // To navigate after successful login

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://health-awareness-app-backend-8.onrender.com/api/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Allow cookies and credentials if needed
        }
      );
      if (response.data.token) {
        // Save the token to localStorage
        localStorage.setItem('access_token', response.data.token);
        console.log("Login successful:", response.data);
        navigate('/mainpage'); // Redirect to the main page after successful login
      } else {
        setError('Unexpected response. Please try again.');
      }
    } catch (error) {
      console.error("Error during login:", error.response?.data?.message || error.message);
      setError("Invalid login credentials. Please try again.");
    }
  };

  return (
    <Layout>
      <HomeNavbar />

      <Container component="main" className="container" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: 8,
          }}
        >
          <Typography component="h1" variant="h5">
            Health Awareness App Login
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleLogin} // Use onSubmit for form submission
            sx={{
              mt: 1,
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              required
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              required
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
            />

            {error && (
              <Typography color="error" sx={{ marginBottom: '10px', textAlign: 'center' }}>
                {error}
              </Typography>
            )}

            <Button
              type="submit" // Change to type="submit" for form behavior
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account? <a href="/signup">Sign up</a>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default LoginPage;
