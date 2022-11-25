const Body = require('./Component/Body');

class Player {
  id;
  name;
  speed;
  Controller;
  Body;
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
  setDirection() {
    const controllerState = this.Controller.getControllerState();
    let [x, y] = [0, 0];

    if (controllerState.get('right') === true) x += 1;
    if (controllerState.get('left') === true) x += -1;
    if (controllerState.get('up') === true) y += -1;
    if (controllerState.get('down') === true) y += 1;

    this.Body.setDirection(x, y);
  }
  update() {
    this.setDirection();
  }
}

module.exports = Player;
