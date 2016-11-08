import Layout from '../../lib/layout';

export default function ( options ) {
  const
    layout = Layout.setup( options ),
    canvas = layout.canvas;

  layout.regions = {
    picture: {
      x: canvas.width/2,
      y: 0,
      width: 2,
      height: canvas.height
    },
    infoBar: {width: canvas.width, height: 100},
    players: {x: 500, y: 120},
    centerBar: {x: canvas.width/2, y: 0}
  };

  return layout;
}