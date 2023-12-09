const express = require('express');
const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);
const App = require('./src');

server.use(express.static('client'));

const app = new App(io);

io.on('connection', (socket) => {
  console.log('Connection:', socket.id);
  app.registerSockets(socket);
});

http.listen(3000, () => {
  console.log(`listening on port: ${3000}`);
});
