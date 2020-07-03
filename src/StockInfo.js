import React from 'react';

function StockInfo(props) {
    return (
        <div className="StockInfo">
            <p>Цена открытия <span>{props.openPrice} {props.currency}</span></p>
            <p>Цена закрытия <span>{props.closePrice} {props.currency}</span></p>
            <p>Цена/Прибыль <span>{props.priceIncomeRatio}</span></p>
            <p>Годовой диапазон 
                <span>
                    {props.yearPriceRange.min} - {props.yearPriceRange.max} {props.currency}
                </span>
            </p>
            <p>Дневной диапазон 
                <span>
                    {props.dayPriceRange.min} - {props.dayPriceRange.max} {props.currency}
                </span>
            </p>
            <p>Дивидендная доходность <span>{props.dividends} %</span></p>
        </div>
    );
}

export default StockInfo;