import isObject from 'lodash/isObject';
import vector from './vector';

const
  create = Object.create,
  assign = Object.assign;

export default {
  x: 0,
  y: 0,
  px: 0,
  py: 0,
  width: 50,
  height: 50,
  radius: 10,
  color: '#888',
  type: 'circle',
  fill: true,
  border: false,
  lineWidth: 1,
  setup: function ( options ) {
    const proto = create( vector );
    assign(proto, this);

    const body = create( proto );
    assign( body, options );

    return body;
  },
  draw: function ( ctx ) {
    ctx.beginPath();

    if ( this.border ) {
      ctx.strokeStyle = this.strokeStyle;
      ctx.lineWidth = this.lineWidth;
    }

    ctx.fillStyle = this.color;

    switch ( this.type ) {
      case 'circle':
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        break;
      case 'body':
        ctx.rect(this.x, this.y, this.width, this.height);
        break;
      case 'image':
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        break;
    }

    if (this.type !== 'image' && this.fill) {
      ctx.fill();
    }
    if (this.border) {
      if (this.lineWidth) {
        ctx.lineWidth = this.lineWidth;
      }

      ctx.stroke();
    }

    return this;
  },
  update: function () {
    var vx, vy;

    vx = this.x - this.px;
    vy = this.y - this.py;

    this.x += vx + 0.1;
    this.y += vy + 0.1;

    this.px = this.x;
    this.py = this.y;

    return this;
  },
  setPos: function ( x, y ) {
    if (!isObject( x ) && arguments.length !== 2) {
      throw TypeError('setPos() accepts two arguments');
    }

    if (isObject( x ) && ( x.x && x.y )) {
      const pos = x;

      x = pos.x;
      y = pos.y;
    }

    if (!Number( x ) || !Number( y )) {
      throw TypeError('Invalid position');
    }

    this.y = this.px = y;
    this.x = this.py = x;

    return this;
  }
};