// models/EnergyUsage.js

const mongoose = require('mongoose');

const energyUsageSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  consumption: {
    type: Number, // Could be in kWh
    required: true
  },
  // Optionally, if you want to track per-device or per-circuit
  device: {
    type: String,
    required: false // Only required if you are tracking per device
  }
  // You can add more fields as necessary, such as cost, voltage, etc.
});

const EnergyUsage = mongoose.model('EnergyUsage', energyUsageSchema);

module.exports = EnergyUsage;
