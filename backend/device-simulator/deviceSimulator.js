const bonjour = require('bonjour')();
const express = require('express');
const app = express();
const port = 8080;

app.get('/api/data', (req, res) => {
  const simulatedData = {
    timestamp: new Date(),
    consumption: Math.random() * 100 // Random energy consumption data
  };
  res.json(simulatedData);
});

const server = app.listen(port, () => {
  console.log(`Simulated device running on port ${port}`);
  
  // Advertise the server using mDNS
  bonjour.publish({ name: 'Simulated Device', type: 'http', port: port });
});

// Handle process termination to cleanly unpublish the service
process.on('SIGINT', () => {
  bonjour.unpublishAll(() => {
    server.close(() => {
      process.exit();
    });
  });
});