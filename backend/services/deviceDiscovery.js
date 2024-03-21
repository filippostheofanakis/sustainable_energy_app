// services/deviceDiscovery.js
const bonjour = require('bonjour')();
const axios = require('axios'); // Make sure axios is installed
const DeviceData = require ('../models/DeviceData');

let browser;

function startDiscovery() {
  // Browser to discover devices
  browser = bonjour.find({ type: 'http' });

  browser.on('up', async service => {
    console.log("Device up: ", service);
  
    // Check the service name or type to decide if it's a device you're interested in
    if (service.type === 'http') { // Replace this with the actual condition
      try {
        // Construct the device's API URL from its hostname and port
        const deviceApiUrl = `http://${service.host}:${service.port}/api/data`; // Replace '/api/data' with the actual path
  
        // Fetch data from the device
        const response = await axios.get(deviceApiUrl);
        console.log(response.data);
  
        const deviceData = new DeviceData({
          deviceId: service.name, // Replace this with the actual device ID
          timestamp: new Date(),
          consumption: response.data.emergyConsumption // Replace this with the actual consumption data
        });
        await deviceData.save();
      } catch (error) {
        console.error("Error getting data from device:", error);
      }
    }
  });

  browser.on('down', service => {
    console.log("Device down: ", service);
    // Here you might want to mark the device as inactive or remove it from your active list
  });
}

function stopDiscovery() {
  if (browser) {
    browser.stop();
    bonjour.destroy();
  }
}

// New function to fetch data from the simulated device
async function getSimulatedDeviceData() {
  try {
    const response = await axios.get('http://localhost:8080/api/data');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting data from simulated device:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}

module.exports = { startDiscovery, stopDiscovery, getSimulatedDeviceData };