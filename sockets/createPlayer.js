// Game Imports
const Player = require('../game/player')
// Triggers when a client connects to the socket
// and makes a new player
module.exports = ( socket, GameEngine) => {
  socket.on('player:create', (name) => {
    console.log(`Player joined: ${name}`);

    const newPlayer = new Player(name, socket.id, 50, 50);

    // Add player to gameengine map with key:id and value: playerData
    GameEngine.playerList.set(newPlayer._id, newPlayer.returnDataSet());

    // Send data of new player
    socket.emit("player-init-status", newPlayer.returnDataSet());
  }
)
}
