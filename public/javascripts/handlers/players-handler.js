import $ from 'jquery';
import template from '../templates/players.pug';

export default function ( socket ) {
  socket.on('players', function ( obj ) {
    const html = template( obj );

    $('#player-list').html( html );
  });
}