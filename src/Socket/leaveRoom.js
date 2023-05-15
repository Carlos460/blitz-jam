const leaveRoom = (Socket, RoomManager) => {
  Socket.on('leave:room', (id) => {
    RoomManager.getRoom(id).removeClient(Socket.id);
  });
}

module.exports = leaveRoom;
