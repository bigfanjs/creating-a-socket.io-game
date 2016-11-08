import Text from '../../lib/text';

export default function ( options ) {
  const { x, y } = options;

  const text = Text.setup({
    x, y,
    text: 'Score',
    fontSize: 30
  });

  const score = Text.setup({
    x: x,
    y: y + 10,
    text: 2,
    color: '#777777',
    fontSize: 20
  });

  return [ text, score ];
}