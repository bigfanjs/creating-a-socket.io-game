import GameLayout from './views/game-layout';
import InfoBar from './views/info-bar';
import picture from './views/picture';
import players from './views/players-list';
import centerBar from './views/center-bar';

import clicks from './views/clicks';
import timeLeft from './views/time-left';
import score from './views/score';
import player from './views/player';

const assign = Object.assign;

function load( callback ) {
  const image = new Image();

  image.src = 'images/one.jpg';

  const promise = new Promise(( res, rej ) => {
    image.onload = () => { res( image ); };
  });

  return promise;
}

export default {
  init( canvas, options ) {
    const ctx = canvas.getContext('2d');

    load().then(function ( image ) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const
        opts = { canvas, image },
        layout = GameLayout(assign(options, opts)),
        infoBar = InfoBar(assign(options, opts));

      layout.getRegion('players').show( players );
      layout.getRegion('picture').show( picture );
      layout.getRegion('centerBar').show( centerBar );

      infoBar.getRegion('clicks').show( clicks );
      infoBar.getRegion('timeLeft').show( timeLeft );
      infoBar.getRegion('score').show( score );
      infoBar.getRegion('player').show( player );
    });
  }
};