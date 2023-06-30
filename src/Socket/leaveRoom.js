const leaveRoom = (Socket, RoomManager) => {
  Socket.on("leave:room", ({roomId, username}) => {
    const room = RoomManager.getRoom(roomId);
    
    if (!room) {
      console.log("room not found");
      return;
    }

    room.removeClient(Socket.id, username);
  });
};

module.exports = leaveRoom;
