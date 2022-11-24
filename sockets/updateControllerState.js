module.exports = (socket, game) => {
  // id: localPlayer.id,
  // control: 'left'| 'right' | 'down'| 'up',
  // state: true | flase
  const updatePlayer = (playerController) => {
    const player = game.getPlayer(playerController.id) || null;
    if (player === null) return;

    player.Controller.updateControllerState(playerController);
  };
  socket.on('player:update', updatePlayer);
};
