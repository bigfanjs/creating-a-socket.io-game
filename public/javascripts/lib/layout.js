import bind  from 'lodash/bind';

const assign = Object.assign;

export default {
  setup: function (canvas, drawings, options) {
    const layout = Object.create( this );

    layout.options = options;
    assign(layout, options, { canvas, drawings });

    return layout;
  },
  getRegion: function ( name ) {
    var region;

    if (!(region = this.regions[ name ])) {
      throw TypeError('No such region!');
    }

    this.name = name;
    this.region = region;

    return this;
  },
  show: function ( View ) {
    const
      options = assign({}, this.options, this.region),
      view = View( options );

    this.regions[this.name].view = view;

    if (Array.isArray( view )) {
      view.forEach(v => {
        if ( v.draw ) {
          this.drawings.push(bind(v.draw, v));
        }
      });
    } else {
      if ( view.draw ) {
        this.drawings.push(bind(view.draw, view));
      }
    }
  }
};