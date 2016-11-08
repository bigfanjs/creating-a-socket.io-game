export default {
  setup: function ( options ) {
    const layout = Object.create( this );

    layout.options = options;

    return layout;
  },
  getRegion: function ( name ) {
    var region;

    if (!(region = this.regions[ name ])) {
      throw TypeError('No such region!');
    }

    this.region = region;

    return this;
  },
  show: function ( View ) {
    const
      view = View( this.options ),
      ctx = this.canvas.getContext('2d');

    if (Array.isArray( view )) {
      view.forEach(v => { v.draw( ctx ); });
    } else {
      view.draw( ctx );
    }
  }
};