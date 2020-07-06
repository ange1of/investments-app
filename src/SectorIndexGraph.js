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
    }

    componentDidMount() {
        fetch(`http://localhost:3001/api/index-value/${this.props.id}/${this.period}`)
            .then(result => result.json())
            .then(result => {
                this.values = result.values;
                this.maxPlotPrice = Math.max(...this.values) + 5;
                this.minPlotPrice = Math.min(...this.values) - 5;
                this.renderCandles();
            });
    }

    renderCandles() {
        let chunkSize = Math.round(this.values.length/30);
        let key = 0;
        let newCandles = [];
        for (let i = 0; i < this.values.length; i+= chunkSize) {
            console.log(i);
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

    renderCurrentValue() {
        const topShift = (this.maxPlotPrice - this.state.value)/(this.maxPlotPrice - this.minPlotPrice) * this.plotHeight;
        return <hr style={{ top: topShift }}/>
    }

    render() {
        if (!this.state.candles.length) {
            return (
                <div>Загрузка данных...</div>
            );
        }
        return (
            <div className="SectorIndexGraph" style={{height: this.plotHeight+'px'}}>
                <div className="plotArea">
                    {this.state.candles}
                    {this.renderCurrentValue()}
                </div>
                <div className="plotLegend"></div>
            </div>
        )
    }
}

export default SectorIndexGraph;