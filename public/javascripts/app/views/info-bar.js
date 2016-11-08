import Layout from '../../lib/layout';

export default function ( canvas, options ) {
  const layout = Layout.setup(canvas, options);

  layout.regions = {
    clicks: {x: 300, y: 5},
    timeLeft: {x: 200, y: 5},
    score: {x: 100, y: 5},
    player: {x: 5, y: 5}
  };

  return layout;
}