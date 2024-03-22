//deviceDiscovery.js
const bonjour = require('bonjour')();
const axios = require('axios');
const DeviceData = require('../models/DeviceData'); // Import your DeviceData model

function startDiscovery() {
  console.log('Starting device discovery...'); // Add this line

  const browser = bonjour.find({ type: 'http' });

  browser.on('up', async service => {
    console.log('Found device:', service);
    const url = `http://${service.addresses[0]}:${service.port}/api/data`;
    const deviceData = await fetchDataFromDevice(url);

    // Save the device and its data to the database
    const newDeviceData = new DeviceData({
      name: service.name,
      address: service.addresses[0],
      port: service.port,
      data: deviceData,
    });
    try {
      await newDeviceData.save();
      console.log('Saved device data to database:', newDeviceData);
    } catch (error) {
      console.error('Failed to save device data to database:', error);
    }
  });

  browser.on('down', service => {
    console.log('Device went offline:', service);
  });
}

async function fetchDataFromDevice(url) {
  try {
    const response = await axios.get(url);
    console.log('Device data:', response.data);
  } catch (error) {
    console.error('Failed to fetch data from device:', error);
  }
}

module.exports = { startDiscovery };
