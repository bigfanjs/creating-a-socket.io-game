import Text from '../../lib/text';

export default function ( options ) {
  const { x, y, name } = options;

  const text = Text.setup({
    x, y,
    text: 'Name',
    fontSize: 20
  });

  const player = Text.setup({
    x: x + 25,
    y: y + 20,
    text: name,
    fontSize: 15,
    color: 'red',
    textAlign: 'center'
  });

  return [ text, player ];
}