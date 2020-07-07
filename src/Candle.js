import React from 'react';
import './Candle.css';

function Candle({ prices, minPlotPrice, maxPlotPrice, plotHeight }) {
    if (!prices) return;

    const openPrice = prices[0];
    const closePrice = prices[prices.length-1];
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);

    let color = 'black';
    if (openPrice < closePrice) color = 'green';
    else if (openPrice > closePrice) color = 'red';

    return (
        <div className="Candle">
            <svg width="20" height={plotHeight}>
                <line stroke={color} x1="10" x2="10" 
                    y1={(maxPlotPrice-maxPrice)/(maxPlotPrice-minPlotPrice)*plotHeight}
                    y2={(maxPlotPrice-minPrice)/(maxPlotPrice-minPlotPrice)*plotHeight}
                />
                <rect x="4" width="12" fill={color}
                    y={(maxPlotPrice-Math.max(openPrice, closePrice))/(maxPlotPrice-minPlotPrice)*plotHeight}
                    height={Math.max(Math.abs(openPrice - closePrice)/(maxPlotPrice-minPlotPrice)*plotHeight, 2)}
                />
            </svg>
        </div>
    );
}

export default Candle;