export default {
  setup: function () {
    const layout = Object.create( this );

    Object.assign(layout, options);

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
      options = Object.create( this ),
      view = View( options ),
      ctx = this.canvas.getContext('2d');

    if (Array.isArray( view )) {
      view.forEach(v => { v.draw( ctx ); });
    } else {
      view.draw( ctx );
    }
  }
};