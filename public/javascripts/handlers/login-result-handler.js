import $ from 'jquery';
import template from '../templates/wait-area.pug';

export default function ( socket ) {
  socket.on('loginResult', function ( result ) {
    if ( result.success ) {
      const html = template({ amount: result.amount });
      $('#container').html( html );
    } else {
      $('#name-input').parent().addClass('has-error');
      $('#name-help-block').show().text( result.message );
    }
  });
}