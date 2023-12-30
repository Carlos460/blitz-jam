const Body = require('./Component/Body');
const { uuidv4 } = require('../../Util/uuid');

class Bullet {
  constructor() {
    this.id = uuidv4();
    this.belongsTo;
    this.speed = 1500;

    this.Body = new Body();
  }
  getId() {
    return this.id;
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

module.exports = Bullet;
