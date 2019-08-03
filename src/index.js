import Binance from 'binance-api-node';
import WebSocketAsPromised from 'websocket-as-promised';
import { w3cwebsocket } from 'websocket'

const wsp = new WebSocketAsPromised(
    'wss://stream.binance.com:9443/ws/!ticker@arr',
    {
        createWebSocket: url => new w3cwebsocket(url)
    }
);

let markets = [
    'BNB', 'BTC', 'ETH', 'XRP', 'USDT', 'PAX', 'TUSD', 'USDC', 'USDS'
]

wsp.open().then((result) => {
    wsp.onMessage.addListener(message => {
        findArbitrageAndShow(JSON.parse(message));
    });
}).catch((err) => {
    console.log(err);
});

function findArbitrageAndShow(tickers){
    // console.log(tickers);
    let tempTickers = {};
    let tempMarket = '';
    for (let i = 0; i < tickers.length; i++) {
        tempMarket = endsWArray(tickers[i].s);
        // console.log(tempMarket);
        tempTickers[tempMarket] = tickers[i];
    }

    console.log(tempTickers);
}

function endsWArray(stringToVerify){
    // console.log(stringToVerify);
    for (let i = 0; i < markets.length; i++) {
        if (stringToVerify.endsWith(markets[i]))
            return markets[i];
    }
}