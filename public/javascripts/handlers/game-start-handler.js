import $ from 'jquery';
import game from '../app';
import template from '../templates/game-area.pug';

export default function (socket, user) {
  socket.on('start', function ( obj ) {
    $('#container').html(template());
    const canvas = document.querySelector('#canvas');

    game.init(canvas, socket, Object.assign(obj, user));
  });
}