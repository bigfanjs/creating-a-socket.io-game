'use strict';

// requiring socket.io. 
const socketio = require('socket.io');

// requiring handlers.
const
  handleUserlogin = require('./handlers/login'),
  handleUserClicks = require('./handlers/click'),
  handleGameStart = require('./handlers/game-start'),
  handleDisconnection = require('./handlers/user-disconnect');

const
  players = [],
  groups = [];

module.exports =  function ( server ) {
  const io = socketio.listen( server );

  io.on('connection', function ( socket ) {
    handleUserlogin(socket, io, groups, players);
    handleUserClicks(socket);
    handleGameStart(socket);
    handleDisconnection(socket, io, groups);
  });
};