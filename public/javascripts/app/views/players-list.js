import Text from '../../lib/text';
import Body from '../../lib/body';

export default function ( options ) {
  const { amount, players } = options;

  const texts = [];

  const background = Body.setup({
    x: options.width,
    y: 0,
    width: 100,
    height: options.height,
    color: '#78b99d',
    type: 'body'
  });

  texts.push( background );

  for (let i = 0; i < amount; i++) {
    options.y += 25*i;

    const player = Text.setup(
      Object.assign(options, {
        text: players[ i ].name,
        id: players[ i ].id,
        color: '#fff',
        fontSize: 20,
        baseLine: 'top',
        textAlign: 'center',
        spots: 1
      })
    );

    texts.push( player );
  }

  return texts;
}