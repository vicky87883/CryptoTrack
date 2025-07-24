// models/index.js
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  port: config.port || 5432,
  logging: false
});

// Load all model files
fs.readdirSync(__dirname)
  .filter(file =>
    file !== 'index.js' &&
    file.endsWith('.js') &&
    !file.startsWith('.')           // ignore hidden files
  )
  .forEach(file => {
    const modelDef = require(path.join(__dirname, file));
    if (typeof modelDef === 'function') {
      const model = modelDef(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
