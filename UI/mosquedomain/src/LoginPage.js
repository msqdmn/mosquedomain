import { Box, Grid, Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation
import { useState } from 'react';
import { googlesignin, signup, SignIn } from './components/auth';

function LoginPage() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  // Handle login button click
  const handleLogin = async () => {
    console.log("Signed IN ", Email, Password);
    await SignIn(Email, Password);
    navigate('/central'); // Navigate to the central page
  };

  const handleGoogleLogin = async () => {
    await googlesignin();
    navigate('/central');
  };

  const handleSignUp = async () => {
    await signup(Email, Password);
    console.log("Signed UP ", Email, Password);
  };

  return (
    <Grid container sx={{ height: '100vh', bgcolor: '#f5f5f5' }}>
      {/* Centered Login Section */}
      <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper
          elevation={6}
          sx={{
            padding: 4,
            borderRadius: '8px',
            backgroundColor: 'white',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: 400, // Limit the width of the login form
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#333', textAlign: 'center' }}>
            Welcome 
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => { setEmail(e.target.value); }}
            InputLabelProps={{
              sx: { color: '#555' }, // Color for label
            }}
            InputProps={{
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ccc', // Border color
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#777', // Border color on hover
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3f51b5', // Border color when focused
                },
              },
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e) => { setPassword(e.target.value); }}
            InputLabelProps={{
              sx: { color: '#555' },
            }}
            InputProps={{
              sx: {
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ccc',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#777',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#3f51b5',
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ mb: 1, borderRadius: '25px' }} // Rounded button
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleGoogleLogin}
            sx={{ mb: 1, borderRadius: '25px' }}
          >
            Login with Google
          </Button>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={handleSignUp}
            sx={{ borderRadius: '25px' }}
          >
            Sign Up
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
