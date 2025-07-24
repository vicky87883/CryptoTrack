// migrations/YYYYMMDDHHMMSS-create-coinhistory.js
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CoinHistory', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      coin_id: Sequelize.STRING,
      name: Sequelize.STRING,
      symbol: Sequelize.STRING,
      price_usd: Sequelize.FLOAT,
      market_cap: Sequelize.FLOAT,
      percent_change_24h: Sequelize.FLOAT,
      timestamp: Sequelize.DATE
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CoinHistory');
  }
};
