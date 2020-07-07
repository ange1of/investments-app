import React from 'react';
import './StockDetail.css';
import StockPrice from './StockPrice.js';
import StockInfo from './StockInfo.js';
import StockPriceGraph from './StockPriceGraph.js';
import ErrorMessage from './ErrorMessage.js';

class StockDetail extends React.Component {
    data=null;
    errorMessage = null;

    constructor(props) {
        super(props);
        this.ticker = props.ticker;
        fetch(`http://localhost:3001/api/stock-detail/${this.ticker}`)
            .then(result => result.json())
            .then(json => {
                this.data = json;
                this.state = {
                    buyPrice: this.data.currentPrice.buy,
                    sellPrice: this.data.currentPrice.sell
                };
            })
            .catch(error => this.errorMessage = error.message);
    }

    componentDidMount() {
        this.socket = new WebSocket(`ws://localhost:3001/api/stock-price`);
        this.socket.onmessage = event => {
            console.log(`message: ${event.data}`);
            this.setState({
                buyPrice: JSON.parse(event.data).buy,
                sellPrice: JSON.parse(event.data).sell
            });
        };
        this.socket.onclose = event => {
            if (!event.wasClean) {
                this.errorMessage = 'Соединение с сервером прервано';
            }
        };
        this.socket.onerror = error => {
            this.errorMessage = `Ошибка подключения к серверу: ${error.message}`;
        };
    }

    componentWillUnmount() {
        this.socket.close();
    }

  render() {
    if (this.errorMessage) {
        return <ErrorMessage message={this.errorMessage}/>
    }
    if (!this.state || !this.data) {
        return <div>Загрузка...</div>
    }
    return (
        <div className="StockDetail">
            <div className="StockPriceContainer">
                <StockPrice title="Покупка" price={this.state.buyPrice} currency={this.data.currency}/>
                <StockPrice title="Продажа" price={this.state.sellPrice} currency={this.data.currency}/>
            </div>
            <StockPriceGraph ticker={this.ticker} websocket={this.socket}/>
            <StockInfo {...this.data.companyInfo} currency={this.data.currency}/>
            { this.errorMessage ? <ErrorMessage data={this.errorMessage}/> : '' }
        </div>
    );
  }
}
export default StockDetail;