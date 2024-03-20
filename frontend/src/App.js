// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import EnergyUsageList from './EnergyUsageList';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import AddEnergyUsage from './AddEnergyUsage';
import EnergyUsageChart from './EnergyUsageChart';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import RegisterDevice from './components/DeviceManagement';
import DeviceManagement from './components/DeviceManagement';


function App() {

  const [energyData, setEnergyData] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:5000/api/energy-usage') // Ensure correct endpoint
          .then(response => {
              setEnergyData(response.data);
          })
          .catch(error => console.error("Failed to fetch energy data:", error));
  }, []);

  return (
    <Layout>
      <Grid container spacing={3}>
      <Grid item xs={12}>
          <DeviceManagement /> {/* Place the new Device Management component */}
        </Grid>
        <Grid item xs={12}>
          <AddEnergyUsage />
        </Grid>
        <Grid item xs={12} md={6}>
          <EnergyUsageList />
        </Grid>
        <Grid item xs={12} md={6}>
          <EnergyUsageChart data={energyData} />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default App;
