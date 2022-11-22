const express = require('express');
const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);

const Game = require('./game/Game');
const PORT = 3000;

server.use(express.static('client'));

// Socket Imports
const registerPlayerJoin = require('./sockets/playerJoin');
const registerPlayerLeave = require('./sockets/playerLeave');
const registerUpdateControllerState = require('./sockets/updateControllerState');

// Initialize GameEngine
const game = new Game('multiplayer game');

// Sockets and disconnect
const onConnection = (socket) => {
  game.setClientPackageSender(socket);

  // Register sockets events
  registerPlayerJoin(socket, game);
  registerUpdateControllerState(socket, game);
  registerPlayerLeave(socket, game);

  // Disconnect player from List
  socket.on('disconnecting', () => {
    const playerDisconnect = game.playerList.get(socket.id) || false;

    if (playerDisconnect)
      console.log('Player disconnected: ' + playerDisconnect.name);

    game.playerList.delete(socket.id);
  });
};

io.on('connection', onConnection);

http.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
