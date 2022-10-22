const express = require('express');
const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);

const GameEngine = require('./game/gameEngine');
const PORT = 3000;

server.use(express.static('client'));

// Socket Imports
const registerPlayerJoin = require('./sockets/playerJoin');
const registerPlayerLeave = require('./sockets/playerLeave');
const registerUpdateControllerState = require('./sockets/updateControllerState');

// Initialize GameEngine
const Game = new GameEngine('multiplayer game');

// Sockets and disconnect
const onConnection = (socket) => {
  Game.run(socket);

  // Register sockets events
  registerPlayerJoin(socket, Game);
  registerUpdateControllerState(socket, Game);
  registerPlayerLeave(socket, Game);

  // Disconnect player from List
  socket.on('disconnecting', () => {
    const playerDisconnect = Game.playerList.get(socket.id) || false;

    if (playerDisconnect)
      console.log('Player disconnected: ' + playerDisconnect.name);

    Game.playerList.delete(socket.id);
  });
};

io.on('connection', onConnection);

http.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
