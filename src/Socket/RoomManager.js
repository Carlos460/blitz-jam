class Room {
  #clientList = new Map();
  #id = '';
  constructor() {
    return this;
  }

  addClient(id, username) {
    this.#clientList.set(id, username);
    console.log(`${username}[${id}] joined room: ${this.#id}`);
  }

  removeClient(id, username) {
    this.#clientList.delete(id);
    console.log(`${username}[${id}] left room: ${this.#id}`);
  }

  getClientList() {
    return this.#clientList;
  }

  setId(id) {
    this.#id = id;
    return this;
  }
  getId() {
    return this.#id;
  }

  update(io) {
    io.to(this.#id).emit('update', { message: 'hello' });
  }
}

class RoomManager {
  #list = new Map();
  #queList = new Array();

  createRoom(id) {
    console.log(`Creating room:${id}`);
    this.#list.set(id, new Room().setId(id));
    this.#queList.push(id);
    return this.#list.get(id);
  }

  deleteRoom(id) {
    this.#list.delete(id);
  }

  getRoom(id) {
    return this.#list.get(id);
  }

  getRoomListLength() {
    return this.#list.size;
  }
  getRoomList() {
    return this.#list;
  }

  getQueuedRoom() {
    // get the first room in que, change later
    const queRoomId = this.#queList[0];

    return this.#list.get(queRoomId);
  }

  update(io) {
    for (const room of this.#list.values()) {
      room.update(io);
    }
  }
}

module.exports = RoomManager;
