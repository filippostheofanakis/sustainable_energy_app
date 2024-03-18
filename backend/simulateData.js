// simulateData.js

const EnergyUsage = require('./models/EnergyUsage'); // Adjust the path as per your structure
const cron = require('node-cron');

// Function to generate and save simulated energy usage data
function generateSimulatedData() {
  const timestamp = new Date();
  const consumption = Math.floor(Math.random() * 1000); // Random consumption value between 0 to 1000
  const device = "Simulated Device"; // Example device name

  // Create a new record using your EnergyUsage model
  const newRecord = new EnergyUsage({
    timestamp,
    consumption,
    device,
  });

  newRecord.save()
    .then(savedRecord => console.log("Simulated data saved:", savedRecord))
    .catch(err => console.error("Failed to save simulated data:", err));
}

// Optionally, schedule the simulation to run at regular intervals (e.g., every minute)
cron.schedule('* * * * *', generateSimulatedData);

module.exports = { generateSimulatedData };
