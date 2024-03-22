// routes/deviceRoutes.js
const express = require('express');
const router = express.Router();
const Device = require('../models/Device');
const { getSimulatedDeviceData } = require('../services/deviceDiscovery');


// Register a new device with API endpoint
router.post('/devices', async (req, res) => {
  try {
    const { deviceId, name, type, apiEndpoint } = req.body;
    const existingDevice = await Device.findOne({ deviceId });
    if (existingDevice) {
      return res.status(400).json({ message: "Device already registered." });
    }
    const newDevice = new Device({ deviceId, name, type, apiEndpoint });
    const savedDevice = await newDevice.save();
    res.status(201).json(savedDevice);
  } catch (error) {
    console.error(error); // Log the error
    res.status(400).json({ message: error.message });
  }
});

// List all registered devices
router.get('/devices', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
