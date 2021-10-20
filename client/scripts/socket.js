const canvas = document.querySelector('#screen');
const ctx = canvas.getContext('2d');

function drawPlayer(screen, posx, posy, index) {
  // the rectangle
  screen.beginPath();
  screen.rect(posx, posy, 10, 10);
  screen.closePath();

  const colors = ['#ff0000', '#ffee00', '#26ff00', '#0033ff', '#00f7ff'];

  // the fill color
  screen.fillStyle = colors[index];
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
console.log('Creating new player');


function drawAimLine(screen, posx, posy, mPosx, mPosy) { 
  screen.beginPath();
  screen.moveTo(posx, posy);
  screen.lineTo(mPosx, mPosy);
  screen.stroke();
}

const socket = io.connect('localhost:3000');

const Name = prompt('Please enter name');

socket.on('connect', (data) => {
  socket.emit('player:create', Name);
});

setInterval(() => {
  socket.emit('player:update');
}, 500);

// Update Mouse Position
// function getMousePosition(canvas, event) {
//   let rect = canvas.getBoundingClientRect();
//   let x = Math.floor(event.clientX - rect.left);
//   let y = Math.floor(event.clientY - rect.top);

//   localPlayer.shooterController.mousePosx = x;
//   localPlayer.shooterController.mousePosy = y;
// }

// window.onmousemove = (e) => {
//   getMousePosition(canvas, e);
// };

// Update Player Input
// window.addEventListener('keydown', (event) => {
//   if (event.code === 'KeyA') {
//     localPlayer.movementController.left = true;
//   }
//   if (event.code === 'KeyD') {
//     localPlayer.movementController.right = true;
//   }
//   if (event.code === 'KeyW') {
//     localPlayer.movementController.down = true;
//   }
//   if (event.code === 'KeyS') {
//     localPlayer.movementController.up = true;
//   }
// });

// window.addEventListener('keyup', (event) => {
//   if (event.code === 'KeyA') {
//     localPlayer.movementController.left = false;
//   }
//   if (event.code === 'KeyD') {
//     localPlayer.movementController.right = false;
//   }
//   if (event.code === 'KeyW') {
//     localPlayer.movementController.down = false;
//   }
//   if (event.code === 'KeyS') {
//     localPlayer.movementController.up = false;
//   }
// });
