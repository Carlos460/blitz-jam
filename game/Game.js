class Game {
  constructor() {
    this.gravity = 0.8;
    this.playerSpeed = 200;
    // Delta Time
    this.lastTime = Date.now();
    this.deltaTime;
    // Managers
    this.EntityManager = new EntityManager();

    // Create entity list
    // 0 -> Players
    this.playerList = new Map();

    this.EntityManager.addList(this.playerList);
  }

  calcDeltaTime = () => {
    const currentTime = Date.now();
    this.deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
  };

  getPlayerPackage = () => {
    let playerListPacket = [];

    this.playerList.forEach((player) => {
      playerListPacket.push({
        id: player.id,
        name: player.name,
        playerAlive: player.playerAlive,
        posx: player.posx,
        posy: player.posy,
      });
    });
    return playerListPacket;
  };

  addPlayer = (newPlayer) => {
    this.playerList.set(newPlayer._id, newPlayer.returnDataSet());
  };

  updatePlayerPos = (deltaTime) => {
    this.playerList.forEach((player) => {
      if (player.controllerState.right === true)
        player.posx += Math.floor(this.playerSpeed * deltaTime);
      if (player.controllerState.left === true)
        player.posx -= Math.floor(this.playerSpeed * deltaTime);
      if (player.controllerState.up === true)
        player.posy -= Math.floor(this.playerSpeed * deltaTime);
      if (player.controllerState.down === true)
        player.posy += Math.floor(this.playerSpeed * deltaTime);
    });
  };

  run = (socket) => {
    setInterval(() => {
      this.calcDeltaTime();

      this.updatePlayerPos(this.deltaTime);

      socket.emit('packet:update', this.getPlayerPackage());
    }, 10);
  };
}

module.exports = Game;
