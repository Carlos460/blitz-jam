const joinButton = document.querySelector("#join-button");
const nameField = document.querySelector("#name-field");

const canvas = document.querySelector('#main-frame');
const ctx = canvas.getContext('2d');


const playerColors = ['#ff0000', '#26ff00', '#0033ff','#f200f2', '#ffee00', '#00f7ff'];

let localPlayer = {};

let socket = io.connect('localhost:3000');

joinButton.addEventListener('click', () => {
  if (nameField.value === ''){
    alert("enter a name");
    return;
  }

  socket.emit('player:create', { name: nameField.value });
});

/////////////////////////
///    Listening      ///
////////////////////////

socket.on('player-init-status', (data) => {
  localPlayer = data;
  console.log('recieved player data', localPlayer);
});

////////////////////
/// drawing loop ///
///////////////////

// map of player list
socket.on('packet', (packet) => {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw every player
  packet.map((currPlayer, index) => {
    drawPlayer(ctx, currPlayer.posx, currPlayer.posy, playerColors[index]);
  });
});

///////////////
/// Sending ///
///////////////

// Update player controller state
window.addEventListener('keypress', (event) => {
  if (event.code === 'KeyA') {
    socket.emit('player:update', {
      id: localPlayer.id,
      control: 'left',
      state: true,
    });
  }
  if (event.code === 'KeyD') {
    socket.emit('player:update', {
      id: localPlayer.id,
      control: 'right',
      state: true,
    });
  }
  if (event.code === 'KeyW') {
    socket.emit('player:update', {
      id: localPlayer.id,
      control: 'up',
      state: true,
    });
  }
  if (event.code === 'KeyS') {
    socket.emit('player:update', {
      id: localPlayer.id,
      control: 'down',
      state: true,
    });
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'KeyA') {
    socket.emit('player:update', {
      id: localPlayer.id,
      control: 'left',
      state: false,
    });
  }
  if (event.code === 'KeyD') {
    socket.emit('player:update', {
      id: localPlayer.id,
      control: 'right',
      state: false,
    });
  }
  if (event.code === 'KeyW') {
    socket.emit('player:update', {
      id: localPlayer.id,
      control: 'up',
      state: false,
    });
  }
  if (event.code === 'KeyS') {
    socket.emit('player:update', {
      id: localPlayer.id,
      control: 'down',
      state: false,
    });
  }
});

/////////////////////////
/// Drawing fucntions ///
////////////////////////

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

function drawAimLine(screen, posx, posy, mPosx, mPosy) {
  screen.beginPath();
  screen.moveTo(posx, posy);
  screen.lineTo(mPosx, mPosy);
  screen.stroke();
}
