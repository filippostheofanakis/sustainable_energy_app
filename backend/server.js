// server.js

const express = require('express');
const app = express();
const connectDB = require('./database');
const energyUsageRoutes = require('./routes/energyUsageRoutes');
const cron = require('node-cron');
const cors = require('cors');
const axios = require('axios'); // Ensure axios is installed: yarn add axios
const simulatedData = require('./simulateData'); // This line is new; adjust path as necessary
const deviceRoutes = require('./routes/deviceRoutes');
const deviceDiscoveryService = require('./services/deviceDiscovery');
const {startDiscovery} = require('./services/deviceDiscovery');
const DeviceData = require('./models/DeviceData'); // Import your DeviceData model


app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api', energyUsageRoutes);
app.use('/api', deviceRoutes); // Use device routes
app.use('/api/devices', deviceRoutes);

connectDB();


cron.schedule('* * * * *', async () => { // This runs every minute as an example
  try {
    // const response = await axios.get('YOUR_DEVICE_API_ENDPOINT');
    // Process and store the response data as needed
  } catch (error) {
    console.error('Failed to fetch device data:', error);
  }
});

// Endpoint to start device discovery
app.get('/api/start-discovery', (req, res) => {
  deviceDiscoveryService.startDiscovery();
  res.send('Device discovery started');
});

// Endpoint to stop device discovery
app.get('/api/stop-discovery', (req, res) => {
  deviceDiscoveryService.stopDiscovery();
  res.send('Device discovery stopped');
});

app.post('/api/device-data', async (req, res) => {
  const data = req.body;
  // Process and store the data
  res.status(200).send('Data received');
});

// Health check route
app.get('/health', (req, res) => {
  res.send({ status: 'UP' });
});

app.get('/api/devices', async (req, res) => {
  const devices = await DeviceData.find(); // Replace with your method of getting the list of devices
  res.json(devices);
});

app.get('/api/devices/fetch-simulated-device-data', async (req, res) => {
  console.log('fetch-simulated-device-data route hit'); // Add this line

  try {
    const deviceData = await DeviceData.findOne().sort({ _id: -1 });
    if (!deviceData) {
      return res.status(404).json({ message: 'No device data found' });
    }
    res.json(deviceData);
  } catch (error) {
    console.error('Failed to fetch device data:', error); // Make sure this line is present
    res.status(500).json({
      message: 'An error occurred while fetching device data',
      error: error.message,
      stack: error.stack
    }); // Send back detailed error for debugging
  }
})
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ message: 'An internal server error occurred' });
});

// Define the PORT
const PORT = process.env.PORT || 5000;

// Server listens on the defined PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
