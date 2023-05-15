const express = require('express');
const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);

const App = require('./src');
const app = new App();

server.use(express.static('client'));

app.run();

io.on('connection', (socket) => {
  app.attachSocket(socket).registerSockets();
});

http.listen(3000, () => {
  console.log(`listening on port: ${3000}`);
});
