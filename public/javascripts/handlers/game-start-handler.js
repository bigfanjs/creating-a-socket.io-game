import $ from 'jquery';
import game from '../app';
import template from '../templates/game-area.pug';

export default function ( socket ) {
  socket.on('start', function ( obj ) {
    $('#container').html(template());

    const
      canvas = document.querySelector('#canvas'),
      ctx = canvas.getContext('2d');

    game.init( canvas, socket, obj );
  });
}