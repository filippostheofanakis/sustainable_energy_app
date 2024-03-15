// server.js

const express = require('express');
const app = express();
const connectDB = require('./database');
const energyUsageRoutes = require('./routes/energyUsageRoutes');


// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api', energyUsageRoutes);
connectDB();

// Health check route
app.get('/health', (req, res) => {
  res.send({ status: 'UP' });
});

// Define the PORT
const PORT = process.env.PORT || 5000;

// Server listens on the defined PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
