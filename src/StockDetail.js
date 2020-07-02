import React from 'react';
import { useState } from 'react';
import './StockDetail.css';
import StockPrice from './StockPrice.js'

function StockDetail({ stockId }) {
  let [buyPrice, updateBuyPrice] = useState(1123.25);
  let [sellPrice, updateSellPrice] = useState(1115.14);

  return (
    <div className="StockDetail">
        <StockPrice buyPrice={buyPrice} sellPrice={sellPrice}/>
    </div>
  );
}

export default StockDetail;