module.exports = {
  entityDataSet(givenId) {
    return {
      id: givenId,
      posx: 0,
      posy: 0,
    };
  },
  shooterControllerDataSet() {
    return {
      isShooting: false,
      mousePosx: 0,
      mousePosy: 0,
    };
  },
  isMovingDataSet() {
    return {
      right: false,
      down: false,
      left: false,
      up: false,
    };
  },
};
