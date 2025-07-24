const express = require('express');
const axios = require('axios');
const { CoinHistory } = require('../models');  // Make sure we are using the correct import for Sequelize model
const router = express.Router();

// Route to fetch current top 10 coins
router.get('/coins', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching data from CoinGecko:', err);
    res.status(500).send('Error fetching data');
  }
});

// Route to fetch historical data of a coin
router.get('/history/:coinId', async (req, res) => {
  const { coinId } = req.params;
  try {
    const coinHistory = await CoinHistory.findAll({
      where: { coin_id: coinId },
      order: [['timestamp', 'ASC']]
    });

    if (!coinHistory || coinHistory.length === 0) {
      return res.status(404).json({ message: `No data found for ${coinId}` });
    }

    res.json(coinHistory);
  } catch (err) {
    console.error('DB Error (CoinHistory):', err.message);
    res.status(500).json({ error: 'Error fetching historical data' });
  }
});


// POST route to save coin history data
// Route to fetch historical data for multiple coins
router.get('/history', async (req, res) => {
  const { coinIds } = req.query;  // Expecting comma-separated coin IDs, e.g., ?coinIds=bitcoin,ethereum,litecoin
  if (!coinIds) {
    return res.status(400).json({ error: 'coinIds query parameter is required' });
  }

  const coins = coinIds.split(',');  // Split the coin IDs by comma

  try {
    const coinHistoryData = await Promise.all(
      coins.map(async (coinId) => {
        const coinHistory = await CoinHistory.findAll({
          where: { coin_id: coinId },
          order: [['timestamp', 'ASC']],
        });
        return {
          coinId,
          data: coinHistory,
        };
      })
    );

    // Send the historical data for all requested coins
    res.json(coinHistoryData);
  } catch (err) {
    console.error('DB Error (CoinHistory):', err.message);
    res.status(500).json({ error: 'Error fetching historical data for coins' });
  }
});


module.exports = router;
