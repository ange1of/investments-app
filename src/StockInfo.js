import React from 'react';
import { currencies } from './constants/currencies.js';

function StockInfo(props) {
    return (
        <div className="StockInfo">
            <p>Отрасль <span>{props.sector}</span></p>
            <p>Капитализация <span>{props.capitalization} {currencies[props.currency]}</span></p>
            <p>Количество выпущенных акций <span>{props.stockCount}</span></p>
            <p>Выручка <span>{props.income} {currencies[props.currency]}</span></p>
        </div>
    );
}

export default StockInfo;