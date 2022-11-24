// Remove player from game
module.exports = (socket, game) => {
  socket.on('player:leave', (data) => {
    console.log(`Player left match: ${data.name}`);

    // Add player to game engine map with key:id and value: playerData
    game.removePlayer(socket.id);
  });
};
