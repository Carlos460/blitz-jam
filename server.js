const express = require('express');
const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);

const GameEngine = require('./game/gameEngine');
const PORT = 3000;

server.use(express.static('client'));

// Socket Imports
const registerCreatePlayer = require('./sockets/createPlayer');
const registerUpdateControllerState = require('./sockets/updateControllerState');
const registerSendPackage = require('./sockets/sendPackage');

// Initialize GameEngine
const Game = new GameEngine('multiplayer game');

// Sockets and disconnect
const onConnection = (socket) => {
  // Register new players
  registerCreatePlayer(socket, Game);

  // Update player controller states
  registerUpdateControllerState(socket, Game);

  // Send updated package to client
  registerSendPackage(socket, Game);

  // Disconnect player from List
  socket.on('disconnecting', () => {
    const playerDisconnect = Game.playerList.get(socket.id);

    console.log('Player disconnected: ' + playerDisconnect.name);
    Game.playerList.delete(socket.id);
  });
};

io.on('connection', onConnection);

http.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
