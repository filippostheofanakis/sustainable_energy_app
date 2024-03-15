// frontend/src/App.js

import React from 'react';
import './App.css';
import EnergyUsageList from './EnergyUsageList';
import AddEnergyUsage from './AddEnergyUsage';

function App() {
  return (
    <div className="App">
      <AddEnergyUsage />
      <EnergyUsageList />
    </div>
  );
}

export default App;
