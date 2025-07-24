'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Coins', {
      coin_id: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      name: Sequelize.STRING,
      symbol: Sequelize.STRING,
      price_usd: Sequelize.FLOAT,
      market_cap: Sequelize.FLOAT,
      percent_change_24h: Sequelize.FLOAT,
      timestamp: Sequelize.DATE
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Coins');
  }
};
