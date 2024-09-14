import { Box, Grid, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation
import backgroundImage from './assets/background.png'; // Import the image

function LoginPage() {
  const navigate = useNavigate();

  // Handle login button click
  const handleLogin = () => {
    navigate('/central'); // Navigate to the central page
  };

  return (
    <Grid container sx={{ height: '100vh' }}>
      {/* Left Section (60vw) */}
      <Grid item xs={12} md={7}>
        <Box
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            width: '100%',
          }}
        >
      
        </Box>
      </Grid>

      {/* Right Section (Login, 40vw) */}
      <Grid item xs={12} md={5}>
        <Box
          sx={{
            backgroundColor: 'beige',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
