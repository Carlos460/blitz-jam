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
  console.log('You have joined the game');
});

socket.on('join', (data) => {
  player = data.player;
  if (player.name === '') {
    socket.emit('joined', { name: Name, id: player.id });
  }
});

socket.on('updatePlayer', () => {
  setInterval(() => {
    socket.emit('updatePlayer', { player: player });
  }, 1000);
});

socket.on('packageUpdate', (data) => {
  console.log(data);
  data.playerList.forEach((player) => {
    drawPlayer(ctx, player.posx, player.posy);
  });
});
