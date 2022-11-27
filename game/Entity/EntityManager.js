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
  setEnitiy(_key, _value) {
    this.#entityList.set(_key, _value);
  }
  getEntity(_id) {
    return this.#entityList.get(_id);
  }
  getEntities() {
    return this.#entityList;
  }
  getEntityDataPackage() {
    let entityPackage = [];

    for (let entity of this.#entityList.values()) {
      entityPackage.push(entity.getData());
    }

    return entityPackage;
  }
  update() {
    this.#entityList;
    for (let entity of this.#entityList.values()) {
      entity.update();
    }
  }
}

module.exports = EntityManager;
