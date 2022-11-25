class Physics {
  constructor() {
    // Delta Time
    this.lastTime = Date.now();
    this.deltaTime;
  }
  calcDeltaTime = () => {
    const currentTime = Date.now();
    this.deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
  };

  /** Moves to direction given the velocity
   * velocity: {x: int, y:int }
   */
  moveTo(velocity) {
    const {x , y} = velocity;

    const newPosition = {
      x:  x * this.deltaTime,
      y:  y * this.deltaTime,
    };
    return newPosition;
  }

  /**
   * calculate acceleration
   * direction    2D Vector: {x:int, y:int}
   * acceleration int 
   */
  calculateVelocity (direction, acceleration) {
    const {x, y} = this.normalizeVector(direction.x, direction.y);
    
    return({x: x * acceleration, y: y * acceleration})
  }

  normalizeVector(x, y) {
    const vectorLength = Math.sqrt((x * x + y * y)); 

    if (x || y !== 0)
      return {x: x / vectorLength, y: y / vectorLength}; 
    return {x: x, y: y}
  }

  step(_entities) {
    this.calcDeltaTime();

    for (let entity of _entities.values()) {
      const {x , y} = entity.Body.getPosition();
      const direction = entity.Body.getDirection(); 
      const speed = entity.speed;

      const newPosition = this.moveTo(this.calculateVelocity(direction, speed));
      entity.Body.setPosition(x + newPosition.x, y + newPosition.y);
    }
  }
}

module.exports = Physics;
