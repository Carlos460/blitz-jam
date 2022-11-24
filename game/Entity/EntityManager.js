class EntityManager {
  #entityList;
  constructor() {
    this.#entityList = new Map();
  }
  addEntity(_entity) {
    this.#entityList.set(_entity.id, _entity);
  }
  removeEntity(_id) {
    this.#entityList.delete(_id);
  }
  getEntity(_id) {
    return this.#entityList.get(_id);
  }

  getEntityDataPackage() {
    let playerPackage = [];

    for (let player of this.#entityList.values()) {
      playerPackage.push(player.getData());
    }

    console.log(playerPackage);
    return playerPackage;
  }
}

module.exports = EntityManager;
