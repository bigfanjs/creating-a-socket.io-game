import Rect from '../../lib/body';

export default function ( img, options ) {
  const rect = Rect.setup(Object.assign(
    { image: img,
      type: 'image' }, options
  ));

  return rect;
}