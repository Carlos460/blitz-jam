class Body {
  isActive = true;
  #position = { x: 0, y: 0 };
  #direction = { x: 0, y: 0 };
  constructor() {
    this.isActive;
    this.#position;
    this.#direction;
  }
  setDirection(x, y) {
    this.#direction = { x, y };
  }
  getDirection() {
    return this.#direction;
  }
  setPosition(x, y) {
    this.#position = { x, y };
  }
  getPosition() {
    return this.#position;
  }
}

module.exports = Body;
