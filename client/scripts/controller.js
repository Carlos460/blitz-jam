// Updates player's controller state
// on key press to server.
window.addEventListener('keypress', (event) => {
  if (event.code === 'KeyA') {
    socket.emit(
      'player:update',
      {
        control: 'left',
        state: true,
      },
      roomId
    );
  }
  if (event.code === 'KeyD') {
    socket.emit(
      'player:update',
      {
        control: 'right',
        state: true,
      },
      roomId
    );
  }
  if (event.code === 'KeyW') {
    socket.emit(
      'player:update',
      {
        control: 'up',
        state: true,
      },
      roomId
    );
  }
  if (event.code === 'KeyS') {
    socket.emit(
      'player:update',
      {
        control: 'down',
        state: true,
      },
      roomId
    );
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'KeyA') {
    socket.emit(
      'player:update',
      {
        control: 'left',
        state: false,
      },
      roomId
    );
  }
  if (event.code === 'KeyD') {
    socket.emit(
      'player:update',
      {
        control: 'right',
        state: false,
      },
      roomId
    );
  }
  if (event.code === 'KeyW') {
    socket.emit(
      'player:update',
      {
        control: 'up',
        state: false,
      },
      roomId
    );
  }
  if (event.code === 'KeyS') {
    socket.emit(
      'player:update',
      {
        control: 'down',
        state: false,
      },
      roomId
    );
  }
});

window.addEventListener('click', (event) => {
  socket.emit(
    'player:update',
    {
      control: 'shoot',
      state: true,
    },
    roomId
  );
});
