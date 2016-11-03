export default {
  add: function (a, b) {
    const length = arguments.length;

    if ( length == 1 ) {
      this.a += a;
      this.b += a;
    } else if ( length == 2 ) {
      this.a += a;
      this.b += b;
    }

    return this;
  },
  sub: function (a, b) {
    const length = arguments.length;

    if ( length == 1 ) {
      this.a -= a;
      this.b -= a;
    } else if ( length == 2 ) {
      this.a -= a;
      this.b -= b;
    }

    return this;
  },
  mul: function (a, b) {
    const length = arguments.length;

    if ( length == 1 ) {
      this.a *= a;
      this.b *= a;
    } else if ( length == 2 ) {
      this.a *= a;
      this.b *= b;
    }

    return this;
  },
  div: function (a, b) {
    const length = arguments.length;

    if ( length == 1 ) {
      this.a /= a;
      this.b /= a;
    } else if ( length == 2 ) {
      this.a /= a;
      this.b /= b;
    }

    return this;
  },
  reset: function () {
    this.a = 0;
    this.b = 0;

    return this;
  },
  distance: function (a, b) {
    const
      diffX = this.a - a,
      diffY = this.b - b;
      dest = Math.sqrt(diffX*diffX, diffX*diffY);

    return dest;
  }
};