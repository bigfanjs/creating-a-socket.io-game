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

  playersHandler( socket );
  loginResultHandler( socket );
  gameStartHandler( socket );
  timeLeftHandler( socket );
  clickHandler( socket );

  $('#player-form').submit(function ( event ) {
    event.preventDefault();
    $.get('/profile', user => {
      socket.emit('player', {
        name: user.name,
        avatar: user.avatar.path,
        playerNumbers: $('#players-num').val()
      });
    });
  });
};