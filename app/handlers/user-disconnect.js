const remove = require('lodash/remove');

module.exports = function (socket, io, queue) {
  socket.on('disconnect', function () {
    const name = socket.groupName;

    if (queue.includes(socket.player)) {
      remove(queue, player => {
        return player.socket.id === socket.id;
      });
    } else {
      socket.leave( name );
    }
  });
};