const behavior = {
  setup: function ( options ) {
    const text = Object.assign(
      Object.create( this ), options
    );

    return text;
  },
  draw: function ( ctx ) {
    ctx.beginPath();

    if ( this.tx !== null && this.ty !== null ) {
      ctx.save();
      ctx.translate( this.tx, this.ty );
    }

    if ( this.rotate ) {
      ctx.rotate( this.rotation );
    }

    ctx.fillStyle = this.color;
    ctx.font = this.fontSize + 'px ' + this.fontFamily;
    ctx.textBaseline = this.baseLine;
    ctx.fillText( this.text, this.x, this.y );
    ctx.restore();
  }
};


export default Object.assign(
  Object.create( behavior ),
  { x: 0,
    y: 0,
    fontSize: 10,
    fontFamily: 'tahoma',
    text: 'text',
    color: '#000',
    baseLine: 'center',
    rotation: 0 }
);