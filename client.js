const WebSocket = require('ws');

// WS Client ----------------

// change this port to your kitchen websocket port
const port = 2356;
const url = 'localhost';
const wsClient = new WebSocket(`ws://${url}:${port}/`);

wsClient.on('open', function open() {
    console.log('opened');
});

wsClient.on('message', function incoming(message) {
    console.log('received: %s', message);
    wsClient.send('client can send - working');
});

wsClient.on('close', function close() {
    console.log('disconnected');
});

wsClient.on('error', function error(e) {
    console.log('error: ', e);
});