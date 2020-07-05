import React from 'react';
import './StockPriceGraph.css';
import Candle from './Candle.js';

function StockPriceGraph({ stockId }) {

    function generatePrices(initialValue) {
        let result = [];
        let curValue = initialValue;
        for (let i = 0; i < 180; i++) {
            let newValue = Number((curValue + Math.random()*15 - 7.5).toFixed(2));
            result.push(newValue);
            
            curValue = newValue;
        }
        return result;
    }
    let prices = generatePrices(1000);
    let maxPlotPrice = Math.max(...prices) + 5;
    let minPlotPrice = Math.min(...prices) - 5;
    let plotHeight = 400;
    console.log(prices);
    console.log(maxPlotPrice);
    console.log(minPlotPrice);

    let candles = [];
    let chunkSize = Math.round(prices.length/30);
    let key = 0;
    for (let i = 0; i < prices.length; i+= chunkSize) {
        candles.push(
            <Candle
                key={key++}
                prices={prices.slice(i, i+chunkSize)}
                maxPlotPrice={maxPlotPrice}
                minPlotPrice={minPlotPrice}
                plotHeight={plotHeight}
            />
        );
    }

    return (
        <div className="StockPriceGraph">
            <div className="plotArea">
                {candles}
            </div>
            <div className="plotLegend"></div>
        </div>
    );
}

export default StockPriceGraph;