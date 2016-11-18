'use strict';

var timeout;

module.exports = function gameStartHandler( socket ) {
  socket.on('game-start', function () {
    const startTime = new Date().getTime();

    (function timer() {
      const
        currTime = new Date().getTime(),
        timeLeft = Math.max(0, 60*1000 - (currTime - startTime));

      socket.emit('time-left', { text: timeLeft });

      timeout = setTimeout(timer, 100);

      if ( timeLeft <= 0 ) {
        clearTimeout(timeout);
        socket.removeAllListeners();
        socket.emit('game-over');
      }
    })();
  });
};