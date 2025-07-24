// models/CoinHistory.js
module.exports = (sequelize, DataTypes) => {
  const CoinHistory = sequelize.define('CoinHistory', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    coin_id: DataTypes.STRING,
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    price_usd: DataTypes.FLOAT,
    market_cap: DataTypes.FLOAT,
    percent_change_24h: DataTypes.FLOAT,
    timestamp: DataTypes.DATE,
  }, {
    tableName: 'CoinHistory',
    timestamps: false,
  });

  return CoinHistory;
};
