const express = require('express');
const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);

server.use(express.static('client'));

var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

const Player = (givenId, givenName) => {
  return {
    id: givenId,
    name: givenName,
    posx: 0,
    posy: 0,
    direction: {
      right: false,
      down: false,
      left: false,
      up: false,
    },
  };
};

let playerList = [];

io.on('connection', (socket) => {
  const _id = ID();

  socket.on('createNewPlayer', () => {
    let newPlayer = Player(_id, '');
    playerList.push(newPlayer);
    console.log(
      `\nA player has connected, there are a total of ${playerList.length} players\n`,
      newPlayer
    );
    socket.emit('join', { player: newPlayer });
  });

  socket.on('joined', (data) => {
    playerList.forEach((player) => {
      if (player.id === _id) {
        player.name = data.name;
        console.log(`updated player name to ${player.name}\n`, player);
      }
    });
  });
  socket.on('updatePlayer', (data) => {
    playerList.forEach((player) => {
      if (player.id === _id) {
        player.direction = data.direction;
        if (player.direction.right === true) {
          player.posx += 5;
        }
        if (player.direction.left === true) {
          player.posx -= 5;
        }
        if (player.direction.down === true) {
          player.posy -= 5;
        }
        if (player.direction.up === true) {
          player.posy += 5;
        }
      }
    });
    io.emit('packageUpdate', { playerList });
  });

  socket.on('disconnect', () => {
    const newPlayerList = playerList.filter((player) => {
      if (player.id !== _id) {
        return player;
      }
      console.log('player left: ', player);
    });

    playerList = newPlayerList;

    console.log(
      `\nA player has disconnected, there are a total of ${playerList.length} players\n`,
      `updated player list\n`,
      playerList
    );
  });
});

http.listen(3000, () => {
  console.log('listening on port :3000');
});
