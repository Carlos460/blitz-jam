const RoomManager = require('../Socket/RoomManager');
const joinRoom = require('../Socket/joinRoom');
const leaveRoom = require('../Socket/leaveRoom');

class App {
  constructor(io) {
    this.RoomManager = new RoomManager();
    this.io = null;
    this.run(io);
  }

  registerSockets(socket) {
    joinRoom(socket, this.RoomManager);
    leaveRoom(socket, this.RoomManager);
  }

  run(io) {
    setInterval(() => {
      this.RoomManager.update(io);
    }, 10);
  }
}

module.exports = App;
