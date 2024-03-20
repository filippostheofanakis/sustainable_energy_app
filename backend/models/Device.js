// models/Device.js
const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    unique: true, // Ensure device IDs are unique
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  apiEndpoint: {
    type: String,
    required: false, // Not all devices may have an API endpoint
  },
});

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;


