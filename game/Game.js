const EntityManager = require('./Entity/EntityManager');
const Physics = require('./Physics');

class Game {
  constructor() {
    this.PhysicsWorld = new Physics();
    // Managers
    this.PlayerManager = new EntityManager();
    this.ProjectileManager = new EntityManager();
  }
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
      this.PlayerManager.update();
      this.PhysicsWorld.step(this.PlayerManager, this.ProjectileManager);

      socket.emit('packet:update', {
        players: this.PlayerManager.getEntityDataPackage(),
        projectiles: this.ProjectileManager.getEntityDataPackage(),
      });
    }, 10);
  };
}

module.exports = Game;
