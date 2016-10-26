export default {
  x: 0,
  y: 0,
  px: 0,
  py: 0,
  accX: 0.3,
  accY: 0.3, 
  radius: 50,
  bounce: 0.5,
  color: '#888',
  type: 'circle',
  border: true,
  alpha: 0.7,
  setPos( x = 0, y = 0 ) {
    this.x = x;
    this.y = y;
  },
  distance( x, y ) {
    if ( x === null || y === null ) return false;

    let dx = x - this.x,
      dy = y - this.y,
      pow = Math.pow,
      dist = Math.sqrt( pow( dx, 2 ) + pow( dy, 2 ) );

    return dist;
  },
  draw( ctx ) {
    ctx.beginPath();
    ctx.globalAlpha = this.alpha;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.fillStyle = this.color;
    this.type == 'circle' ?
      ctx.arc( this.x, this.y, this.radius, 0, Math.PI * 2, false ) :
      ctx.rect( this.x, this.y, this.width, this.height );
    ctx.fill();
    if ( this.border ) {
      ctx.stroke();
    }
  }
};