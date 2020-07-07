import React from 'react';
import Candle from './Candle';
import './SectorIndexGraph.css';

class SectorIndexGraph extends React.Component {
    plotHeight = 300;

    constructor(props) {
        super(props);
        this.id = props.id;
        this.state = {
            candles: [],
            value: props.value,
            values: [],
            period: null
        };
        this.renderCandles = this.renderCandles.bind(this);
        this.renderCurrentValueLine = this.renderCurrentValueLine.bind(this);
        this.renderCurrentValue = this.renderCurrentValue.bind(this);
        this.renderYValues = this.renderYValues.bind(this);
        this.getTopShift = this.getTopShift.bind(this);
    }

    componentDidMount() {
        this.changePeriod('5min');
    }

    getTopShift(value=this.state.value) {
        return (this.state.maxPlotValue - value)/(this.state.maxPlotValue - this.state.minPlotValue) * this.plotHeight;
    }

    renderCandles() {
        let chunkSize = Math.round(this.state.values.length/30);
        let key = 0;
        let newCandles = [];
        for (let i = 0; i < this.state.values.length; i+= chunkSize) {
            newCandles.push(
                <Candle
                    key={key++}
                    prices={this.state.values.slice(i, i+chunkSize)}
                    maxPlotPrice={this.state.maxPlotValue}
                    minPlotPrice={this.state.minPlotValue}
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
                <code>{Math.round(this.state.maxPlotValue)}</code>
            </div>,
            <div className="yValue" key={key++} style={{ bottom: 0 }}>
                <code>{Math.round(this.state.minPlotValue)}</code>
            </div>
        );

        for (let value of [
            (this.state.maxPlotValue*2 + this.state.minPlotValue)/3,
            (this.state.minPlotValue*2 + this.state.maxPlotValue)/3,
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

    changePeriod(period) {
        if (period === this.state.period) return;

        this.setState({ period: period }, () => {
            fetch(`http://localhost:3001/api/index-value/${this.props.id}/${this.state.period}`)
                .then(result => result.json())
                .then(result => {
                    this.setState({
                        value: result.values[result.values.length - 1],
                        values: result.values,
                        maxPlotValue: Math.max(...result.values) + 5,
                        minPlotValue: Math.min(...result.values) - 5
                }, () => this.renderCandles());
            });
        });
    }

    render() {
        if (!this.state.candles.length) {
            return (
                <div>Загрузка данных...</div>
            );
        }
        return (
            <div className="SectorIndexGraph">
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