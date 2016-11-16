import TimeLeft from '../app/views/time-left';

const timeLeft = TimeLeft()[ 1 ];

export default function ( socket ) {
  socket.on('time-left', function ( time ) {
    const
      remainingTime = time.text,
      seconds = Math.floor(remainingTime / 1000) % 60,
      minutes = Math.floor(remainingTime / 1000 / 60) % 60,
      s = (seconds < 10 ? '0' : '') + seconds,
      m = (minutes < 10 ? '0' : '') + minutes,
      text = s + ':' + m;

    timeLeft.text = text;
  });
}