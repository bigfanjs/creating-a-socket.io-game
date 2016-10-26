const validate = function ( x, y, pos ) {
  const
    isStart = pos.match( /start/i ),
    str = isStart ? 'Starting' : 'Ending';

  try {
    if ( !Number( x ) || !Number( y ) ) {
      throw TypeError(`Ivalid ${ str } Point.`);
    }
  } catch ( e ) {
    return { x: 0, y: 0 };
  }
};

export default {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  spacing: 5,
  color: '#000',
  setStart( x = 0, y = 0 ) {
    if (validate(x, y, 'Start')) {
      x = y = 0;
    }

    this.x1 = x;
    this.y1 = y;
  },
  setTarget( x = 0, y = 0 ) {
    if (validate(x, y, 'End')) {
      x = y = 0;
    }

    this.x2 = x;
    this.y2 = y;
  },
  draw( ctx ) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo( this.x1, this.y1 );
    ctx.lineTo( this.x2, this.y2 );
    ctx.stroke();
  }
};