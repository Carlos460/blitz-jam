module.exports = (io, socket, GameEngine) => {
  const updatePlayer = (data) => {
    console.log('updating player');
    console.log(GameEngine.playerList.length);
  };

  socket.on('player:update', updatePlayer);
};
