import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const CoinHistoryChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const coinIds = [
    'bitcoin',
    'ethereum',
    'litecoin',
    'dogecoin',
    'binancecoin',
    'cardano',
    'polkadot',
    'uniswap',
    'solana',
    'avalanche',
  ];

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Fetch historical data for all coins from the backend
        const response = await axios.get(`http://localhost:5000/api/history?coinIds=${coinIds.join(',')}`);

        // Check the response data structure
        console.log('API Response:', response.data);

        // Extract labels (timestamps) from the first coin's historical data
        const labels = response.data[0]?.data?.map(item => new Date(item.timestamp).toLocaleString()); // Timestamps for x-axis

        if (!labels || labels.length === 0) {
          setError('No valid data for labels');
          setLoading(false);
          return;
        }

        // Create datasets for each coin
        const datasets = response.data.map((coinData, index) => ({
          label: `${coinData.coinId.toUpperCase()} Price (USD)`,
          data: coinData.data?.map(item => item.price_usd),  // Prices for the y-axis
          fill: false,
          borderColor: `hsl(${(index * 36) % 360}, 70%, 50%)`,  // Unique colors for each coin
          tension: 0.1,
          yAxisID: index % 2 === 0 ? 'y1' : 'y2', // Alternate between two axes
        }));

        const chartData = {
          labels: labels,  // X-axis labels (timestamps)
          datasets: datasets,  // Y-axis data (coin prices)
        };

        // Set up dual y-axes configuration
        const options = {
          responsive: true,
          scales: {
            y1: {
              type: 'linear',
              position: 'left',
              ticks: {
                beginAtZero: false,
                max: 120000, // Adjust based on data range for the left y-axis
              },
            },
            y2: {
              type: 'linear',
              position: 'right',
              ticks: {
                beginAtZero: false,
                max: 200, // Adjust based on data range for the right y-axis
              },
            },
          },
        };

        setChartData({ data: chartData, options: options });
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchHistory();
  }, []); // Empty array ensures this effect runs only once

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {chartData ? <Line data={chartData.data} options={chartData.options} /> : <p>No data to display</p>}
    </div>
  );
};

export default CoinHistoryChart;
