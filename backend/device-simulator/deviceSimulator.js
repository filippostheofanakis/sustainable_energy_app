const express = require('express');
const app = express();
const port = 8080; // This should match the port you exposed and mapped in Docker

app.get('/api/data', (req, res) => {
  const simulatedData = {
    timestamp: new Date(),
    consumption: Math.random() * 100 // Random energy consumption data
  };
  res.json(simulatedData);
});

app.listen(port, () => {
  console.log(`Device simulator running on port ${port}`);
});