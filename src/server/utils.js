const price = {
    'buy': 1000.00,
    'sell': 1000.00
}

function initPrice(buy, sell) {
    price.buy = buy;
    price.sell = sell;
}

function nextPrice() {
    price.buy = Number((price.buy + Math.random()*3 - 1.5).toFixed(2));
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

module.exports.nextPrice = nextPrice;
module.exports.generateBatch = generateBatch;