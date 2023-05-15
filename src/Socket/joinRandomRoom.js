const { uuidv4 } = require("../Util/uuid");

const joinRandomRoom = (Socket, RoomManager) => {
  Socket.on('join:random_room', ({ username }) => {
    // creates a room if there is no rooms
    const room = RoomManager.getRoomListLength() < 1 ?
      RoomManager.createRoom(uuidv4()) :
      RoomManager.getQueuedRoom();

    room.addClient(Socket.id, username);
  });
}

module.exports = joinRandomRoom;
