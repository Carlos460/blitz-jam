const { Time } = require('./Time');
const { normalize, applyForce } = require('./Vector2D');
const { EntityManager } = require('./EntityManager');
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
      console.log('entitiy: ', entity);
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

      entity.Body.setPosition(newPosition.x, newPosition.y);

      console.log(entity.Controller.getControllerState());
      console.log(entity.Body.getDirection());
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

      projectile.Body.setPosition(newPosition.x, newPosition.y);
    }
  }
}

module.exports = Engine;
