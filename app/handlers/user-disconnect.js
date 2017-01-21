const remove = require('lodash/remove');

module.exports = function (socket, io, queue) {
  socket.on('disconnect', function () {
    const
      groups = Object.keys(io.sockets.adapter.rooms),
      name = socket.groupName;

    if (queue.includes(socket.player)) {
      remove(queue, player => {
        return player.socket.id === socket.id;
      });
    } else if (groups.includes(name)) {
      socket.leave( name );
    }
  });
};