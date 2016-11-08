export default {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  spacing: 5,
  color: '#000',
  setup( options ) {
    const line = Object.create( this );

    Object.assign(line, options);

    return line;
  },
  setStart(x, y) {

    this.x1 = x;
    this.y1 = y;

    return this;
  },
  setTarget(x, y) {

    this.x2 = x;
    this.y2 = y;

    return this;
  },
  draw( ctx ) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo( this.x1, this.y1 );
    ctx.lineTo( this.x2, this.y2 );
    ctx.stroke();
  }
};