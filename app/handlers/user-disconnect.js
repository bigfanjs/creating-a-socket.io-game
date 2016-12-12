const
  find = require('lodash/find'),
  remove = require('lodash/remove');

module.exports = function (socket, io, groups) {
  socket.on('disconnect', function () {
    const
      name = socket.groupName,
      player = socket.player,
      group = find(groups, ['name', name]),
      players = group ? group.players : [];

    if ( group ) {
      if (players.length === 1) {
        groups.splice(groups.indexOf( group ), 1);
      } else {
        remove(players, player => {
          return player.id === socket.id;
        });

        io.to( group.name ).emit('players', {
          amount: player.playerNumbers,
          players: players.map(obj => obj.name),
          avatar: player.avatar
        });
      }

      socket.leave( group.name );
    }
  });
};