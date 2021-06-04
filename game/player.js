class Player {
  constructor(name, id, posx, posy) {
    this._id = id;
    this.name = name;
    this.playerAlive = true;
    this.posx = posx;
    this.posy = posy;
  }

  returnDataSet() {
    // No need to JSON.stringify since socket.io does it for you
    return {
      id: this._id,
      name: this.name,
      playerAlive: this.playerAlive,
      posx: this.posx,
      posy: this.posy,
    };
  }
}

module.exports = Player;
