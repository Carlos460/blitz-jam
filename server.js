const express = require('express');
const { connect } = require('http2');
const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);

server.use(express.static('client'));

// Game Imports
const GameEngine = require('./game/gameEngine');

// Socket Imports
const registerCreatePlayer = require('./sockets/createPlayer');
const registerUpdatePlayer = require('./sockets/updatePlayer');

const Platformer = new GameEngine('platformer');

const onConnection = (socket) => {
  registerCreatePlayer(io, socket, Platformer);
  registerUpdatePlayer(io, socket, Platformer);

  socket.on('disconnect', () => {
    Platformer.playerList.forEach((player, index, playerList) => {
      console.log(player);
      console.log(`id of left: ${socket.id}`);
      if (player.id === socket.id) {
        playerList.splice(index, 1);
      }
    });
  });
};

io.on('connection', onConnection);

http.listen(3000, () => {
  console.log('listening on port :3000');
});
