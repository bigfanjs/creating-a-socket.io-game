import Rect from '../../lib/rect';

export default function ( options ) {
  const rect = Rect.setup(
    Object.assign(options, {
      color: '#000'
    })
  );

  return rect;
}