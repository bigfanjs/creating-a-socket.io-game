import Layout from '../../lib/layout';
import Body from '../../lib/body';
import isObject from 'lodash/isObject';

export default function ( canvas, drawings, options ) {
  if (canvas.nodeType == 1 && isObject( options )) {
    const layout = Layout.setup(canvas, drawings, options);

    layout.regions = {
      clicks: {x: 700, y: 25},
      timeLeft: {x: 400, y: 25},
      score: {x: 200, y: 25},
      player: {x: 5, y: 25}
    };

    return layout;
  } else if (arguments.length == 1 && isObject( canvas )) {
    const
      options = canvas,
      body = Body.setup(Object.assign({
        color: '#9fe1c4',
        type: 'body'
      }, options));

    return body;
  }
}