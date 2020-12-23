const { Socket } = require('dgram');
const express = require('express');
const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);

server.use(express.static('client'));

const Player = (givenId, givenName) => {
  return { id: givenId, name: givenName, posx: 0, posy: 0 };
};

let playerTotal = 0;
let playerList = [];

io.on('connection', (socket) => {
  playerTotal = playerTotal + 1;
  let newPlayer = Player(socket.id, '');
  playerList.push(newPlayer);
  socket.emit('join', { player: newPlayer });

  console.log(
    `\nA player has connected, there are a total of ${playerTotal} players\n`,
    newPlayer
  );

  setInterval(() => {
    io.emit('packageUpdate', { playerList });
  }, 1000);

  socket.on('joined', (socket) => {
    playerList.forEach((player) => {
      if (player.id === socket.id) {
        player.name = socket.name;
      }
    });
    console.log(`updated player name\n${playerList.map((player) => player)}`);
  });
  socket.on('updatePlayer', (socket) => {
    console.log(socket.player.id);
    playerList.forEach((player) => {
      if (player.id === socket.player.id) {
        player.posx += 5;
        player.posy += 5;
      }
    });

    io.emit('packageUpdate', { playerList: playerList });
  });

  // socket.on('DeletePlayer', (socket) => {
  // });

  socket.on('disconnect', () => {
    playerTotal = playerTotal - 1;
    console.log(
      `A player has disconnected, there are a total of ${playerTotal} players \nPlayer Id: ${socket.id}\n`
    );

    playerList.forEach((player) => console.log(player));

    console.log('updated player list\n', playerList);
  });
});

http.listen(3000, () => {
  console.log('listening on port :3000');
});
