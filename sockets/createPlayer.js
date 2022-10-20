const Player = require('../game/player');

// New player connected
module.exports = (socket, GameEngine) => {
  socket.on('player:create', (data) => {
    console.log(`Player joined: ${data.name}`);

    const newPlayer = new Player(data.name, socket.id, 50, 50);

    // Add player to game engine map with key:id and value: playerData
    GameEngine.playerList.set(newPlayer._id, newPlayer.returnDataSet());

    // Send data of new player
    socket.emit('player-init-status', newPlayer.returnDataSet());
  });
};
