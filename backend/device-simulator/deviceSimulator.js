//deviceSimulator.js
const bonjour = require('bonjour')();
const express = require('express');
const app = express();
const port = 8080;


app.get('/api/data', (req, res) => {
  res.json({ timestamp: new Date(), consumption: Math.random() * 100 });
});

const server = app.listen(port, () => {
  console.log(`Simulated device running on port ${port}`);
  
  // Advertise the server using mDNS
  bonjour.publish({ name: 'Simulated mdns Device', type: 'http', port: port });
});

// Handle process termination to cleanly unpublish the service
process.on('SIGINT', () => {
  bonjour.unpublishAll(() => {
    server.close(() => {
      process.exit();
    });
  });
});