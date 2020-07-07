import React from 'react';
import StockListElement from './StockListElement';
import './StockList.css';
import StockDetail from './StockDetail';

class StockList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            openStock: null
        }
        this.openStockDetail = this.openStockDetail.bind(this);
        this.closeStockDetail = this.closeStockDetail.bind(this);
    }

    openStockDetail(ticker) {
        this.setState({ openStock: <StockDetail ticker={ticker}/> });
    }

    closeStockDetail() {
        this.setState({ openStock: null });
    }

    componentDidMount() {
        let key = 0;
        fetch('http://localhost:3001/api/stock-list')
        .then(result => result.json())
        .then(result => {
            console.log('got data');
            this.setState({
                stocks: result.stocks.map(
                    (item) => <StockListElement 
                                key={key++} {...item} 
                                title={item.name}
                                clickHandler={this.openStockDetail}/>
                )
            });
        });
    }

    render() {
        if (this.state.openStock) {
            return [
                <div className="openStockList" onClick={this.closeStockDetail}>
                    <svg width="8" height="10">
                        <polygon points="8,0 5,0 0,5 5,10 8,10 3,5" fill="black"/>
                    </svg>
                    <code>Вернуться к списку акций</code>
                </div>,
                this.state.openStock
            ];
        }
        if (!this.state.stocks.length) {
            return (
                <div>Loading stock list...</div>
            )
        }
        return (
            <div className="StockList">
                {this.state.stocks}
            </div>
        );
    }
}

export default StockList;