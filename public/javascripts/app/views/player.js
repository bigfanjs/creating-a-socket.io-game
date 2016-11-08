import Text from '../../lib/text';

export default function ( options ) {
  const { x, y } = options;

  const text = Text.setup({
    x, y,
    text: 'Name',
    fontSize: 30
  });

  const player = Text.setup({
    x: x,
    y: y + 10,
    text: 'Adel',
    fontSize: 20,
    color: '#777777'
  });

  return [ text, player ];
}