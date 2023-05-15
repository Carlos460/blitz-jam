const { Time } = require("./Time");
const { normalize, applyForce } = require("./Vector2D");
const { EntityManager } = require("./EntityManager");

class Engine {
  constructor() {
    this.Time = new Time();

    this.PlayerManager = new EntityManager();
    this.ProjectileManager = new EntityManager();
  }

  step(playerManager, projectileManager) {
    this.Time.calcDeltaTime();

    // update players
    for (let entity of playerManager.getEntities().values()) {
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
        this.Time.deltaTime)

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
        this.Time.deltaTime)

      projectile.Body.setPosition(newPosition.x, newPosition.y);
    }
  }
}

module.exports = Engine;
