import $ from 'jquery';

// import socket handlers.
import playersHandler from './handlers/players-handler';
import loginResultHandler from './handlers/login-result-handler';
import gameStartHandler from './handlers/game-start-handler';
import timeLeftHandler from './handlers/time-left-handler';
import clickHandler from './handlers/click-handler';

// import the login area template.
import template from './templates/login-area.pug';

const socket = io.connect();

window.onload = function () {
  $('#container').html(template());

  $.get('/profile', user => {
    playersHandler(socket, user);
    loginResultHandler(socket, user);
    gameStartHandler(socket, user);
    timeLeftHandler(socket, user);
    clickHandler(socket, user);

    $('#player-form').submit(function ( event ) {
      event.preventDefault();
      socket.emit('player', {
        name: user.name,
        avatar: user.avatar.path,
        competitors_num: $('#players-num').val()
      });
    });
  });
};