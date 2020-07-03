import React from 'react';
import './StockPriceGraph.css';

function StockPriceGraph({ stockId }) {
    return (
        <div className="StockPriceGraph">
            <div className="plotArea"></div>
            <div className="plotLegend"></div>
        </div>
    );
}

export default StockPriceGraph;