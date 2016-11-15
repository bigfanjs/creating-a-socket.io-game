import timeLeft from '../app/views/time-left';

const time = timeLeft[ 0 ];

export default function ( socket ) {
  socket.on('time-left', function ( remainingtime ) {
    time.text = remainingtime;
  });
}