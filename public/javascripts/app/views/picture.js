import Rect from '../../lib/body';

export default function ( options ) {
  const rect = Rect.setup(
    Object.assign(options, {
      type: 'image'
    })
  );

  return rect;
}