// routes/energyUsageRoutes.js

const express = require('express');
const router = express.Router();
const EnergyUsage = require('../models/EnergyUsage');
const { generateSimulatedData } = require('../simulateData'); // Adjust the path as needed
const { aggregateDailyConsumption } = require('../services/energyAnalysis'); // New import
const {
  calculateDailyTotalConsumption,
  calculateDailyAverageConsumption,
  calculatePeakConsumptionTimes
} = require('../services/energyAnalysis');
const { generateRecommendations } = require('../services/recommendationsEngine');



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

// Route to get energy-saving recommendations
router.get('/recommendations', async (req, res) => {
  try {
    const recommendations = await generateRecommendations();
    res.json(recommendations);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to get daily total consumption
router.get('/daily-total-consumption', async (req, res) => {
  try {
    const dailyTotal = await calculateDailyTotalConsumption();
    res.json(dailyTotal);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to get daily average consumption
router.get('/daily-average-consumption', async (req, res) => {
  try {
    const dailyAverage = await calculateDailyAverageConsumption();
    res.json(dailyAverage);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to get peak consumption times
router.get('/peak-consumption-times', async (req, res) => {
  try {
    const peakTimes = await calculatePeakConsumptionTimes();
    res.json(peakTimes);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// New endpoint for getting daily aggregation
router.get('/energy-usage/daily', async (req, res) => {
  try {
    const dailyAggregation = await aggregateDailyConsumption();
    res.json(dailyAggregation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// New endpoint for getting recommendations
router.get('/energy-usage/recommendations', async (req, res) => {
  try {
    const recommendations = await generateRecommendations();
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add to your Express router
router.get('/trigger-simulate-data', (req, res) => {
  generateSimulatedData();
  res.json({ message: 'Data generation triggered.' });
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
