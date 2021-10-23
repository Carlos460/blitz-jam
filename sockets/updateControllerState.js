module.exports = (io, socket, GameEngine) => {
  const updatePlayer = (data) => {
    currentPlayerList = GameEngine.playerList

    newPlayerList = currentPlayerList.map((player)=> {
      if (data.id !== player.id) return player
      
      let newPlayer = player

      if (data.control === 'right') newPlayer.controllerState.right = data.state
      if (data.control === 'left') newPlayer.controllerState.left = data.state
      if (data.control === 'up') newPlayer.controllerState.up = data.state
      if (data.control === 'down') newPlayer.controllerState.down = data.state

      return newPlayer
    })

    GameEngine.playerList = newPlayerList
    console.log(GameEngine.playerList)
  }

  socket.on('player:update', updatePlayer)
}
