import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = ({ toggleSidebar, user, onSignOut }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        background: 'linear-gradient(90deg, #2196F3 0%, #9C27B0 100%)' // Blue to Purple Gradient
    }}
    >
      <Toolbar>
        {/* Sidebar Toggle */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* App Name */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Sleek App
        </Typography>

        {/* User Info */}
        <Box>
          <Button
            color="inherit" // Button color remains white on dark background
            onClick={handleMenuOpen}
            startIcon={<AccountCircleIcon />}
          >
            {user?.name || 'User'}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={onSignOut}>Sign Out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
