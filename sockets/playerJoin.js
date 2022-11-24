const Player = require('../game/Entity/Player');
const PlayerController = require('../game/Controller/PlayerController');

// New player connected
module.exports = (socket, Game) => {
  socket.on('player:join', (data) => {
    console.log(`Joined Match: ${data.name}`);

    const newPlayer = new Player()
      .setId(socket.id)
      .setName(data.name)
      .setController(PlayerController);

    // Add player to game engine map with key:id and value: playerData
    Game.addPlayer(newPlayer);
  });
};
