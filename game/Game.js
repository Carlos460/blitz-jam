const EntityManager = require('./Entity/EntityManager');

class Game {
  constructor() {
    // Delta Time
    this.lastTime = Date.now();
    this.deltaTime;
    // Managers
    this.EntityManager = new EntityManager();

    calcDeltaTime = () => {
      const currentTime = Date.now();
      this.deltaTime = (currentTime - this.lastTime) / 1000;
      this.lastTime = currentTime;
    };

    getPlayerPackage = () => {
      const playerList = [];

      return playerList;
    };
    updatePlayerPos = (deltaTime) => {
      this.playerList.forEach((player) => {
        if (player.controllerState.right === true)
          player.posx += Math.floor(this.playerSpeed * deltaTime);
        if (player.controllerState.left === true)
          player.posx -= Math.floor(this.playerSpeed * deltaTime);
        if (player.controllerState.up === true)
          player.posy -= Math.floor(this.playerSpeed * deltaTime);
        if (player.controllerState.down === true)
          player.posy += Math.floor(this.playerSpeed * deltaTime);
      });
    };

    setClientPackageSender = (socket) => {
      setInterval(() => {
        this.calcDeltaTime();

        this.updatePlayerPos(this.deltaTime);

        socket.emit('packet:update', this.getPlayerPackage());
      }, 10);
    };
  }
}

module.exports = Game;
