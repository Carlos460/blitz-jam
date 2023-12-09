const leaveContent = document.querySelector('.leave-content');
const playerNameTitle = document.querySelector('.player-name');
const leaveButton = document.querySelector('#leave-button');

const joinContent = document.querySelector('.join-content');
const joinButton = document.querySelector('#join-button');
const nameField = document.querySelector('#name-field');

const canvas = document.querySelector('#main-frame');
const ctx = canvas.getContext('2d');

const roomIdText = document.querySelector('#room-id');

const playerColors = [
  '#ff0000',
  '#26ff00',
  '#0033ff',
  '#f200f2',
  '#ffee00',
  '#00f7ff',
];

let socket = io.connect('localhost:3000');

let username = '';
let roomId = '';
let mousePos = { x: 0, y: 0 };

joinButton.addEventListener('click', () => {
  // check for username
  if (nameField.value === '') {
    alert('enter a name');
    return;
  }

  username = nameField.value;

  // connect to a random room
  socket.emit('join:room', {
    roomId: roomId,
    username: nameField.value,
  });

  joinContent.classList.add('hide-content');
  leaveContent.classList.remove('hide-content');
  playerNameTitle.innerHTML = nameField.value;
});

leaveButton.addEventListener('click', () => {
  // Display join ui
  joinContent.classList.remove('hide-content');
  leaveContent.classList.add('hide-content');
  // Leave game
  socket.emit('leave:room', { roomId: roomId, username: username });
  roomId = '';
  roomIdText.innerHTML = '';
});
socket.on('update', (msg) => {
  console.log(msg);
});

// update roomId for client
socket.on('update:room-id', (id) => {
  console.log(`updating room id: ${id}`);
  roomId = id;
  roomIdText.innerHTML = id;
});

socket.on('not-found:room', () => {
  // Display join ui
  joinContent.classList.remove('hide-content');
  leaveContent.classList.add('hide-content');

  alert('room was not found');
  roomId = undefined;
});

/**
 * Returns mouse position relative to canvas
 * @param CanvasObject
 * @param Event
 */
function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: Math.floor(evt.clientX - rect.left),
    y: Math.floor(evt.clientY - rect.top),
  };
}

/**
 * Update mouse position
 */
canvas.addEventListener('mousemove', (e) => {
  mousePos = getMousePos(canvas, e);
});

setInterval(() => {
  socket.emit(
    'player:update',
    {
      control: 'mousePosition',
      state: { x: mousePos.x, y: mousePos.y },
    },
    roomId
  );
}, 50);

/**
 * Draws data recieved from server
 * @param ArrayOfPlayers: {id: string, isAlive: bool, position: {x: int, y: int}}
 */
socket.on('packet:update', (packet) => {
  console.log(packet);
  const [players, projectiles] = packet;
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw every player
  players.map((player, index) => {
    const { id, isAlive, position } = player;
    drawPlayer(ctx, position.x, position.y, playerColors[index]);
  });

  // draw projectiles
  projectiles.map((projectile) => {
    const { id, isAlive, position } = projectile;
    drawBullet(ctx, position.x, position.y);
  });
});
