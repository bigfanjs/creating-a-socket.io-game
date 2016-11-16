import Text from '../../lib/text';
import isObject from 'lodash/isObject';

const text = Text.setup({
  text: 'remaining time',
  fontSize: 20
});

const timeLeft = Text.setup({
  text: '00:00',
  fontSize: 15,
  color: 'red',
  textAlign: 'center'
});

export default function ( options ) {
  if (isObject( options )) {
    const { x, y } = options;

    text.x = x;
    text.y = y;

    timeLeft.x = x + 60;
    timeLeft.y = y + 20;
  }

  return [ text, timeLeft ];
}