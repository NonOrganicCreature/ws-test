const WebSocket = require('ws');

const ws_server = new WebSocket.Server({ port: 3001 });

ws_server.on('connection', function connection(ws) {
    console.log("A client connected");
    ws.on('message', function incoming(message) {
        ws.send(message);
    });
});