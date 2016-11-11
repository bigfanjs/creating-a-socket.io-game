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
  init( canvas, socket, options ) {
    const
      ctx = canvas.getContext('2d'),
      id = socket.id,
      p = options.players.find(p => p.id.substr(2) === id);

    options.name = p.name;

    load().then(function ( image ) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const
        layout = GameLayout(canvas, options),
        infoBar = InfoBar(canvas, options);

      layout.getRegion('infoBar').show( InfoBar );
      layout.getRegion('players').show( players );
      layout.getRegion('picture').show(picture.bind(null, image));
      layout.getRegion('centerBar').show( centerBar );

      infoBar.getRegion('clicks').show( clicks );
      infoBar.getRegion('timeLeft').show( timeLeft );
      infoBar.getRegion('score').show( score );
      infoBar.getRegion('player').show( player );
    });
  }
};