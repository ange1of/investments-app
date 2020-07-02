import React, { useRef, useEffect } from 'react';
import './StockPrice.css';

function StockPrice({title, price, currency}) {
  const prevPrice = useRef(price);
  const priceClass = useRef('priceEqual');

  useEffect(() => {
      if (price > prevPrice.current) { priceClass.current = 'priceUp'; }
      else if (price < prevPrice.current) { priceClass.current = 'priceDown'; }

      prevPrice.current = price;
  });

  return (
      <div className="priceBlock">
          <h3>{title}</h3>
          <p className={priceClass.current}>
              {price.toFixed(2)} {currency}
          </p>
      </div>
  );
}

export default StockPrice;