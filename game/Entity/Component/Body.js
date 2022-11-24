class Body {
  isActive = true;
  #position = { x: 0, y: 0 };
  #direction = { x: 0, y: 0 };
  constructor() {
    this.isActive;
    this.position;
    this.#direction;
  }
  setDirection(_x, _y) {
    this.#direction = { _x, _y };
    console.log(this.#direction);
  }
  getPosition() {
    return this.#position;
  }
}

module.exports = Body;
