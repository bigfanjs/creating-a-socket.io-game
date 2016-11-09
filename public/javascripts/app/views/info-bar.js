import Layout from '../../lib/layout';

export default function ( canvas, options ) {
  const layout = Layout.setup(canvas, options);

  const width = canvas.width;

  layout.regions = {
    clicks: {x: width, y: 10},
    timeLeft: {x: width/2, y: 10},
    score: {x: width/3, y: 10},
    player: {x: width/4, y: 10}
  };

  return layout;
}