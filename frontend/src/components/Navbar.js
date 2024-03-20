import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Energy Monitoring App
        </Typography>
        <Button color="inherit">Dashboard</Button>
        <Button color="inherit">Settings</Button>
        <Button color="inherit">Recommendations</Button>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
