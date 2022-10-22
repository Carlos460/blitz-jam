// Remove player from game
module.exports = (socket, Game) => {
  socket.on('player:leave', (data) => {
    console.log(`Player left match: ${data.name}`);

    // Add player to game engine map with key:id and value: playerData
    Game.playerList.delete(socket.id);
  });
};
