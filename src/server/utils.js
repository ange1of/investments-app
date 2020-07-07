const price = {
    'buy': 1000.00,
    'sell': 1000.00
}

function initPrice(buy, sell) {
    price.buy = buy;
    price.sell = sell;
}

function nextPrice() {
    price.buy = Number((price.buy + Math.random()*5 - 2.5).toFixed(2));
    price.sell = Number((price.buy - Math.random()).toFixed(2));
    return {...price};
}

function generateBatch(initBuy, initSell, count) {
    initPrice(initBuy, initSell);
    let result = [];
    for (let i = 0; i < count; i++) {
        result.push(nextPrice().buy);
    }
    return result;
}

const getTimeInterval = {
    '5min': () => {
        const dateObj = new Date();
        return {
            start: (new Date()).setMinutes(dateObj.getMinutes()-5),
            end: dateObj.getTime()
        };
    },
    '1hour': () => {
        const dateObj = new Date();
        return {
            start: (new Date()).setHours(dateObj.getHours()-1),
            end: dateObj.getTime()
        };
    },
    '1day': () => {
        const dateObj = new Date();
        return {
            start: (new Date()).setDate(dateObj.getDate()-1),
            end: dateObj.getTime()
        };
    },
    '1month': () => {
        const dateObj = new Date();
        return {
            start: (new Date()).setMonth(dateObj.getMonth()-1),
            end: dateObj.getTime()
        };
    },
    '1year': () => {
        const dateObj = new Date();
        return {
            start: (new Date()).setFullYear(dateObj.getFullYear()-1),
            end: dateObj.getTime()
        };
    },
}

module.exports.nextPrice = nextPrice;
module.exports.generateBatch = generateBatch;
module.exports.getTimeInterval = getTimeInterval;