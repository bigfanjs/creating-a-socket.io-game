export default {
  x: 0,
  y: 0,
  fontSize: 10,
  fontFamily: 'tahoma',
  text: 'text',
  color: '#000',
  baseLine: 'center',
  rotation: 0,
  draw( ctx ) {
    ctx.beginPath();
    ctx.save();
    ctx.translate( this.tx, this.ty );
    ctx.rotate( this.rotation );
    ctx.fillStyle = this.color;
    ctx.font = this.fontSize + 'px ' + this.fontFamily;
    ctx.textBaseline = this.baseLine;
    ctx.fillText( this.text, this.x, this.y );
    ctx.restore();
  }
};