'use strict';

// requiring socket.io. 
const socketio = require('socket.io');

// requiring handlers.
const
  handleUserlogin = require('./handlers/login'),
  handleUserClicks = require('./handlers/click'),
  handleGameStart = require('./handlers/game-start');

const players = [];

module.exports =  function ( server ) {
  const io = socketio.listen( server );

  io.on('connection', function ( socket ) {

    handleUserlogin(socket, io, players);
    handleUserClicks(socket);
    handleGameStart(socket);

  });
};