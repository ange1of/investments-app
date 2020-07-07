import React from 'react';
import { currencies } from './constants/currencies.js';
import './StockListElement.css';

function StockListElement(
    { ticker, title, price, priceChangePercent, currency, sector, clickHandler }
) {
    return (
        <div className="StockListElement" onClick={(event) => clickHandler(ticker)}>
            <div className="title">
                <h3>{title} ({ticker})</h3>
            </div>
            <div className="priceChange">
                <svg width="10" height="10">
                    {priceChangePercent > 0 ? 
                    <polygon points="0,10 5,0 10,10" fill="green"/> : 
                    <polygon points="0,0 5,10 10,0" fill="red"/>}
                </svg>
                <h3 style={{ color: priceChangePercent > 0 ? 'green' : 'red'}}>
                    {priceChangePercent} %
                </h3>
            </div>
            <div className="price">
                <h3>{price} {currencies[currency]}</h3>
            </div>
            <div className="sector"><code>{sector}</code></div>
        </div>
    );
}

export default StockListElement;