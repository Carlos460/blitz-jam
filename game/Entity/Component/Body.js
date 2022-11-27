class Body {
  #position;
  #direction;
  #mouseDirection;
  constructor() {
    this.#position = { x: 0, y: 0 };
    this.#direction = { x: 0, y: 0 };
    this.#mouseDirection = { x: 0, y: 0 };
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
  setMousePosition(x, y) {
    this.#mouseDirection = { x, y };
  }
  getMousePosition() {
    return this.#mouseDirection;
  }
}

module.exports = Body;
