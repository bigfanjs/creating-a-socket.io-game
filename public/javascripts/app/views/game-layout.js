import Layout from '../../lib/layout';

export default function (canvas, drawings, options) {
  const layout = Layout.setup(canvas, drawings, options);

  const width = canvas.width - 100;

  layout.regions = {
    picture: {
      x: 0,
      y: 50,
      width: width,
      height: canvas.height-50
    },
    infoBar: {
      x: 0,
      y: 0,
      width: width,
      height: 100
    },
    players: {
      x: width+50,
      y: 0,
      width: width,
      height: canvas.height
    },
    centerBar: {
      sx: width/2,
      sy: 50,
      tx: width/2,
      ty: canvas.height
    }
  };

  return layout;
}