class Room {
  #clientList = new Map();
  constructor() {
    this.id;
    return this;
  }

  addClient(id, username) {
    this.#clientList.set(id, username);
    console.log("client added");
  }

  removeClient(id) {
    this.#clientList.delete(id);
    console.log("client removed");
  }

  getClientList() {
    return this.#clientList;
  }

  setId(id) {
    this.id = id;
    return this;
  }

  update() {
  };
}

class RoomManager {
  #list = new Map();
  #queList = new Array();

  createRoom(id) {
    this.#list.set(id, new Room().setId(id));
    this.#queList.push(id);
    return this.#list.get(id);
  }

  getRoom(id) {
    return this.#list.get(id);
  }

  getRoomListLength() {
    return this.#list.size;
  }

  getQueuedRoom() {
    // get the first room in que, change later
    const queRoomId = this.#queList[0]

    return this.#list.get(queRoomId);
  }

  update() {
    for (const room of this.#list.values()) {
      room.update();
    }
  }
}

module.exports = RoomManager;
