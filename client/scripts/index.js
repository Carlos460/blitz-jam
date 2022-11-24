const leaveContent = document.querySelector('.leave-content');
const playerNameTitle = document.querySelector('.player-name');
const leaveButton = document.querySelector('#leave-button');

const joinContent = document.querySelector('.join-content');
const joinButton = document.querySelector('#join-button');
const nameField = document.querySelector('#name-field');

const canvas = document.querySelector('#main-frame');
const ctx = canvas.getContext('2d');

const playerColors = [
  '#ff0000',
  '#26ff00',
  '#0033ff',
  '#f200f2',
  '#ffee00',
  '#00f7ff',
];

let socket = io.connect('localhost:3000');

joinButton.addEventListener('click', () => {
  if (nameField.value === '') {
    alert('enter a name');
    return;
  }
  joinContent.classList.add('hide-content');
  leaveContent.classList.remove('hide-content');
  playerNameTitle.innerHTML = nameField.value;
  socket.emit('player:join', { name: nameField.value });
});

leaveButton.addEventListener('click', () => {
  // Display join ui
  joinContent.classList.remove('hide-content');
  leaveContent.classList.add('hide-content');
  // Leave game
  socket.emit('player:leave', { name: nameField.value });
});

/**
 * Draws data recieved from server
 * @params Array<Player> Array of Player objects
 *                       {id: string, isAlive: bool, position: {x: int, y: int}}
 */
socket.on('packet:update', (packet) => {
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw every player
  packet.map((currPlayer, index) => {
    const { id, isAlive, position } = currPlayer;
    drawPlayer(ctx, position.x, position.y, playerColors[index]);
  });
});
