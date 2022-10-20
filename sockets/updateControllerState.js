module.exports = (socket, GameEngine) => {
  // id: localPlayer.id,
  // control: 'left'| 'right' | 'down'| 'up',
  // state: true | flase
  const updatePlayer = (playerCtrlUpdate) => {
    let player = GameEngine.playerList.get(playerCtrlUpdate.id) || null;

    if (player === null) return;

    if (playerCtrlUpdate.control === 'right')
      player.controllerState.right = playerCtrlUpdate.state;
    if (playerCtrlUpdate.control === 'left')
      player.controllerState.left = playerCtrlUpdate.state;
    if (playerCtrlUpdate.control === 'up')
      player.controllerState.up = playerCtrlUpdate.state;
    if (playerCtrlUpdate.control === 'down')
      player.controllerState.down = playerCtrlUpdate.state;
  };

  socket.on('player:update', updatePlayer);
};
