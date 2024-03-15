// frontend/src/EnergyUsageList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EnergyUsageList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/api/energy-usage');
      setRecords(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Energy Usage Records</h2>
      <ul>
        {records.map(record => (
          <li key={record._id}>
            {new Date(record.timestamp).toLocaleString()} - {record.consumption} kWh - {record.device}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EnergyUsageList;
