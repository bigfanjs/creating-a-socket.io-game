import Line from '../../lib/line';

export default function ( options ) {
  const { sx, sy, tx, ty } = options;

  const line = Line
    .setup({})
    .setStart(sx, sy)
    .setTarget(tx, ty);

  return line;
}