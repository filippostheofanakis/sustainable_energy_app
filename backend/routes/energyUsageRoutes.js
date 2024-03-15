// routes/energyUsageRoutes.js

const express = require('express');
const router = express.Router();
const EnergyUsage = require('../models/EnergyUsage');

// POST route to create a new energy usage record
router.post('/energy-usage', async (req, res) => {
  try {
    const newRecord = new EnergyUsage(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET route to fetch all energy usage records
router.get('/energy-usage', async (req, res) => {
  try {
    const records = await EnergyUsage.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
