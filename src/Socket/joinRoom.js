const { uuidv4 } = require('../Util/uuid');

const joinRoom = (Socket, RoomManager) => {
  Socket.on('join:room', ({ roomId, username }) => {
    if (roomId === '') {
      findRandomRoom(Socket, RoomManager, username);
      return;
    }

    // finds room with given id
    const room = RoomManager.getRoom(roomId);

    if (!room) {
      Socket.emit('not-found:room', {
        message: 'room was not found',
      });
      return;
    }

    room.addClient(Socket.id, username);
    Socket.join(roomId);
  });
};

function findRandomRoom(Socket, RoomManager, username) {
  const room =
    RoomManager.getRoomListLength() > 0
      ? RoomManager.getQueuedRoom()
      : RoomManager.createRoom(uuidv4());

  const roomId = room.getId();

  room.addClient(Socket.id, username);
  Socket.join(roomId);

  Socket.emit('update:room-id', roomId);
}

module.exports = joinRoom;
