'use strict';

module.exports = function (socket, queue, players) {
  socket.on('player', function ( player ) {
    const
      name = player.name,
      amount = player.competitors_num;

    player.id = socket.id;
    socket.player = player;

    players.push( name );
    queue.push( socket );

    socket.emit('loginResult', {
      success: true,
      amount: amount
    });
  });
};