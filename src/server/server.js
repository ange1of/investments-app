const utils = require('./utils.js');
const express = require('express');
const WebSocket = require('ws');

const app = express();
const port = 3001;

app.get('/api/stock-list', (request, response) => {
    console.log('[GET] /api/stock-list');

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send({
        stocks: [
            {
                ticker: 'TSLA',
                name: 'Tesla Motors',
                priceChangePercent: -3.36,
                price: 1022.45,
                currency: 'USD',
                sector: 'Потребительские товары и услуги',
            },
            {
                ticker: 'YNDX',
                name: 'Yandex',
                priceChangePercent: 0.42,
                price: 3655,
                currency: 'RUB',
                sector: 'Телекоммуникации',
            },
        ]
    });
});

app.get('/api/stock-list', (request, response) => {
    console.log('[GET] /api/stock-list');
    
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send({
        sectors: [
            {
                id: '',
                name: '',
                value: '',
                valueChangePercent: '',
            }
        ]
    });
});

app.get('/api/index-value/:id/:period', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send({
        values: utils.generateBatch(3000, 3000, 180)
    });
});

app.get('/api/stock-detail/:ticker', (request, response) => {
    const ticker = request.params.ticker;

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send({
        ticker: ticker,
        currency: 'USD',
        currentPrice: {
            buy: 1000.00,
            sell: 1000.00
        },
        companyInfo: {
            name: 'Tesla Motors',
            capitalization: '100.0 млрд',
            stockCount: 100000000,
            sector: 'Потребительские товары и услуги',
            income: '16.4 млн'
        }
    });
});

app.get('/api/stock-price/:ticker/:period', (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send({
        prices: utils.generateBatch(1000, 1000, 180)
    });
});

const server = app.listen(port);

const wss = new WebSocket.Server({ server: server });

wss.on('connection', (ws) => {
    setInterval(() => ws.send(JSON.stringify(utils.nextPrice())), 1000);
});
