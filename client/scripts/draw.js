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
  const width = 5;
  const height = 5;

  // the rectangle
  screen.beginPath();
  screen.rect(posx - (width / 2), posy - (height / 2), width, height);
  screen.closePath();

  // the fill color
  screen.fillStyle = '#ffffff';
  screen.fill();
}

function drawLineToMouse(screen, posx, posy, mPosx, mPosy) {
  screen.beginPath();
  screen.moveTo(posx, posy);
  screen.lineTo(mPosx, mPosy);
  screen.stroke();
}
