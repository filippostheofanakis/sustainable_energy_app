// services/deviceDiscovery.js
const bonjour = require('bonjour')();
const axios = require('axios'); // Make sure axios is installed

let browser;

function startDiscovery() {
  // Browser to discover devices
  browser = bonjour.find({ type: 'http' });

  browser.on('up', service => {
    console.log("Device up: ", service);
    // Here you would typically check the service name or type and decide if you want to save it
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