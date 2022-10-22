// Drawing functions
function drawPlayer(screen, posx, posy, colorCode) {
  // the rectangle
  screen.beginPath();
  screen.rect(posx, posy, 25, 25);
  screen.closePath();

  // the fill color
  screen.fillStyle = colorCode;
  screen.fill();
}

function drawBullet(screen, posx, posy) {
  // the rectangle
  screen.beginPath();
  screen.rect(posx, posy, 1, 1);
  screen.closePath();

  // the fill color
  screen.fillStyle = '#000000';
  screen.fill();
}

function drawLineToMouse(screen, posx, posy, mPosx, mPosy) {
  screen.beginPath();
  screen.moveTo(posx, posy);
  screen.lineTo(mPosx, mPosy);
  screen.stroke();
}
