const leaveRoom = (Socket, RoomManager) => {
  Socket.on('leave:room', ({ roomId, username }) => {
    const room = RoomManager.getRoom(roomId);

    if (!room) {
      console.log('room not found');
      return;
    }

    room.removeClient(Socket.id, username);
    const roomSize = room.getClientList().size;

    if (roomSize === 0) {
      console.log(`deleting room(${roomSize} players): ${roomId}`);
      RoomManager.deleteRoom(roomId);
    }
  });
};

module.exports = leaveRoom;
