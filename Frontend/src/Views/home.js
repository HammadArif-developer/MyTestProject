import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Home = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(to right, #f2f2f2, #e0e0e0)', // Gradient background
      borderRadius: '10px',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)', // Subtle shadow
    },
    heading: {
      textAlign: 'center',
      color: '#333', // Darker text for contrast
      fontSize: '3rem', // Larger font size
      fontWeight: 'bold', // Bold font weight
      textShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', // Text shadow for depth
    },
  };

  return (
    <Container style={styles.container}>
      <Box>
        <Typography variant="h3" style={styles.heading}>
          Welcome to the Application
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;