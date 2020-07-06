import React from 'react';
import './StockPriceGraph.css';
import Candle from './Candle.js';

class StockPriceGraph extends React.Component {
    prices = [];
    websocket = null;

    constructor(props) {
        super(props);
        this.renderCurrentPrice = this.renderCurrentPrice.bind(this);
        this.renderCandles = this.renderCandles.bind(this);
        this.websocket = props.websocket;
        this.ticker = props.ticker;
        this.state = {
            period: '5min',
            candles: [],
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3001/api/stock-price/${this.ticker}/${this.state.period}`)
        .then(result => result.json())
        .then(result => {
            this.prices = result.prices;
            let maxPlotPrice = Math.max(...this.prices) * 1.005;
            let minPlotPrice = Math.min(...this.prices) * 0.995;
            let plotHeight = 400;

            this.setState({
                currentPrice: this.prices[this.prices.length - 1],
                maxPlotPrice: maxPlotPrice,
                minPlotPrice: minPlotPrice,
                plotHeight: plotHeight,
            }, () => {
                this.renderCandles();

                this.websocket.addEventListener('message', event => {
                    let newPrice = JSON.parse(event.data).buy;
                    this.setState(state => {
                        return {
                            currentPrice: newPrice,
                            maxPlotPrice: (newPrice > state.maxPlotPrice ? newPrice * 1.005 : state.maxPlotPrice),
                            minPlotPrice: (newPrice < state.minPlotPrice ? newPrice * 0.995 : state.minPlotPrice),
                        }
                    });
                    this.renderCandles();
                });
            });
        });
    }

    renderCurrentPrice() {
        const topShift = (this.state.maxPlotPrice - this.state.currentPrice)/(this.state.maxPlotPrice - this.state.minPlotPrice) * this.state.plotHeight;
        return <hr style={{ top: topShift }}/>
    }

    renderCandles() {
        let chunkSize = Math.round(this.prices.length/30);
        let key = 0;
        let newCandles = [];
        for (let i = 0; i < this.prices.length; i+= chunkSize) {
            console.log(i);
            newCandles.push(
                <Candle
                    key={key++}
                    prices={this.prices.slice(i, i+chunkSize)}
                    maxPlotPrice={this.state.maxPlotPrice}
                    minPlotPrice={this.state.minPlotPrice}
                    plotHeight={this.state.plotHeight}
                />
            );
        }

        this.setState({ candles: newCandles});

        
    }

    render() {
        console.log(this.state.candles.length);
        if (!this.state || !this.state.candles) {
            return (
                <div>Loading data...</div>
            );
        }
        return (
            <div className="StockPriceGraph">
                <div className="plotArea">
                    {this.state.candles}
                    {this.renderCurrentPrice()}
                </div>
                <div className="plotLegend"></div>
            <div>
                <p>maxPlotPrice: {this.state.maxPlotPrice}</p>
                <p>minPlotPrice: {this.state.minPlotPrice}</p>
            </div>
            </div>
        );
    }
}

export default StockPriceGraph;