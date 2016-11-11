import Text from '../../lib/text';

export default function ( options ) {
  const { x, y } = options;

  const text = Text.setup({
    x, y,
    text: 'remaining time',
    fontSize: 20
  });

  const timeLeft = Text.setup({
    x: x + 60,
    y: y + 20,
    text: '03:25',
    fontSize: 15,
    color: 'red',
    textAlign: 'center'
  });

  return [ text, timeLeft ];
}