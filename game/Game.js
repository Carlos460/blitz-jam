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

  setClientPackageSender = (socket) => {
    setInterval(() => {
      this.calcDeltaTime();
      this.PlayerManager.update();

      socket.emit('packet:update', this.PlayerManager.getEntityDataPackage());
    }, 10);
  };
}

module.exports = Game;
