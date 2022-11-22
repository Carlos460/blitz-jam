class EntityManager {
  playerList;
  constructor() {
    this.playerList = new Map();
  }
  addPlayer(_id, _playerData) {
    this.playerList.set(_id, _playerData);
  }
  getPlayer(_id) {
    this.playerList.get(_id);
  }
}

module.exports = EntityManager;
