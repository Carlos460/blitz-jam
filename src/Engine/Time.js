class Time {
  constructor() { 
    // Delta Time
    this.deltaTime = Date.now();
    this.lastTime = this.deltaTime;
  }

  calcDeltaTime() {
    this.deltaTime = (Date.now() - this.lastTime) / 1000;

    this.lastTime = Date.now();
  };
}

module.exports = { Time };
