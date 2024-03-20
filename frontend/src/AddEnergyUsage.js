// frontend/src/AddEnergyUsage.js

import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Container, Paper } from '@material-ui/core';


function AddEnergyUsage() {
  const [consumption, setConsumption] = useState('');
  const [device, setDevice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const record = { timestamp: new Date(), consumption, device };
    await axios.post('/api/energy-usage', record);
    // Optionally, add a way to confirm success to the user
    setConsumption('');
    setDevice('');
  };

  return (
    <Container component={Paper} style={{ padding: '20px', marginTop: '20px' }}>
    <Typography variant="h6">Add Energy Usage Record</Typography>
    <form onSubmit={handleSubmit}>
      <TextField
        label="Consumption (kWh)"
        type="number"
        value={consumption}
        onChange={(e) => setConsumption(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Device"
        type="text"
        value={device}
        onChange={(e) => setDevice(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button type="submit" color="primary" variant="contained">
        Add Record
      </Button>
    </form>
  </Container>
);
}

export default AddEnergyUsage;
