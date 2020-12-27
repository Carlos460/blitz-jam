const express = require('express');
const { Bullet } = require('./game/entity');
const server = express();
const http = require('http').createServer(server);
const io = require('socket.io')(http);

// Game Imports
const Entity = require('./game/entity');

server.use(express.static('client'));

var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};

// const Player = (givenId, givenName) => {
//   return {
//     id: givenId,
//     name: givenName,
//     posx: 0,
//     posy: 0,
//     direction: {
//       right: false,
//       down: false,
//       left: false,
//       up: false,
//     },
//   };
// };

let GAME_STARTED = false;
let playerList = [];
let projectileList = [];

io.on('connection', (socket) => {
  const _id = ID();

  socket.on('createNewPlayer', (data) => {
    let newPlayer = Entity.Player(_id, data.name);

    playerList = [...playerList, newPlayer];

    console.log(
      `\n${newPlayer.name} has connected, there are a total of ${playerList.length} players\n`
    );

    GAME_STARTED = true;

    socket.emit('join', { player: newPlayer });
  });

  socket.on('updatePlayer', (data) => {
    playerList.forEach((player) => {
      const playerEntityData = player.entityData;
      const playerMouseData = player.shooterController;

      if (player.entityData.id === _id) {
        // Update player movement
        if (data.movementController.right === true) {
          player.entityData.posx += 5;
        }
        if (data.movementController.left === true) {
          player.entityData.posx -= 5;
        }
        if (data.movementController.down === true) {
          player.entityData.posy -= 5;
        }
        if (data.movementController.up === true) {
          player.entityData.posy += 5;
        }
        //update player mouse location
        player.shooterController.mousePosx = data.shooterController.mousePosx;
        player.shooterController.mousePosy = data.shooterController.mousePosy;

        //update shooting state
        player.shooterController.isShooting = data.shooterController.isShooting;

        if (player.shooterController.isShooting) {
          const angle = Math.atan2(
            playerEntityData.posy - playerMouseData.mousePosy,
            playerEntityData.posx - playerMouseData.mousePosx
          );
          console.log(angle, playerEntityData, playerMouseData);
          const newBullet = Bullet(_id, angle);

          newBullet.entityData.posx = player.entityData.posx + 5;
          newBullet.entityData.posy = player.entityData.posy + 5;

          projectileList = [...projectileList, newBullet];
        }
      }
    });
    // update projectiles
    projectileList.forEach((projectile) => {
      projectile.entityData.posx -= Math.cos(projectile.facingDirection) * 40;
      projectile.entityData.posy -= Math.sin(projectile.facingDirection) * 40;
    });
  });
  if (GAME_STARTED) {
    setInterval(() => {
      io.emit('packageUpdate', {
        playerList: playerList,
        projectileList: projectileList,
      });
    }, 1000 / 30);
  }

  socket.on('disconnect', () => {
    const newPlayerList = playerList.filter((player) => {
      if (player.entityData.id !== _id) {
        return player;
      }
      console.log('player left: ', player);
    });

    playerList = newPlayerList;

    console.log(
      `\nA player has disconnected, there are a total of ${playerList.length} players\n`,
      `\nupdated player list\n`
    );
    playerList.forEach((player, index) => {
      console.log(`${index + 1}. `, player);
    });
  });
});

http.listen(3000, () => {
  console.log('listening on port :3000');
});
