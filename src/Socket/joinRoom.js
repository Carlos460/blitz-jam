const { uuidv4 } = require("../Util/uuid");

const joinRoom = (Socket, RoomManager) => {
  Socket.on("join:room", ({ roomId, username }) => {
    const room = RoomManager.getRoom(roomId);
    if (!room) {
      Socket.emit("not-found:room", { message: "room was not found" });
      return;
    }
    room.addClient(Socket.id, username);
  });
};

module.exports = joinRoom;
