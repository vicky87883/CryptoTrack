const axios = require('axios');
const { Coin, CoinHistory } = require('./models');
const cron = require('node-cron');

async function fetchAndSaveData() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
      }
    });

    const coinData = response.data;

    for (const coin of coinData) {
      await Coin.upsert({
        coin_id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price_usd: coin.current_price,
        market_cap: coin.market_cap,
        percent_change_24h: coin.price_change_percentage_24h,
        timestamp: new Date()
      });

      await CoinHistory.create({
        coin_id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price_usd: coin.current_price,
        market_cap: coin.market_cap,
        percent_change_24h: coin.price_change_percentage_24h,
        timestamp: new Date()
      });
    }

    console.log('Coin snapshot saved to Coin & CoinHistory');
  } catch (error) {
    console.error('Error in cron job:', error.message);
  }
}

cron.schedule('* * * * *', fetchAndSaveData);  // Every minute

