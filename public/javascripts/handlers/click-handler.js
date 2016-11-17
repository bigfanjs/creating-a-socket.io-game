import { clicks } from '../app/views/clicks';

export default function ( socket ) {
  socket.on('click', function ( playerClicks ) {
    clicks.text = playerClicks + '/10';
  });
}