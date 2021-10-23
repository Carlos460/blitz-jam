const canvas = document.querySelector('#screen');
const ctx = canvas.getContext('2d');


const socket = io.connect('localhost:3000');

const Name = prompt('Please enter name');

let localPlayer = {
  id: '',
  name: Name
}

// Initial socket connection
socket.on('connect', () => {
  socket.emit('player:create', Name);
});

// Sender
// Update player controller state
window.addEventListener('keypress', (event) => {
  if (event.code === 'KeyA') {
    socket.emit('player:update',{
      id: localPlayer.id,
      control: 'left',
      state: true
    }); 
  }
  if (event.code === 'KeyD') {
    socket.emit('player:update',{
      id: localPlayer.id,
      control: 'right',
      state: true
    }); 
  }
  if (event.code === 'KeyW') {
    socket.emit('player:update',{
      id: localPlayer.id,
      control: 'up',
      state: true
    }); 
  }
  if (event.code === 'KeyS') {
    socket.emit('player:update',{
      id: localPlayer.id,
      control: 'down',
      state: true
    }); 
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'KeyA') {
    socket.emit('player:update',{
      id: localPlayer.id,
      control: 'left',
      state: false
    }); 
  }
  if (event.code === 'KeyD') {
    socket.emit('player:update',{
      id: localPlayer.id,
      control: 'right',
      state: false
    }); 
  }
  if (event.code === 'KeyW') {
    socket.emit('player:update',{
      id: localPlayer.id,
      control: 'up',
      state: false
    }); 
  }
  if (event.code === 'KeyS') {
    socket.emit('player:update',{
      id: localPlayer.id,
      control: 'down',
      state: false
    }); 
  }
});

// Reciever
socket.on('player-init-status',(data)=> {
  localPlayer.id = data.id;
});

// Drawing fucntions
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

function drawAimLine(screen, posx, posy, mPosx, mPosy) { 
  screen.beginPath();
  screen.moveTo(posx, posy);
  screen.lineTo(mPosx, mPosy);
  screen.stroke();
}
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

function drawAimLine(screen, posx, posy, mPosx, mPosy) { 
  screen.beginPath();
  screen.moveTo(posx, posy);
  screen.lineTo(mPosx, mPosy);
  screen.stroke();
}