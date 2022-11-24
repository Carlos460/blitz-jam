const EntityManager = require('./Entity/EntityManager');

class Game {
  constructor() {
    // Delta Time
    this.lastTime = Date.now();
    this.deltaTime;
    // Managers
    this.PlayerManager = new EntityManager();
  }

  calcDeltaTime = () => {
    const currentTime = Date.now();
    this.deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
  };

  addPlayer(_player) {
    this.PlayerManager.addEntity(_player);
  }

  removePlayer(_id) {
    this.PlayerManager.removeEntity(_id);
  }

  getPlayer(_id) {
    return this.PlayerManager.getEntity(_id);
  }

  // updatePlayerPos = (deltaTime) => {
  //   this.playerList.forEach((player) => {
  //     if (player.controllerState.right === true)
  //       player.posx += Math.floor(this.playerSpeed * deltaTime);
  //     if (player.controllerState.left === true)
  //       player.posx -= Math.floor(this.playerSpeed * deltaTime);
  //     if (player.controllerState.up === true)
  //       player.posy -= Math.floor(this.playerSpeed * deltaTime);
  //     if (player.controllerState.down === true)
  //       player.posy += Math.floor(this.playerSpeed * deltaTime);
  //   });
  // };

  setClientPackageSender = (socket) => {
    setInterval(() => {
      this.calcDeltaTime();

      // apply physics

      // apply collision

      socket.emit('packet:update', this.PlayerManager.getEntityDataPackage());
    }, 10);
  };
}

module.exports = Game;
