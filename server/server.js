
class Server {
  constructor() {
    const WebSocket = require('ws');
    const http = require('http');
    const fs = require('fs');
    const config = require('../configs/configuration');
    const messageTypes = require('../configs/messageTypes');
    const RED = '\x1b[31m%s\x1b[0m';

    // WS Server ----------------

    // change this port to your kitchen websocket port
    const wss = new WebSocket.Server({ port: config.websocketPort });
    
    wss.on('connection', function connection(ws) {
      ws.on('message', function incoming(message) {
        console.log(RED, 'SERVER - receiving: ' + String(message));
        if (ws.readyState === ws.OPEN) {
          console.log(RED, 'SERVER - sending: ' + messageTypes.ACK + '\n');
          ws.send(messageTypes.ACK);
        }
      });
    
      ws.on('error', function error(err) {
        console.log(RED, 'SERVER - WS err: ', err);
      });
    });

    console.log(RED, `WS Server running at port: ${config.websocketPort}`);

    // HTTP Server ----------------

    // change this port to your kitchen http port
    const httpServer = http.createServer((request, response) => {
      console.log(RED, 'HTTP request url: ', request.url);
      const data = [];
      if (request.method === 'POST') {
          request.on('data', function(chunk) {
            data.push(chunk);
          }).on('end', function() {
            const body = Buffer.concat(data).toString();
            console.log(RED, 'HTTP request body: ', JSON.stringify(body));
          });
          response.writeHead(200);
          response.end();
      }
    });

    httpServer.listen(config.httpPort);

    console.log(RED, `HTTP Server running at port: ${config.httpPort}`);

    // HTTP Redundancy Server ----------------

    // change this port to your kitchen http port
    const redundancyHttpServer = http.createServer((request, response) => {
      console.log(RED, 'HTTP request url: ', request.url);
      const data = [];
      if (request.method === 'POST') {
            request.on('data', function(chunk) {
              data.push(chunk);
            }).on('end', function() {
              const body = Buffer.concat(data).toString();
              console.log(RED, 'HTTP request body: ', JSON.stringify(body));
            });
            response.writeHead(200);
            response.end();
        }
    });

    redundancyHttpServer.listen(config.redundancyPort);

    console.log(RED, `HTTP Redundancy Server running at port: ${config.redundancyPort}\n`);
  }
}

module.exports = Server;