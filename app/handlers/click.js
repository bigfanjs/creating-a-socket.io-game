'use strict';

module.exports = function clickHandler( socket ) {
  var totalClicks = 0; // temparary.

  socket.on('click', function listener() {
    if (totalClicks < 10) {
      totalClicks += 1;
      socket.emit('click', totalClicks);
    } else {
      socket.emit('block-clicks');
      socket.removeListener('click', listener);
    }
  });
};