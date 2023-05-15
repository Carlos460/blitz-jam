const { uuidv4 } = require("../Util/uuid");

const joinRoom = (Socket, RoomManager) => {
  Socket.on('join:room', ({ username, roomId }) => {
    const room = RoomManager.getRoom(roomId);
    room.addClient(Socket.id, username);
  });
}

module.exports = joinRoom;
