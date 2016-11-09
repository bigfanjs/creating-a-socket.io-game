import Layout from '../../lib/layout';

export default function (canvas, options) {
  const layout = Layout.setup(canvas, options);

  layout.regions = {
    picture: {
      x: 0,
      y: 50,
      width: canvas.width,
      height: canvas.height
    },
    infoBar: {width: canvas.width, height: 100},
    players: {x: 500, y: 120},
    centerBar: {
      sx: canvas.width/2,
      sy: 50,
      tx: canvas.width/2,
      ty: canvas.height
    }
  };

  return layout;
}