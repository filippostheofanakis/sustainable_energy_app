//DeviceData.js
const mongoose = require('mongoose');

const DeviceDataSchema = new mongoose.Schema({
  deviceId: String,
  timestamp: Date,
  consumption: Number
});

module.exports = mongoose.model('DeviceData', DeviceDataSchema, 'devicedatas');