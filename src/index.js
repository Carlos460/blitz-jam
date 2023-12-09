const RoomManager = require('./Socket/RoomManager');
const Engine = require('./Engine');
const joinRoom = require('./Socket/joinRoom');
const leaveRoom = require('./Socket/leaveRoom');
const updateControllerState = require('./Socket/updateController');

class App {
  constructor(io) {
    this.Engine = new Engine();
    this.RoomManager = new RoomManager();
    this.RoomManager.attachEngine(this.Engine);
    this.run(io);
  }

  registerSockets(socket) {
    joinRoom(socket, this.RoomManager, this.Engine);
    leaveRoom(socket, this.RoomManager, this.Engine);
    updateControllerState(socket, this.Engine);
  }

  run(io) {
    setInterval(() => {
      this.RoomManager.update(io, this.Engine);
    }, 10);
  }
}

module.exports = App;
