import React from 'react';
import SectorIndexGraph from './SectorIndexGraph';
import './SectorListElement.css';

class SectorListElement extends React.Component {
    openSign = (
        <svg width="10" height="10">
            <polygon points="0,0 0,3 5,8 10,3 10,0 5,5" fill="black"/>
        </svg>
    );
    closeSign = (
        <svg width="10" height="10">
            <polygon points="0,10 0,7 5,2 10,7 10,10 5,5" fill="black"/>
        </svg>
    );

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.changeMode = this.changeMode.bind(this);
    }

    changeMode() {
        if (this.state.open) {
            this.close();
        }
        else {
            this.open();
        }
    }

    open() {
        this.setState({
            open: true
        });
    }

    close() {
        this.setState({
            open: false
        });
    }

    render() {
        return (
            <div className="SectorListElement">
                <div className="info">
                    <div><h3>{this.props.name}</h3></div>
                    <div><code>Последнее значение: {this.props.value}</code></div>
                    <div>
                        <code>Изменение с момента открытия</code>
                        <p 
                            style={{ color: this.props.valueChangePercent < 0 ? 'red': 'green' }}>
                            {this.props.valueChangePercent}
                        </p>
                        <svg width="10" height="10">
                            {this.props.valueChangePercent > 0 ?
                            <polygon points="0,10 5,0 10,10" fill="green"/> : 
                            <polygon points="0,0 5,10 10,0" fill="red"/>}
                        </svg>
                    </div>
                    <div onClick={this.changeMode} className="changeMode">
                        {this.state.open ? this.closeSign : this.openSign}
                    </div>
                </div>
                {this.state.open ? 
                <SectorIndexGraph id={this.props.id} value={this.props.value}/> : ''}
            </div>
        );
    }
}

export default SectorListElement;