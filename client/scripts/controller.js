// Updates player's controller state
// on key press to server.
window.addEventListener('keypress', (event) => {
  if (event.code === 'KeyA') {
    socket.emit('player:update', {
      id: socket.id,
      control: 'left',
      state: true,
    });
  }
  if (event.code === 'KeyD') {
    socket.emit('player:update', {
      id: socket.id,
      control: 'right',
      state: true,
    });
  }
  if (event.code === 'KeyW') {
    socket.emit('player:update', {
      id: socket.id,
      control: 'up',
      state: true,
    });
  }
  if (event.code === 'KeyS') {
    socket.emit('player:update', {
      id: socket.id,
      control: 'down',
      state: true,
    });
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'KeyA') {
    socket.emit('player:update', {
      id: socket.id,
      control: 'left',
      state: false,
    });
  }
  if (event.code === 'KeyD') {
    socket.emit('player:update', {
      id: socket.id,
      control: 'right',
      state: false,
    });
  }
  if (event.code === 'KeyW') {
    socket.emit('player:update', {
      id: socket.id,
      control: 'up',
      state: false,
    });
  }
  if (event.code === 'KeyS') {
    socket.emit('player:update', {
      id: socket.id,
      control: 'down',
      state: false,
    });
  }
});
