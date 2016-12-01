'use strict';

const
  bcrypt = require('bcrypt'),
  forEach = require('lodash/forEach'),
  isFunction = require('lodash/isFunction');

const
  create = Object.create,
  assign = Object.assign;

module.exports = {
  create: function ( options ) {
    options = options || {};

    const user = create( this );

    assign(user, options);

    user.init = function ( options ) {
      if (options && isFunction( options )) {
        const fn = options;

        options = null;
        fn.call( user );

        return user;
      }

      options = options || {};

      forEach(options, (value, key) => {
        if (isFunction( value )) {
          value.call( this );
          delete options[ key ];
        }
      });

      assign(user, options);

      return user;
    };

    return user;
  },
  save: function ( callback ) {
    this.hashPassword((err, password) => {
      if ( err ) return err;

      this.Model.create({
        name: this.name,
        score: this.score,
        level: this.level,
        avatar: this.avatar,
        password: password
      }, (err, user) => {
        if ( err ) return callback( err );

        callback(null, user);
      });
    });
  },
  update: function ( callback ) {
    this.hashPassword((err, password) => {
      if ( err ) return callback( err );

      this.Model.update(
        { _id: this._id },
        { name: this.name,
          password: password },
        (err, user) => {
          if ( err ) return callback( err );

          callback(null, user);
        }
      );
    });
  },
  hashPassword: function (callback) {
    bcrypt.genSalt(12, (err, salt) => {
      if ( err ) return callback( err );

      bcrypt.hash(this.password, salt, (err, hash) => {
        if ( err ) return callback( err );

        callback(null, hash);
      });
    });
  },
  authenticate: function (name, password, callback) {
    this.Model.findOne({ name }, (err, user) => {
      if ( err ) return callback( err );
      if (user === null || (user && !user._id)) {
        return callback();
      }

      bcrypt.compare(password, user.password, (err, res) => {
        if ( err ) return callback( err );

        if (res === true) {
          callback(null, user);
        } else {
          callback();
        }
      });
    });
  }
};