const canvas = document.querySelector('#screen');
const ctx = canvas.getContext('2d');

function drawPlayer(screen, posx, posy) {
  // the rectangle
  screen.beginPath();
  screen.rect(posx, posy, 10, 10);
  screen.closePath();

  // the fill color
  screen.fillStyle = '#51DCFF';
  screen.fill();
}

const socket = io.connect('localhost:3000');

const Name = prompt('Please enter name');

const PlayerList = {};

let player = {};

socket.on('connect', (data) => {
  socket.emit('createNewPlayer');
});

socket.on('join', (data) => {
  player = data.player;
  socket.emit('joined', { name: Name });
});

socket.on('packageUpdate', (data) => {
  ctx.clearRect(0, 0, 1000, 500);
  data.playerList.forEach((player) => {
    drawPlayer(ctx, player.posx, player.posy);
  });
});

window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyA') {
    player.direction.left = true;
  } else if (event.code === 'KeyD') {
    player.direction.right = true;
  } else if (event.code === 'KeyW') {
    player.direction.down = true;
  } else if (event.code === 'KeyS') {
    player.direction.up = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'KeyA') {
    player.direction.left = false;
  } else if (event.code === 'KeyD') {
    player.direction.right = false;
  } else if (event.code === 'KeyW') {
    player.direction.down = false;
  } else if (event.code === 'KeyS') {
    player.direction.up = false;
  }
});

setInterval(() => {
  socket.emit('updatePlayer', player);
}, 60);
