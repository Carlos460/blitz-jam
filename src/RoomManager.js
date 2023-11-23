class Room {
  #clientList = new Map();
  #id = '';
  constructor() {
    return this;
  }

  addClient(id, username) {
    this.#clientList.set(id, username);
    console.log(`player joined: ${username}`);
  }

  removeClient(id, username) {
    this.#clientList.delete(id);
    console.log(`player left: ${username}`);
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

  update() {}
}

class RoomManager {
  #list = new Map();
  #queList = new Array();

  createRoom(id) {
    console.log(id);
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

  update() {
    for (const room of this.#list.values()) {
      room.update();
    }
  }
}

module.exports = RoomManager;
