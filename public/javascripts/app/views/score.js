import Text from '../../lib/text';

export default function ( options ) {
  const { x, y } = options;

  const text = Text.setup({
    x, y,
    text: 'Score',
    fontSize: 20
  });

  const score = Text.setup({
    x: x + 22,
    y: y + 20,
    text: 2,
    color: 'red',
    fontSize: 15,
    textAlign: 'center'
  });

  return [ text, score ];
}