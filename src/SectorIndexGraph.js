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
        this.getTopShift = this.getTopShift.bind(this);
    }

    componentDidMount() {
        fetch(`http://localhost:3001/api/index-value/${this.props.id}/${this.period}`)
            .then(result => result.json())
            .then(result => {
                this.values = result.values;
                this.maxPlotValue = Math.max(...this.values) + 5;
                this.minPlotValue = Math.min(...this.values) - 5;
                this.renderCandles();
                this.setState({ value: this.values[this.values.length - 1]});
            });
    }

    getTopShift(value=this.state.value) {
        return (this.maxPlotValue - value)/(this.maxPlotValue - this.minPlotValue) * this.plotHeight;
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
                    maxPlotPrice={this.maxPlotValue}
                    minPlotPrice={this.minPlotValue}
                    plotHeight={this.plotHeight}
                />
            );
        }

        this.setState({ candles: newCandles});
    }

    renderCurrentValueLine() {
        return  <hr className="currentValueLine" style={{ top: this.getTopShift() }}/>;
    }

    renderCurrentValue() {
        return (
            <p className="currentValue" style={{ top: this.getTopShift(), right: 0 }}>
                <code>{this.state.value}</code>
            </p>
        );
    }

    renderYValues() {
        let values = [];
        let key = 0;
        values.push(
            <div className="yValue" key={key++} style={{ top: 0 }}>
                <code>{Math.round(this.maxPlotValue)}</code>
            </div>,
            <div className="yValue" key={key++} style={{ bottom: 0 }}>
                <code>{Math.round(this.minPlotValue)}</code>
            </div>
        );

        for (let value of [
            (this.maxPlotValue*2 + this.minPlotValue)/3,
            (this.minPlotValue*2 + this.maxPlotValue)/3,
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