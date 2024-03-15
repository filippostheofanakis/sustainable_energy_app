// frontend/src/AddEnergyUsage.js

import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <h2>Add Energy Usage Record</h2>
      <div>
        <label>Consumption (kWh):</label>
        <input
          type="number"
          value={consumption}
          onChange={(e) => setConsumption(e.target.value)}
        />
      </div>
      <div>
        <label>Device:</label>
        <input
          type="text"
          value={device}
          onChange={(e) => setDevice(e.target.value)}
        />
      </div>
      <button type="submit">Add Record</button>
    </form>
  );
}

export default AddEnergyUsage;
