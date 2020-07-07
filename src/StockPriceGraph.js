import React from 'react';
import './StockPriceGraph.css';
import Candle from './Candle.js';

class StockPriceGraph extends React.Component {
    websocket = null;
    plotHeight = 400;

    constructor(props) {
        super(props);
        this.websocket = props.websocket;
        this.ticker = props.ticker;
        this.state = {
            prices: [],
            period: null,
            candles: [],
            currentCandlePrices: [],
        };

        this.renderCurrentPrice = this.renderCurrentPrice.bind(this);
        this.renderCurrentPriceLine = this.renderCurrentPriceLine.bind(this);
        this.renderCandles = this.renderCandles.bind(this);
        this.renderYValues = this.renderYValues.bind(this);
        this.getTopShift = this.getTopShift.bind(this);
        this.renderCurrentCandle = this.renderCurrentCandle.bind(this);
        this.changePeriod = this.changePeriod.bind(this);
    }

    componentDidMount() {
        this.changePeriod('5min');

        this.websocket.addEventListener('message', event => {
            let newPrice = JSON.parse(event.data).buy;
            this.setState(state => {
                return {
                    currentPrice: newPrice,
                    maxPlotPrice: (newPrice > state.maxPlotPrice ? newPrice * 1.005 : state.maxPlotPrice),
                    minPlotPrice: (newPrice < state.minPlotPrice ? newPrice * 0.995 : state.minPlotPrice),
                    currentCandlePrices: [...state.currentCandlePrices, newPrice]
                }
            });
            this.renderCandles();
        });
    }


    getTopShift(value=this.state.currentPrice) {
        return (this.state.maxPlotPrice - value)/(this.state.maxPlotPrice - this.state.minPlotPrice) * this.plotHeight;
    }

    renderCurrentPriceLine() {
        return <hr className="currentPriceLine" style={{ top: this.getTopShift() }}/>
    }

    renderCurrentPrice() {
        return (
            <p className="currentValue" style={{ top: this.getTopShift(), right: 0 }}>
                <code>{this.state.currentPrice}</code>
            </p>
        );
    }

    renderCandles() {
        let chunkSize = Math.round(this.state.prices.length/30);
        let key = 0;
        let newCandles = [];
        for (let i = 0; i < this.state.prices.length; i+= chunkSize) {
            newCandles.push(
                <Candle
                    key={key++}
                    prices={this.state.prices.slice(i, i+chunkSize)}
                    maxPlotPrice={this.state.maxPlotPrice}
                    minPlotPrice={this.state.minPlotPrice}
                    plotHeight={this.plotHeight}
                />
            );
        }

        this.setState({ candles: newCandles});
    }

    renderYValues() {
        let values = [];
        let key = 0;
        values.push(
            <div className="yValue" key={key++} style={{ top: 0 }}>
                <code>{" "+Math.round(this.state.maxPlotPrice)}</code>
            </div>,
            <div className="yValue" key={key++} style={{ bottom: 0 }}>
                <code>{" "+Math.round(this.state.minPlotPrice)}</code>
            </div>
        );

        for (let value of [
            (this.state.maxPlotPrice*2 + this.state.minPlotPrice)/3,
            (this.state.minPlotPrice*2 + this.state.maxPlotPrice)/3,
        ]) {
            values.push(<div className="yValue" key={key++} style={{ top: this.getTopShift(value)+2+'px' }}>
                <hr className="yValueLine"/>
                <code>{Math.round(value)}</code>
            </div>);
        }
        return (
            <div className="yValues">
                {values}
            </div>
        );
    }

    renderCurrentCandle() {
        return (
            <Candle
                key={this.state.key}
                prices={this.state.currentCandlePrices}
                maxPlotPrice={this.state.maxPlotPrice}
                minPlotPrice={this.state.minPlotPrice}
                plotHeight={this.plotHeight}
            />);
    }

    changePeriod(period) {
        if (period === this.state.period) return;

        this.setState({ period: period }, () => {
            fetch(`http://localhost:3001/api/stock-price/${this.ticker}/${this.state.period}`)
                .then(result => result.json())
                .then(result => {
                    this.setState({
                        prices: result.prices,
                        currentPrice: result.prices[result.prices.length - 1],
                        maxPlotPrice: Math.max(...result.prices) * 1.005,
                        minPlotPrice: Math.min(...result.prices) * 0.995,
                        currentCandlePrices: [result.prices[result.prices.length - 1]]
                    }, () => {
                        this.renderCandles();
                    });
                });
        });
    }

    render() {
        if (!this.state || !this.state.candles) {
            return (
                <div>Загрузка данных...</div>
            );
        }
        return (
            <div className="StockPriceGraph">
                <div className="periodBlock">
                    <div className={`periodBlockElement ${this.state.period==='5min' ? 'activeElement': ''}`}
                        onClick={() => this.changePeriod('5min')}>
                        5 мин
                    </div>
                    <div className={`periodBlockElement ${this.state.period==='1hour' ? 'activeElement': ''}`}
                        onClick={() => this.changePeriod('1hour')}>
                        1 час
                    </div>
                    <div className={`periodBlockElement ${this.state.period==='1day' ? 'activeElement': ''}`}
                        onClick={() => this.changePeriod('1day')}>
                        1 день
                    </div>
                    <div className={`periodBlockElement ${this.state.period==='1month' ? 'activeElement': ''}`}
                        onClick={() => this.changePeriod('1month')}>
                        1 мес
                    </div>
                    <div className={`periodBlockElement ${this.state.period==='1year' ? 'activeElement': ''}`}
                        onClick={() => this.changePeriod('1year')}>
                        1 год
                    </div>
                </div>
                <div className="plotArea" style={{height: this.plotHeight+'px'}}>
                    {this.state.candles}
                    {this.renderCurrentCandle()}
                    {this.renderCurrentPriceLine()}
                    {this.renderCurrentPrice()}
                    {this.renderYValues()}
                </div>
                <div className="plotLegend">

                </div>
            </div>
        );
    }
}

export default StockPriceGraph;