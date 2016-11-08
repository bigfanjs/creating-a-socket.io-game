import Text from '../../lib/text';

export default function ( options ) {
  const { x, y } = options;

  const text = Text.setup({
    x, y,
    text: 'Clicks',
    fontSize: 16
  });

  const clicks = Text.setup({
    x: x,
    y: y + 10,
    text: '5/10',
    color: '#777777',
    fontSize: 14
  });

  return [ text, clicks ];
}