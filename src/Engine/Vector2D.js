function normalize({ x, y }) {
  // cant divide by 0 guard 
  if (x === 0 || y === 0) return { x, y };

  // calc vector length and normalize vector 
  const vectorLength = Math.sqrt(x * x + y * y);
  x /= vectorLength;
  y /= vectorLength;

  return { x, y };
};

function applyForce(position, direction, acceleration, deltaTime) {
  let velocity = { x: 0, y: 0 }

  // clac velocity
  velocity.x = direction.x * acceleration * deltaTime;
  velocity.y = direction.y * acceleration * deltaTime;

  // apply it to position
  position.x += velocity.x;
  position.y += velocity.y;

  return { x: position.x, y: position.y }
}

module.exports = { normalize, applyForce };
