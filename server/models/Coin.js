// models/Coin.js
module.exports = (sequelize, DataTypes) => {
  const Coin = sequelize.define('Coin', {
    coin_id: { 
      type: DataTypes.STRING, 
      primaryKey: true 
    },
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
    price_usd: DataTypes.FLOAT,
    market_cap: DataTypes.FLOAT,
    percent_change_24h: DataTypes.FLOAT,
    timestamp: DataTypes.DATE,
  }, { timestamps: false });

  return Coin;
};
