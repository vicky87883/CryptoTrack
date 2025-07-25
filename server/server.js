// File: server.js
const express = require('express');
const axios = require('axios');
const { Sequelize } = require('sequelize');
const cron = require('node-cron');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const cors = require('cors');
const coinRoutes = require('./routes/coinRoutes');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Load DB config based on environment
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];

// Initialize Sequelize
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port || 5432,
  logging: false
});

// Authenticate DB connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => console.error('Unable to connect to the database:', err));

// Session Middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({ db: sequelize })
}));

// Routes
app.use('/api', coinRoutes);
app.use('/auth', authRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Cron Jobs
require('./cron.js');