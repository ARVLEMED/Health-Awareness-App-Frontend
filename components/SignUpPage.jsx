import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography, CssBaseline, Grid, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../src/App.css";
import Layout from './Layout';
import HomeNavbar from './HomeNavbar';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { username, email, password, confirmPassword } = formData;
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:5000/api/signup',
        { username, email, password, confirmPassword },
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      if (response.data.success) {
        setSuccess('Sign up successful! You can now log in.');
        setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        
        // Redirect to login page after success
        setTimeout(() => {
          navigate('/login'); // Redirect to login page
        }, 2000); // 2-second delay before redirect (optional)
        
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while signing up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <HomeNavbar />
      <Container component="main" className="container" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 8 }}>
          <Typography component="h1" variant="h5">Sign Up</Typography>
          <Box component="form" noValidate sx={{ mt: 1, width: '100%' }} onSubmit={handleSignUp}>
            {['username', 'email', 'password', 'confirmPassword'].map((field) => (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                type={field === 'password' || field === 'confirmPassword' ? 'password' : 'text'}
                variant="outlined"
                required
                fullWidth
                value={formData[field]}
                onChange={handleChange}
                margin="normal"
              />
            ))}

            {error && <Typography color="error" sx={{ textAlign: 'center' }}>{error}</Typography>}
            {success && <Typography color="success" sx={{ textAlign: 'center' }}>{success}</Typography>}

            <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">Already have an account? <a href="/login">Login</a></Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
};

export default SignUpPage;
