import timeLeft from '../app/views/time-left';

const time = timeLeft()[ 1 ];

export default function ( socket ) {
  socket.on('time-left', function ( remainingTime ) {
    time.text = remainingTime.text;
  });
}