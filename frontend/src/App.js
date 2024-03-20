// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';
import EnergyUsageList from './EnergyUsageList';
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import AddEnergyUsage from './AddEnergyUsage';
import EnergyUsageChart from './EnergyUsageChart';
import axios from 'axios';


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
    <div className="App">
      <AddEnergyUsage />
      <EnergyUsageList />
            <EnergyUsageChart data={energyData} />
    </div>
    </Layout>
  );
}

export default App;
