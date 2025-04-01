// Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Navbar = () => {
    return (
    <AppBar color="secondary" sx={{ mb: 4, right: 0, top: 0, direction: 'ltr', zIndex: 2, bgcolor: '#6A0DAD', height: '11%' }}>
      <Toolbar variant="regular">
        
        <Button color="inherit" component={Link} to='/userManagement' sx={{  marginTop: 2 }}>
          ניהול משתמשים
        </Button>
        <Button color="inherit" component={Link} to='/managementActivities' sx={{  marginTop: 2 }}>
          ניהול פעילויות 
        </Button>
        <Button color="inherit" component={Link} to='/systemManagement' sx={{  marginTop: 2 }}>
          ניהול מערכת 
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
