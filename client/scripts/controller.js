// Updates player's controller state
// on key press to server.
window.addEventListener('keypress', (event) => {
  if (event.code === 'KeyA') {
    socket.emit('player:update', {
      control: 'left',
      state: true,
    });
  }
  if (event.code === 'KeyD') {
    socket.emit('player:update', {
      control: 'right',
      state: true,
    });
  }
  if (event.code === 'KeyW') {
    socket.emit('player:update', {
      control: 'up',
      state: true,
    });
  }
  if (event.code === 'KeyS') {
    socket.emit('player:update', {
      control: 'down',
      state: true,
    });
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'KeyA') {
    socket.emit('player:update', {
      control: 'left',
      state: false,
    });
  }
  if (event.code === 'KeyD') {
    socket.emit('player:update', {
      control: 'right',
      state: false,
    });
  }
  if (event.code === 'KeyW') {
    socket.emit('player:update', {
      control: 'up',
      state: false,
    });
  }
  if (event.code === 'KeyS') {
    socket.emit('player:update', {
      control: 'down',
      state: false,
    });
  }
});

window.addEventListener('click', (event) => {
  socket.emit('player:update', {
    control: 'shoot',
    state: true,
  });
})
