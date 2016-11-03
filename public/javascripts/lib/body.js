import vector from './vector';

const
  create = Object.create,
  assign = Object.assign;

export default {
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  radius: 10,
  color: '#888',
  type: 'circle',
  border: true,
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
        ctx.drawImage(this.image, this.x, this.y/*, this.width, this.height*/);
        break;
    }

    if (this.type !== 'image') { ctx.fill(); }
    if (this.border) { ctx.stroke(); }
  },
  setPos: function ( x, y ) {
    if (arguments.length !== 2) {
      throw TypeError('setPos() accepts two arguments');
    }

    if (!Number( x ) || !Number( y )) {
      throw TypeError('Invalid position');
    }

    this.y = y;
    this.x = x;

    return this;
  }
};