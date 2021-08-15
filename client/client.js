class Client {
    constructor() {
        const WebSocket = require('ws');
        const prompt = require('prompt-sync')({sigint: true});
        const config = require('../configs/configuration');
        const messageTypes = require('../configs/messageTypes');
        const GREEN = '\x1b[32m%s\x1b[0m';
        // WS Client ----------------

        // change this port to your kitchen websocket port
        const ws = new WebSocket(`ws://${config.url}:${config.websocketPort}/`);

        const promptUser = () => {
            const message = prompt('Please type a message to send to the server: ');
            console.log(GREEN, 'CLIENT - sending: '+ String(message));
            ws.send(message);
        };

        ws.on('open', function open() {
            console.log(GREEN, 'CLIENT - opened\n');
            if (ws.readyState === ws.OPEN) {
                promptUser();
            }
        });

        ws.on('message', function incoming(message) {
            console.log(GREEN, 'CLIENT - receiving: '+ String(message));
            if (message === messageTypes.ACK) {
                promptUser();
            }
        });

        ws.on('close', function close() {
            console.log(GREEN, 'CLIENT - closed');
        });

        ws.on('error', function error(e) {
            console.log(GREEN, 'CLIENT - error: ', e);
        });
    }   
}

module.exports = Client;