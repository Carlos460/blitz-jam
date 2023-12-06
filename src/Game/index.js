const RoomManager = require('../Socket/RoomManager');
const joinRoom = require('../Socket/joinRoom');
const leaveRoom = require('../Socket/leaveRoom');

class App {
  constructor() {
    this.RoomManager = new RoomManager();
    this.io = null;
    this.run();
  }

  registerSockets(socket) {
    joinRoom(socket, this.RoomManager);
    leaveRoom(socket, this.RoomManager);
  }

  run() {
    setInterval(() => {
      this.RoomManager.update();
    }, 10);
  }
}

module.exports = App;
