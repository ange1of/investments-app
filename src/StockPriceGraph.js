import React from 'react';
import './StockPriceGraph.css';
import Candle from './Candle.js';

class StockPriceGraph extends React.Component {
    prices = [];
    candles = [];
    websocket = null;

    constructor(props) {
        super(props);
        this.renderCurrentPrice = this.renderCurrentPrice.bind(this);
        this.websocket = props.websocket;
        this.ticker = props.ticker;

        fetch(`http://localhost:3001/api/price/${this.ticker}/${props.period}`)
        .then(result => result.json())
        .then(result => {
            console.log('got result');
            this.prices = result.prices;
            let maxPlotPrice = Math.max(...this.prices) * 1.1;
            let minPlotPrice = Math.min(...this.prices) * 0.9;
            let plotHeight = 400;

            let chunkSize = Math.round(this.prices.length/30);
            let key = 0;

            this.state = {
                period: '5min',
                currentPrice: this.prices[this.prices.length - 1],
                maxPlotPrice: maxPlotPrice * 1.1,
                minPlotPrice: minPlotPrice * 0.9,
                plotHeight: plotHeight,
            };
            console.log(`state: ${JSON.stringify(this.state)}`);

            for (let i = 0; i < this.prices.length; i+= chunkSize) {
                this.candles.push(
                    <Candle
                        key={key++}
                        prices={this.prices.slice(i, i+chunkSize)}
                        maxPlotPrice={this.state.maxPlotPrice}
                        minPlotPrice={this.state.minPlotPrice}
                        plotHeight={this.state.plotHeight}
                    />
                );
            }
        });
    }

    componentDidMount() {
        this.websocket.addEventListener('message', event => {
            console.log(`state: ${JSON.stringify(this.state)}`);
            let newPrice = JSON.parse(event.data).buy;
            if (this.state) {
                this.setState(state => {
                    return {
                        currentPrice: newPrice,
                        maxPlotPrice: (newPrice > state.maxPlotPrice ? newPrice * 1.1 : state.maxPlotPrice),
                        minPlotPrice: (newPrice < state.minPlotPrice ? newPrice * 0.9 : state.minPlotPrice),
                    }
                });
            }
            console.log(`graph accepted: ${event.data}`);
        });
    }

    renderCurrentPrice() {
        const topShift = (this.state.maxPlotPrice - this.state.currentPrice)/(this.state.maxPlotPrice - this.state.minPlotPrice) * this.state.plotHeight;
        console.log(`shift: ${topShift}\nmaxPlotPrice: ${this.maxPlotPrice}, curr: ${this.state.currentPrice}`);
        return <hr style={{ top: topShift }}/>
    }

    render() {
        if (!this.state) {
            return (
                <div>Loading data...</div>
            );
        }
        return (
            <div className="StockPriceGraph">
                <div className="plotArea">
                    {this.candles}
                    {this.renderCurrentPrice()}
                </div>
                <div className="plotLegend"></div>
            </div>
        );
    }
}

export default StockPriceGraph;