// frontend/src/EnergyUsageList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EnergyUsageList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/api/energy-usage')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error("There was an error fetching the energy usage data:", error));
  }, []);

  return (
    <div>
      <h2>Energy Usage Data</h2>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            Timestamp: {new Date(item.timestamp).toLocaleString()}, Consumption: {item.consumption}, Device: {item.device}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EnergyUsageList;
