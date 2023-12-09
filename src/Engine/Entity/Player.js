const Body = require('./Component/Body');
const Bullet = require('./Bullet');
const PlayerController = require('../Controller/PlayerController');

class Player {
  constructor() {
    this._id;
    this.name;
    this.Controller = new PlayerController();
    this.Body = new Body();
    this.speed = 250;
    this.isAlive = true;
  }

  setName(_name) {
    this.name = _name;
    return this;
  }

  setId(_id) {
    this.id = _id;
    return this;
  }

  setController(_controller) {
    this.Controller = new _controller();
    return this;
  }

  getData() {
    return {
      id: this.id,
      isAlive: this.Body.isAlive,
      position: this.Body.getPosition(),
    };
  }

  shoot() {
    this.Controller.updateControllerState('shoot', false);

    const positionOffset = { x: 12.5, y: 12.5 };
    const { x, y } = this.Body.getPosition();

    const mousePosition =
      this.Controller.getControllerState().get('mousePosition');

    const playerPosition = this.Body.getPosition();
    const projectileDirection = {
      x: mousePosition.x - playerPosition.x,
      y: mousePosition.y - playerPosition.y,
    };

    const projectile = new Bullet();

    projectile.setBelongsTo(this.id);
    projectile.Body.setPosition(x + positionOffset.x, y + positionOffset.y);
    projectile.Body.setDirection(projectileDirection.x, projectileDirection.y);

    return projectile;
  }

  update() {
    const controllerState = this.Controller.getControllerState();

    // update direction state
    let [x, y] = [0, 0];

    if (controllerState.get('right') === true) x += 1;
    if (controllerState.get('left') === true) x += -1;
    if (controllerState.get('up') === true) y += -1;
    if (controllerState.get('down') === true) y += 1;

    this.Body.setDirection(x, y);

    // update mouse direction state
    const { mouseX, mouseY } = controllerState.get('mousePosition');

    this.Body.setMousePosition(mouseX, mouseY);
  }
}

module.exports = Player;
