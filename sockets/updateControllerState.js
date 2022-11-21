module.exports = (socket, game) => {
  // id: localPlayer.id,
  // control: 'left'| 'right' | 'down'| 'up',
  // state: true | flase
  const updatePlayer = (playerCtrlUpdate) => {
    const player = GameEngine.playerList.get(playerCtrlUpdate.id) || null;
    if (player === null) return;
  };

  socket.on('player:update', updatePlayer);
};
