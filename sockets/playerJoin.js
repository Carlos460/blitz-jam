const Player = require('../game/player');

// New player connected
module.exports = (socket, Game) => {
  socket.on('player:join', (data) => {
    console.log(`Player joined: ${data.name}`);

    const newPlayer = new Player(data.name, socket.id, 50, 50);

    // Add player to game engine map with key:id and value: playerData
    Game.playerList.set(newPlayer._id, newPlayer.returnDataSet());
  });
};
