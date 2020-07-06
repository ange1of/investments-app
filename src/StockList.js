import React from 'react';
import StockListElement from './StockListElement';
import './StockList.css';

class StockList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
        }
    }

    componentDidMount() {
        let key = 0;
        fetch('http://localhost:3001/api/stock-list')
        .then(result => result.json())
        .then(result => {
            console.log('got data');
            this.setState({
                stocks: result.stocks.map(
                    (item) => <StockListElement key={key++} {...item} title={item.name}/>
                )
            });
        });
    }

    render() {
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