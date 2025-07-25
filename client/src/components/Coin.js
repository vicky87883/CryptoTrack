// src/components/Coin.js
import React from 'react';

const Coin = ({ coin }) => {
  return (
    <tr>
      <td>{coin.name}</td>
      <td>{coin.symbol}</td>
      <td>{coin.current_price}</td>
      <td>{coin.market_cap}</td>
      <td>{coin.price_change_percentage_24h}</td>
      <td>{new Date().toLocaleString()}</td>
    </tr>
  );
};

export default Coin;
