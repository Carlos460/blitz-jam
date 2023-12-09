const updateControllerState = (Socket, Engine) => {
  // control: 'left'| 'right' | 'down'| 'up',
  // state: true | flase
  Socket.on('player:update', (controllerPackage, roomId) => {
    const { control, state } = controllerPackage;

    const player = Engine.getPlayer(roomId, Socket.id) || null;
    if (player === null) return;

    player.Controller.updateControllerState(control, state);
  });
};

module.exports = updateControllerState;
