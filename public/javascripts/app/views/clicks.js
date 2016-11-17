import Text from '../../lib/text';

export const text = Text.setup({
  text: 'Clicks',
  fontSize: 20
});

export const clicks = Text.setup({
  text: '10',
  color: 'red',
  fontSize: 15,
  textAlign: 'center'
});

export default function ( options ) {
  const { x, y } = options;
  
  text.x = x;
  text.y = y;

  clicks.x = x + 25;
  clicks.y = y + 20;

  return [ text, clicks ];
}