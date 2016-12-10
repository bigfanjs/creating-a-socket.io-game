import Text from '../../lib/text';

export default function ( options ) {
  const { x, y, score } = options;

  const title = Text.setup({
    x, y,
    text: 'Score',
    fontSize: 20
  });

  const text = Text.setup({
    x: x + 22,
    y: y + 20,
    text: score,
    color: 'red',
    fontSize: 15,
    textAlign: 'center'
  });

  return [title, text];
}