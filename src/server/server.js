const utils = require('./utils.js');
const express = require('express');
const expressWs = require('express-ws');

const app = express();
expressWs(app);

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

app.get('/api/sector-list', (request, response) => {
    console.log('[GET] /api/sector-list');
    
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send({
        sectors: [
            {
                id: '1',
                name: 'Индекс нефти и газа',
                value: '7113',
                valueChangePercent: -0.55,
            },
            {
                id: '2',
                name: 'Индекс электроэнергетики',
                value: '2199',
                valueChangePercent: 0.69,
            },
            {
                id: '3',
                name: 'Индекс телекоммуникаций',
                value: '2314',
                valueChangePercent: 1.53,
            },
            {
                id: '4',
                name: 'Индекс металлов и добычи',
                value: '7711',
                valueChangePercent: -0.29,
            }
        ]
    });
});

app.get('/api/index-value/:id/:period', (request, response) => {
    console.log(`[GET] /api/index-value/${request.params.id}/${request.params.period}`);

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send({
        values: utils.generateBatch(3000, 3000, 180),
        timeInterval: utils.getTimeInterval[request.params.period]()
    });
});

app.get('/api/stock-detail/:ticker', (request, response) => {
    console.log(`[GET] /api/stock-detail/${request.params.ticker}`);

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
    console.log(`[GET] /api/stock-price/${request.params.ticker}/${request.params.period}`);

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.send({
        prices: utils.generateBatch(1000, 1000, 180),
        timeInterval: utils.getTimeInterval[request.params.period]()
    });
});

// Setup notifications server
app.ws('/api/notifications', 
    (ws, request) => {
        console.log('[WS] connection at /api/notifications');
        let intervalId = setInterval(() => ws.send(JSON.stringify(
            {
                title: 'Акции YNDX продолжают расти',
                detail: 'Тут может быть написана дополнительная важная информация для трейдера'
            }
        )), 4000);

        ws.on('close', () => clearInterval(intervalId));
    }
);

//Setup WS for current stock
app.ws(`/api/stock-price/`, 
    (ws, request) => {
        console.log('[WS] connection at /api/stock-price');
        let intervalId = setInterval(() => ws.send(JSON.stringify(utils.nextPrice())), 1000);
        ws.on('close', () => clearInterval(intervalId));
    }
);

app.listen(port);
