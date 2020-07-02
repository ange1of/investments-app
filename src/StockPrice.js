import React, { useRef, useEffect } from 'react';
import './StockPrice.css';

function StockPrice({buyPrice, sellPrice}) {
  const prevBuyPrice = useRef();
  const prevSellPrice = useRef();

  let buyClass = useRef('priceEqual');
  let sellClass = useRef('priceEqual');

  useEffect(() => {
      if (buyPrice > prevBuyPrice.current) { buyClass.current = 'priceUp'; }
      else if (buyPrice < prevBuyPrice.current) { buyClass.current = 'priceDown'; }
      
      if (sellPrice > prevSellPrice.current) { sellClass.current = 'priceUp'; }
      else if (sellPrice < prevSellPrice.current) { sellClass.current = 'priceDown'; }

      prevBuyPrice.current = buyPrice;
      prevSellPrice.current = sellPrice;
  });

  return (
      <div className="priceBlock">
        <div className="buyBlock">
          <h3>Покупка</h3>
          <p className={buyClass.current}>
              {buyPrice.toFixed(2)} $
          </p>
        </div>
        <div className="sellBlock">
          <h3>Продажа</h3>
          <p className={sellClass.current}>
              {sellPrice.toFixed(2)} $
          </p>
        </div>
      </div>
  );
}

export default StockPrice;