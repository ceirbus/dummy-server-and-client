
const WebSocket = require('ws');
const http = require('http');

// WS Server ----------------

// change this port to your kitchen websocket port
const wsPort = 2356;
const wss = new WebSocket.Server({ port: wsPort });
 
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('WS received: ', message);
  });
 
  ws.on('error', function error(err) {
    console.log('WS err: ', err);
  });
});

console.log(`WS Server running at port: ${wsPort}`);

// HTTP Server ----------------

// change this port to your kitchen http port
const httpPort = 3002;
const app = http.createServer((request, response) => {
  console.log('HTTP request url: ', request.url);
  const data = [];
  if (request.method === 'POST') {
        request.on('data', function(chunk) {
          data.push(chunk);
        }).on('end', function() {
          const body = Buffer.concat(data).toString();
          console.log('HTTP request body: ', JSON.stringify(body));
        });
        response.writeHead(200);
        response.end();
    }
});

app.listen(httpPort);

console.log(`HTTP Server running at port: ${httpPort}`);