const Body = require('./Component/Body');

class Player {
  id;
  name = 'noName';
  Controller;
  Body;
  constructor() {
    this._id;
    this.name;
    this.Controller;
    this.Body = new Body();
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
}

module.exports = Player;
