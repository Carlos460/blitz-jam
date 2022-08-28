class GameEngine {
  constructor (name) {
    this.name = name
    this.gravity = 0.8;
    this.playerList = new Map();
  }
  updatePlayerPos = () => {
    this.playerList.forEach(player => {
      if (player.controllerState.right === true) player.posx += 5;
      if (player.controllerState.left === true) player.posx -= 5;
      if (player.controllerState.up === true) player.posy -= 5;
      if (player.controllerState.down === true) player.posy += 5;
    });
  }
}

module.exports = GameEngine
