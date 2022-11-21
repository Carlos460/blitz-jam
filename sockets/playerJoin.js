const Player = require('../game/Entity/Player');

// New player connected
module.exports = (socket, Game) => {
  socket.on('player:join', (data) => {
    console.log(`Player joined: ${data.name}`);

    const newPlayer = new Player(data.name, socket.id, 50, 50);
    // TODO: Instead of contructor use methods to update the data

    // Add player to game engine map with key:id and value: playerData
    Game.addPlayer(newPlayer);
  });
};
