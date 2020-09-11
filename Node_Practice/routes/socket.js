const express = require('express');
const router = express.Router();
const SocketIO = require('socket.io');

module.exports = (server) => {
  const io = SocketIO(server, {path: '/socket.io'});

  io.on('connection', (socket) => {
    const req = socket.request;
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('새로운 클라이언트 접속!', ip, socket.id, req.id);
    socket.on('disconnect', () => {
      console.log('클라이언트 접속 해제', ip, socket.id);
      clearInterval(socket.intervar);
    });
    socket.on('error', (error) => {
      console.error(error);
    });
    socket.on('reply', (data) => {
      console.log(data);
    });
    socket.intervar = setInterval(() => {
      socket.emit('chat-msg-1', 'Hello Socket.IO');
    }, 3000);
  })
} 



module.exports = router;