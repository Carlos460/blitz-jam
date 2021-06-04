// Game Imports
const Player = require('../game/player');

module.exports = (io, socket, GameEngine) => {
  console.log(GameEngine);
  const createPlayer = (data) => {
    console.log(`Creating new player ${data}`);
    let newPlayer = new Player(data, socket.id, 50, 50);

    GameEngine.playerList = [
      ...GameEngine.playerList,
      newPlayer.returnDataSet(),
    ];
    console.log(GameEngine.playerList);
  };

  socket.on('player:create', createPlayer);
};
