import Text from '../../lib/text';

export default function ( options ) {
  const { amount, players } = options;

  const texts = [];

  for (let i = 0; i < amount; i++) {
    options.x += 5*i;

    const player = Text.setup(
      Object.assign(options, {
        text: players[ i ],
        color: '#68b700'
      })
    );

    texts.push( player );
  }

  return texts;
}