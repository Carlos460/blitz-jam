const leaveRoom = (Socket, RoomManager) => {
  Socket.on('leave:room', ({ roomId, username }) => {
    const room = RoomManager.getRoom(roomId);

    if (!room) {
      console.log('room not found');
      return;
    }

    room.getClientList();
    room.removeClient(Socket.id, username);
    if (room.getClientList().size === 0) {
      RoomManager.deleteRoom(roomId);
    }
  });
};

module.exports = leaveRoom;
