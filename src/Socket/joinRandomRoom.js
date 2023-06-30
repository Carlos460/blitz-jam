const { uuidv4 } = require("../Util/uuid");

const joinRandomRoom = (Socket, RoomManager) => {
  Socket.on('join:random_room', ({ username }) => {
    // creates a room if there is no rooms
    const roomId = uuidv4()
    const room = RoomManager.getRoomListLength() < 1 ?
      RoomManager.createRoom(roomId) :
      RoomManager.getQueuedRoom();

    room.addClient(Socket.id, username);

    Socket.emit('update:room-id', roomId);
  });
}

module.exports = joinRandomRoom;
