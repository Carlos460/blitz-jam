class PlayerController {
  #controllerState = {
    right: flase,
    left: flase,
    up: flase,
    down: flase,
    aimLeft: flase,
    aimRight: flase,
    shoot: flase,
  };
  constructor() {
    this.#controllerState;
  }
  getControllerState() {
    return this.#controllerState;
  }
  updateControllerState(_controllerState) {
    // Expects _controller state data to be mapped
    // to the PlayerController.controllerState Object
    this.#controllerState = _controllerState;
  }
}

module.exports = PlayerController;
