class Player {
  constructor (name, id, posx, posy) {
    this._id = id
    this.name = name
    this.playerAlive = true
    this.posx = posx
    this.posy = posy
    // Used to apply updates
    this.controllerState = {
      right: false,
      left: false,
      up: false,
      down: false,
      jump: false,
      shoot: false
    }
  }

  returnDataSet() {
    // No need to JSON.stringify since socket.io does it for you
    // when you send a response to the client
    return {
      id: this._id,
      name: this.name,
      playerAlive: this.playerAlive,
      posx: this.posx,
      posy: this.posy,
      controllerState: this.controllerState
    }
  }

  isMoving () {
    // Checks if the controllerState object has a value of true for any of its properties
    return Object.values(this.controllerState).some(value => value === true)
  }
}

module.exports = Player
