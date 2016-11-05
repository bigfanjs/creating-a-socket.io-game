export default {
  setup: function ( options ) {
    const layout = Object.create( this );

    Object.assign(layout, options);

    const canvas = layout.canvas;

    layout.regions = {
      picture: {
        x: canvas.width/2,
        y: 0,
        width: 2,
        height: canvas.height
      },
      infoBar: {width: canvas.width, height: 100},
      players: {x: 500, y: 120},
      centerBar: {x: canvas.width/2, y: 0}
    };

    return layout;
  },
  getRegion: function ( name ) {
    var region;

    if ((region = this.regions[ name ])) {
      return {
        show: function ( view ) {
          const options = Object.assign({
            image: this.image, region
          });

          view( options ).draw( ctx );
        }
      };
    }
  }
};