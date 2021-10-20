const express = require('express')
const server = express()
const http = require('http').createServer(server)
const io = require('socket.io')(http)

// Game Imports
const GameEngine = require('./game/gameEngine')

server.use(express.static('client'))

// Socket Imports
const registerCreatePlayer = require('./sockets/createPlayer')
const registerUpdatePlayer = require('./sockets/updatePlayer')
const registerSendPackage = require('./sockets/sendPackage')

// Initialize GameEngine
const Platformer = new GameEngine('platformer')

// TODO
// 1. Get palyer contoller states
// 2. Calculate new states and positions
// 3. Send data to client

// Sockets and disconnect
const onConnection = (socket) => {
  // Register new players
  registerCreatePlayer(io, socket, Platformer)

  // Update Players in game
  registerUpdatePlayer(io, socket, Platformer)

  // Send updated package to client
  registerSendPackage(io, socket)

  // Disconnect player from List
  socket.on('disconnect', () => {
    Platformer.playerList.forEach((player, index, playerList) => {
      console.log(player)
      console.log(`id of left: ${socket.id}`)
      if (player.id === socket.id) {
        playerList.splice(index, 1)
      }
    })
  })
}

io.on('connection', onConnection)

http.listen(3000, () => {
  console.log('listening on port :3000')
})
