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
  });
};

function findRandomRoom(Socket, RoomManager, username) {
  // creates new room
  let roomId = uuidv4();

  console.log(RoomManager.getRoomListLength());

  const room =
    RoomManager.getRoomListLength() > 0
      ? RoomManager.getQueuedRoom()
      : RoomManager.createRoom(roomId);

  room.addClient(Socket.id, username);
  roomId = room.getId();

  console.log(RoomManager.getRoomList(), room.getClientList());

  Socket.emit('update:room-id', roomId);
}

module.exports = joinRoom;
