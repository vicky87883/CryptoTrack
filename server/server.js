const express = require('express');
const axios = require('axios');
const { Sequelize } = require('sequelize');
const cron = require('node-cron');
const coinRoutes = require('./routes/coinRoutes');  // Import routes
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
// Load the correct config environment (development)
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];

// Initialize Sequelize with PostgreSQL settings
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,  // 'postgres' is used here
  port: config.port || 5432,  // Default PostgreSQL port
  logging: false  // Disable SQL query logging
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Middleware to parse JSON requests
app.use(express.json());

// Use coinRoutes for API endpoints
app.use('/api', coinRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Import cron jobs to handle periodic tasks
require('./cron.js');  // Automatically run the cron job
