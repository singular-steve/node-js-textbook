const SocketIO = require('socket.io');
const axios = require('axios');

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io);
  
  const room = io.of('/room');
  const chat = io.of('/chat');
  
  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
  })
  
  room.on('connection', socket => {
    console.log('Connected to the room Namespace');
    socket.on('disconnect', () => {
      console.log('Disconnected from the room Namespace');
    });
  });
  
  chat.on('connection', socket => {
    console.log('Connected to the chat Namespace');
    
    const req = socket.request;
    const { headers: { referer }} = req;
    const roomId = referer
      .split('/')[referer.split('/').length - 1]
      .replace(/\?.+/, '');
    socket.join(roomId);
    socket.to(roomId).emit('join', {
      user: 'system',
      chat: `${req.session.color} entered!`,
    });
    
    socket.on('disconnected', () => {
      console.log('Disconnected from the chat Namespace');
      socket.leave(roomId);
      
      const currentRoom = socket.adapter.rooms[roomId];
      const userCount = currentRoom ? currentRoom.length : 0;
      if (userCount === 0) {
        axios.delete(`http://localhost:8005/room/${roomId}`)
          .then(() => {
            console.log('Room Deleted!');
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        socket.to(roomId).emit('exit', {
          user: 'system',
          chat: `${req.session.color} leaved!`,
        });
      }
    });
  });
};