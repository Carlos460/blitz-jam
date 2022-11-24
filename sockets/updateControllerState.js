module.exports = (socket, game) => {
  // control: 'left'| 'right' | 'down'| 'up',
  // state: true | flase
  socket.on('player:update', (controllerPackage) => {
    const { control, state } = controllerPackage;
    const player = game.getPlayer(socket.id) || null;
    if (player === null) return;

    player.Controller.updateControllerState(control, state);
  });
};
