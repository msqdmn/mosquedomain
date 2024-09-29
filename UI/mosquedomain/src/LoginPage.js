import { Box, Grid, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation
import backgroundImage from './assets/background.png'; // Import the image
import { useState } from 'react';
import { googlesignin,signup,SignIn } from './components/auth';


function LoginPage() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  // Handle login button click
  const handleLogin = async () => {
    console.log("Signed IN ",Email,Password)
    await SignIn(Email,Password)
    navigate('/central'); // Navigate to the central page
  };
  const handleGoogleLogin = async () => {
    await googlesignin()
    navigate('/central')
  }
  const handleSignUp = async() => {
    await signup(Email,Password)
    console.log("Signed UP ",Email,Password)
  }

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
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e)=>{setEmail(e.target.value)}}
            />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Login
          </Button>
          <Button variant="contained" color="primary" fullWidth onClick={handleGoogleLogin}>
            LoginWithGoogle
          </Button>
          <Button variant="contained" color="primary" fullWidth onClick={handleSignUp}>
            Sign Up
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginPage;
