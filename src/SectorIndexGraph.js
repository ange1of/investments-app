import React from 'react';
import Candle from './Candle';
import './SectorIndexGraph.css';

class SectorIndexGraph extends React.Component {
    plotHeight = 300;
    values = [];

    constructor(props) {
        super(props);
        this.state = {
            candles: [],
            value: props.value
        };
        this.period = 'day';
        this.renderCandles = this.renderCandles.bind(this);
        this.renderCurrentValueLine = this.renderCurrentValueLine.bind(this);
        this.renderCurrentValue = this.renderCurrentValue.bind(this);
        this.renderYValues = this.renderYValues.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:3001/api/index-value/${this.props.id}/${this.period}`)
            .then(result => result.json())
            .then(result => {
                this.values = result.values;
                this.maxPlotPrice = Math.max(...this.values) + 5;
                this.minPlotPrice = Math.min(...this.values) - 5;
                this.renderCandles();
                this.setState({ value: this.values[this.values.length - 1]});
            });
    }

    renderCandles() {
        let chunkSize = Math.round(this.values.length/30);
        let key = 0;
        let newCandles = [];
        for (let i = 0; i < this.values.length; i+= chunkSize) {
            newCandles.push(
                <Candle
                    key={key++}
                    prices={this.values.slice(i, i+chunkSize)}
                    maxPlotPrice={this.maxPlotPrice}
                    minPlotPrice={this.minPlotPrice}
                    plotHeight={this.plotHeight}
                />
            );
        }

        this.setState({ candles: newCandles});
    }

    renderCurrentValueLine() {
        const topShift = (this.maxPlotPrice - this.state.value)/(this.maxPlotPrice - this.minPlotPrice) * this.plotHeight;
        return  <hr style={{ top: topShift }} />;
    }

    renderCurrentValue() {
        const topShift = (this.maxPlotPrice - this.state.value)/(this.maxPlotPrice - this.minPlotPrice) * this.plotHeight;
        return (
            <p className="currentValue" style={{ top: topShift - 7, right: 0 }}>
                <code>{this.state.value}</code>
            </p>
        );
    }

    renderYValues() {
        let values = [];
        let key = 0;
        for (let value of [
            this.maxPlotPrice, (this.maxPlotPrice*2 + this.minPlotPrice)/3,
            (this.minPlotPrice*2 + this.maxPlotPrice)/3, this.minPlotPrice
        ]) {
            values.push(<p className="yValue" key={key++}>
                <code>—{Math.round(value)}</code>
            </p>);
        }
        return (
            <div className="yValues">
                {values}
            </div>
        );
    }

    render() {
        if (!this.state.candles.length) {
            return (
                <div>Загрузка данных...</div>
            );
        }
        return (
            <div className="SectorIndexGraph">
                <div className="plotArea" style={{height: this.plotHeight+'px'}}>
                    {this.state.candles}
                    {this.renderCurrentValueLine()}
                    {this.renderCurrentValue()}
                    {this.renderYValues()}
                </div>
                <div className="plotLegend">

                </div>
            </div>
        )
    }
}

export default SectorIndexGraph;