import React, { useEffect } from 'react';
import { useState } from 'react';
import './StockDetail.css';
import StockPrice from './StockPrice.js';
import StockInfo from './StockInfo.js';

function StockDetail({ stockId }) {
  let [buyPrice, updateBuyPrice] = useState(1123.25);
  let [sellPrice, updateSellPrice] = useState(1115.14);

  return (
    <div className="StockDetail">
      <div className="StockPriceContainer">
        <StockPrice title="Покупка" price={buyPrice} currency="$"/>
        <StockPrice title="Продажа" price={sellPrice} currency="$"/>
      </div>
      <StockInfo 
        currency="$"
        openPrice="1111.11"
        closePrice="1222.34"
        priceToIncomeRatio="22.00"
        yearPriceRange={{ min: 120.00, max: 1500.67 }}
        dayPriceRange={{ min: 1010.99, max: 1302.44 }}
        dividends="10.35"/>
    </div>
  );
}

export default StockDetail;