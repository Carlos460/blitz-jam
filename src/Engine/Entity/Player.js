const Body = require('./Component/Body');
const { uuidv4 } =  require('../Utils');

class Bullet {
  constructor() {
    this.id = uuidv4();
    this.belongsTo;
    this.speed = 1500;

    this.Body = new Body();
  }
  setBelongsTo(_id) {
    this.belongsTo = _id;
  }

  getData() {
    return {
      id: this.id,
      isAlive: this.Body.isActive,
      position: this.Body.getPosition(),
    };
  }
}

class Player {
  constructor() {
    this._id;
    this.name;
    this.Controller;
    this.Body = new Body();
    this.speed = 250;
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
      isAlive: this.Body.isActive,
      position: this.Body.getPosition(),
    };
  }

  shoot() {
    this.Controller.updateControllerState('shoot', false);

    const offset = { x: 12.5, y: 12.5 };
    const { x, y } = this.Body.getPosition();
    const mousePosition =
      this.Controller.getControllerState().get('mousePosition');
    const playerPosition = this.Body.getPosition();
    const projectileDirection = {
      x: mousePosition.x - playerPosition.x,
      y: mousePosition.y - playerPosition.y,
    };

    const newProjectile = new Bullet();

    newProjectile.setBelongsTo(this.id);
    newProjectile.Body.setPosition(x + offset.x, y + offset.y);
    newProjectile.Body.setDirection(
      projectileDirection.x,
      projectileDirection.y
    );

    return newProjectile;
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