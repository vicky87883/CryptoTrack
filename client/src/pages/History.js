import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Table, Form } from 'react-bootstrap';

const History = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('');
  const [history, setHistory] = useState([]);

  // Fetch list of coins
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/coins');
        setCoins(res.data);
        if (res.data.length) setSelectedCoin(res.data[0].id);
      } catch (err) {
        console.error('Error loading coins:', err.message);
      }
    };
    fetchCoins();
  }, []);

  // Fetch history for selected coin
  useEffect(() => {
    if (!selectedCoin) return;
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/history/${selectedCoin}`);
        setHistory(res.data);
      } catch (err) {
        console.error('Error loading history:', err.message);
      }
    };
    fetchHistory();
  }, [selectedCoin]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Historical Data</h4>
        <Form.Select
          style={{ width: '250px' }}
          value={selectedCoin}
          onChange={(e) => setSelectedCoin(e.target.value)}
        >
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name}
            </option>
          ))}
        </Form.Select>
      </div>

      <Card className="shadow-sm">
        <Card.Body>
          <Table responsive bordered hover className="align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Coin</th>
                <th>Price (USD)</th>
                <th>Market Cap</th>
                <th>24h Change (%)</th>
                <th>Recorded At</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>#{index + 1}</td>
                  <td>{item.name}</td>
                  <td>${item.price_usd?.toLocaleString()}</td>
                  <td>${item.market_cap?.toLocaleString()}</td>
                  <td className={item.percent_change_24h < 0 ? 'text-danger' : 'text-success'}>
                    {item.percent_change_24h?.toFixed(2)}%
                  </td>
                  <td>{new Date(item.timestamp).toLocaleString()}</td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    No historical data available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default History;
