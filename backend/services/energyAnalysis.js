// energyAnalysis.js

const EnergyUsage = require('../models/EnergyUsage');

// Helper function to group data by day
const groupByDay = (data) => {
  return data.reduce((acc, record) => {
    const day = record.timestamp.toISOString().split('T')[0]; // Extract the date in YYYY-MM-DD format
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(record);
    return acc;
  }, {});
};

// Calculate daily total energy consumption
const calculateDailyTotalConsumption = async () => {
  try {
    const records = await EnergyUsage.find();
    const groupedByDay = groupByDay(records);
    let dailyConsumption = {};

    for (let day in groupedByDay) {
      dailyConsumption[day] = groupedByDay[day].reduce((sum, record) => sum + record.consumption, 0);
    }

    return dailyConsumption;
  } catch (error) {
    console.error('Failed to calculate daily total consumption:', error);
  }
};

// Calculate daily average energy consumption
const calculateDailyAverageConsumption = async () => {
  try {
    const dailyTotal = await calculateDailyTotalConsumption();
    const records = await EnergyUsage.find();
    const groupedByDay = groupByDay(records); // Assuming groupByDay is a function that correctly groups records by day

    let dailyAverage = {};

    for (let day in dailyTotal) {
      // Calculate average by dividing daily total by number of entries for each day
      dailyAverage[day] = dailyTotal[day] / groupedByDay[day].length;
    }

    return dailyAverage;
  } catch (error) {
    console.error('Failed to calculate daily average consumption:', error);
  }
};

// Calculate peak consumption times
const calculatePeakConsumptionTimes = async () => {
  try {
    const records = await EnergyUsage.find();
    // Assuming 'consumption' is in kWh and we're looking for the highest hourly consumption
    const peakTimes = records.sort((a, b) => b.consumption - a.consumption).slice(0, 10); // Get top 10 peak consumption records

    return peakTimes.map(record => ({
      timestamp: record.timestamp,
      consumption: record.consumption,
      device: record.device,
    }));
  } catch (error) {
    console.error('Failed to calculate peak consumption times:', error);
  }
};

module.exports = {
  calculateDailyTotalConsumption,
  calculateDailyAverageConsumption,
  calculatePeakConsumptionTimes
};
