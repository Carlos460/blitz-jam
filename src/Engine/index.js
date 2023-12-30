const { Time } = require('./Math/Time');
const { normalize, applyForce } = require('./Math/Vector2D');
const { EntityManager } = require('./Entity/EntityManager');
const Player = require('./Entity/Player');

class Engine {
  constructor() {
    this.Time = new Time();
    this.Worlds = new Map();
  }

  createWorld(id) {
    const world = {
      playerManager: new EntityManager(),
      projectileManager: new EntityManager(),
    };

    this.Worlds.set(id, world);
  }

  deleteWorld(id) {
    this.Worlds.delete(id);
  }

  getPlayer(roomId, playerId) {
    const world = this.Worlds.get(roomId);

    if (world === undefined) return;

    const player = world.playerManager.getEntity(playerId);

    return player;
  }

  addPlayer(roomId, playerId) {
    const world = this.Worlds.get(roomId);

    if (world === undefined) return;

    const player = new Player().setId(playerId);

    world.playerManager.addEntity(player);
  }

  removePlayer(roomId, playerId) {
    const world = this.Worlds.get(roomId);

    world.playerManager.removeEntity(playerId);
  }

  getPacket(id) {
    // return array of [player data, projectile data]
    const world = this.Worlds.get(id);

    if (world === undefined) return;

    const players = world.playerManager.getEntityDataPackage();
    const projectiles = world.projectileManager.getEntityDataPackage();

    return [players, projectiles];
  }

  step(id) {
    const { playerManager, projectileManager } = this.Worlds.get(id);

    this.Time.calcDeltaTime();

    // update players
    for (let entity of playerManager.getEntities().values()) {
      entity.update();
      const controllerState = entity.Controller.getControllerState() || null;

      // Invoke shooting
      if (controllerState.get('shoot')) {
        const projectile = entity.shoot();
        projectileManager.addEntity(projectile);
      }

      // update position
      const position = entity.Body.getPosition();
      const direction = normalize(entity.Body.getDirection());

      const newPosition = applyForce(
        position,
        direction,
        entity.speed,
        this.Time.deltaTime
      );

      // room level wall collision
      if (newPosition.x > 1175) newPosition.x = 1175;
      if (newPosition.x < 0) newPosition.x = 0;

      if (newPosition.y > 775) newPosition.y = 775;
      if (newPosition.y < 0) newPosition.y = 0;

      entity.Body.setPosition(newPosition.x, newPosition.y);
    }

    // update projectiles
    for (let projectile of projectileManager.getEntities().values()) {
      const position = projectile.Body.getPosition();
      const direction = normalize(projectile.Body.getDirection());

      const newPosition = applyForce(
        position,
        direction,
        projectile.speed,
        this.Time.deltaTime
      );

      // out of bound projectiles are removed
      if (
        newPosition.x > 1200 ||
        newPosition.x < 0 ||
        newPosition.y > 800 ||
        newPosition.y < 0
      ) {
        projectileManager.removeEntity(projectile.getId());
      }

      projectile.Body.setPosition(newPosition.x, newPosition.y);
    }
  }
}

module.exports = Engine;
