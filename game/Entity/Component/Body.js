class Body {
  isActive = true;
  #position = { x: 0, y: 0 };
  constructor() {
    this.isActive;
    this.position;
  }
  getPosition() {
    return this.#position;
  }
}

module.exports = Body;
