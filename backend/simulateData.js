// simulateData.js

// simulateData.js

const EnergyUsage = require('./models/EnergyUsage');
const cron = require('node-cron');

// Define a list of devices with initial consumption values
const devices = [
    { name: "Home AC", consumption: 2.5 },
    { name: "Refrigerator", consumption: 1.0 },
    { name: "Washing Machine", consumption: 1.1 },
    { name: "Dishwasher", consumption: 1.3 },
    { name: "Home Heating", consumption: 3.2 },
    // Add your predefined devices here
];

// Function to update consumption data for each device
async function updateDeviceConsumption() {
    const timestamp = new Date();

    // Iterate over each device and update its consumption
    devices.forEach(async (device) => {
        // Generate a random variation for the consumption
        const variation = (Math.random() - 0.5) * 0.2; // Random variation between -0.1 and 0.1
        device.consumption += variation; // Update the consumption with variation

        // Ensure consumption stays within reasonable bounds
        device.consumption = Math.max(0.1, Math.min(device.consumption, 5.0));

        // Create a new record for the updated consumption
        const newRecord = new EnergyUsage({
            timestamp,
            consumption: parseFloat(device.consumption.toFixed(2)), // Round to 2 decimal places
            device: device.name,
        });

        // Save the new record to the database
        try {
            const savedRecord = await newRecord.save();
            console.log("Updated consumption data saved:", savedRecord);
        } catch (err) {
            console.error("Failed to update consumption data for", device.name, ":", err);
        }
    });
}

// Schedule the update function to run every minute
cron.schedule('* * * * *', updateDeviceConsumption);

console.log("Device consumption update scheduled.");
