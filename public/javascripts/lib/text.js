const behavior = {
  setup: function ( options ) {
    const text = Object.assign(
      Object.create( this ), options
    );

    return text;
  },
  draw: function ( ctx ) {
    var saved = false;

    ctx.beginPath();

    if ( this.tx !== null && this.ty !== null ) {
      saved = true;
      ctx.save();
      ctx.translate( this.tx, this.ty );
    }

    if ( this.rotate ) {
      ctx.rotate( this.rotation );
    }

    ctx.fillStyle = this.color;
    ctx.font = this.fontSize + 'px ' + this.fontFamily;

    if ( this.baseLine ) {
      ctx.textBaseline = this.baseLine;
    } else if ( this.textAlign ) {
      ctx.textAlign = this.textAlign;
    }

    ctx.fillText( this.text, this.x, this.y );

    if ( saved === true ) { ctx.restore(); }
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
    rotation: 0 }
);