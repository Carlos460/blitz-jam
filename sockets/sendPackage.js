module.exports = (socket, GameEngine) => {
  setInterval(() => {
    GameEngine.calcDeltaTime();

    GameEngine.updatePlayerPos(GameEngine.deltaTime);

    socket.emit('packet', GameEngine.getPlayerPackage());
  }, 10);
};
