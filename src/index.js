const RoomManager = require('./Socket/RoomManager');
const joinRoom = require('./Socket/joinRoom');
const joinRandomRoom = require('./Socket/joinRandomRoom');
const leaveRoom = require('./Socket/leaveRoom');

class App {
  constructor() {
    this.RoomManager = new RoomManager();
    this.Socket = null;
  }

  registerSockets() {
    if (this.Socket === null) return;
    joinRoom(this.Socket, this.RoomManager);
    joinRandomRoom(this.Socket, this.RoomManager);
    leaveRoom(this.Socket, this.RoomManager);
  }

  attachSocket(socket) {
    this.Socket = socket;
    return this;
  }

  run() {
    setInterval(() => {
      this.RoomManager.update();
    }, 10);
  }
 }

module.exports = App;
