'use strict';

const addToQueue = function (socket, queue) {
  queue.push( socket );
};

module.exports = function (socket, queue, players) {
  socket.on('player', function ( player ) {
    var
      name = player.name,
      amount = player.competitors_num;

    socket.player = player;
    players.push( name );

    addToQueue(socket, queue);

    socket.emit('loginResult', {
      success: true,
      amount: amount
    });
  });
};