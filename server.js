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

// Initialize GameEngine
const Game = new GameEngine('multiplayer game');

// Sockets and disconnect
const onConnection = (socket) => {
  Game.run(socket);

  // Register new players
  registerCreatePlayer(socket, Game);

  // Update player controller states
  registerUpdateControllerState(socket, Game);

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
