const {
  entityDataSet,
  shooterControllerDataSet,
  isMovingDataSet,
} = require('./data_sets/entity_data_sets');

module.exports = {
  Player(givenId, givenName) {
    return {
      name: givenName,
      entityData: entityDataSet(givenId),
      movementController: isMovingDataSet(),
      shooterController: shooterControllerDataSet(),
    };
  },
  Bullet(givenId, faceDir) {
    return {
      type: '',
      facingDirection: faceDir,
      entityData: entityDataSet(givenId),
    };
  },
};
