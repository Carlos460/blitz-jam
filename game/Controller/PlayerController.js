class PlayerController {
  #controllerState = new Map();
  constructor() {
    this.#controllerState.set('right', false);
    this.#controllerState.set('left', false);
    this.#controllerState.set('up', false);
    this.#controllerState.set('down', false);
  }
  getControllerState() {
    return this.#controllerState;
  }
  updateControllerState(control, state) {
    // Expects _controller state data to be mapped
    // to the PlayerController.controllerState Object
    this.#controllerState.set(control, state);
  }
}

module.exports = PlayerController;
