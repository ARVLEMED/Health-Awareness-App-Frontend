import React from "react";
import { Box, IconButton, Button } from "@mui/material"; // Import Material-UI components
import { Link } from "react-router-dom"; // Import Link for routing
import HomeIcon from "@mui/icons-material/Home"; // Import HomeIcon
import './Landingpage.css'; // Import CSS file

const HomeNavbar = () => {
  return (
    <Box className="navbar">
      <IconButton component={Link} to="/" aria-label="Home">
        <HomeIcon />
      </IconButton>
      <Box className="nav-links">
        <Button variant="outlined" color="primary" component={Link} to="/about" aria-label="About">
          About
        </Button>
        <Button variant="contained" color="primary" component={Link} to="/login" aria-label="Login">
          Login
        </Button>
        <Button variant="outlined" color="primary" component={Link} to="/signup" aria-label="Sign Up">
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default HomeNavbar;
