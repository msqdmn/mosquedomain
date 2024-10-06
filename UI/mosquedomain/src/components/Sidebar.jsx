import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

const Sidebar = ({ open, toggleSidebar }) => {
  return (
    <Drawer anchor="left" open={open} onClose={toggleSidebar}>
      <List sx={{ width: 250, backgroundColor: '#1f1f1f', height: '100%', color: 'white' }}>
        <ListItem button component={Link} to="/central" onClick={toggleSidebar}>
          <ListItemIcon>
            <HomeIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Home" sx={{ color: 'white' }} /> {/* Set color to white */}
        </ListItem>

        <ListItem button component={Link} to="/profile" onClick={toggleSidebar}>
          <ListItemIcon>
            <SettingsIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Profile" sx={{ color: 'white' }} /> {/* Set color to white */}
        </ListItem>

        <ListItem button component={Link} to="/analytics" onClick={toggleSidebar}>
          <ListItemIcon>
            <InfoIcon sx={{ color: 'white' }} />
          </ListItemIcon>
          <ListItemText primary="Analytics" sx={{ color: 'white' }} /> {/* Set color to white */}
        </ListItem>
        <Divider />
      </List>
    </Drawer>
  );
};

export default Sidebar;
