import Rect from '../../lib/body';

export default function (img, options) {
  const opts = {
    image: img,
    type: 'image'
  };

  Object.assign(opts, options);

  const rect = Rect.setup( opts );

  return rect;
}