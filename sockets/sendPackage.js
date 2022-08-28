module.exports = ( socket, GameEngine) => {
  setInterval(() => {

    GameEngine.updatePlayerPos();

    playerListPacket = [];
    
    GameEngine.playerList.forEach(player => {
      playerListPacket.push({
        id: player.id,
        name: player.name,
        playerAlive: player.playerAlive,
        posx: player.posx,
        posy: player.posy
      })
    });

    socket.emit("packet", playerListPacket);
  }, 20)
}
