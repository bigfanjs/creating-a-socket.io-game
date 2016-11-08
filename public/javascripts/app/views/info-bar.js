import Layout from '../../lib/layout';

export default function ( options ) {
  const layout = Layout.setup({
    regions: {
      clicks: {x: 20, y: 5},
      timeLeft: {x: 15, y: 5},
      score: {x: 10, y: 5},
      player: {x: 5, y: 5}
    }
  });

  return layout;
}