import Text from '../../lib/text';

export default function ( options ) {
  const { x, y } = options;

  const text = Text.setup({
    x, y,
    text: 'Clicks',
    fontSize: 20
  });

  const clicks = Text.setup({
    x: x + 25,
    y: y + 20,
    text: '5/10',
    color: 'red',
    fontSize: 15,
    textAlign: 'center'
  });

  return [ text, clicks ];
}