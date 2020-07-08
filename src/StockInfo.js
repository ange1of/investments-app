import React from 'react';
import { currencies } from './constants/currencies.js';
import './StockInfo.css';

function StockInfo(props) {
    return (
        <div className="StockInfo">
            <h1>{props.name}</h1>
            <p><b>Отрасль:</b> <span>{props.sector}</span></p>
            <p><b>Капитализация:</b> <span>{props.capitalization} {currencies[props.currency]}</span></p>
            <p><b>Количество выпущенных акций:</b> <span>{props.stockCount}</span></p>
            <p><b>Выручка:</b> <span>{props.income} {currencies[props.currency]}</span></p>
        </div>
    );
}

export default StockInfo;