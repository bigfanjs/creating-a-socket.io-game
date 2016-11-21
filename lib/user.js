'use strict';

const
  bcrypt = require('bcrypt'),
  User = require('../models/user'),
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
      options = options || {};

      forEach(options, (prop, val) => {
        if ( isFunction( prop ) ) {
          val.call( this );
        }
      });

      assign(this, options);
    };

    return user;
  },
  save: function ( callback ) {
    this.hashPassword(this.password, (err, password) => {
      if ( err ) return err;

      User.create({
        name: this.name,
        password: password
      }, (err, user) => {
        if ( err ) return callback( err );

        callback( user );
      });
    });
  },
  update: function ( callback ) {
    this.hashPassword(this.password, (err, password) => {
      if ( err ) return callback( err );

      User.update(
        { _id: this._id },
        { name: this.name,
          password: password },
        (err, user) => {
          if ( err ) return callback( err );

          callback( user );
        }
      );
    });
  },
  hashPassword: function (password, callback) {
    bcrypt.genSalt(12, (err, salt) => {
      if ( err ) return callback( err );

      bcrypt.hash(password, salt, (err, hash) => {
        if ( err ) return callback( err );

        callback(null, hash);
      });
    });
  },
  authenticate: function (name, password, callback) {
    User.findOne({ name }, (err, user) => {
      if ( err ) return callback( err );
      if (!user._id) return callback();

      bcrypt.compare(user.password, this.password, (err, res) => {
        if ( err ) return callback( err );

        if (res === true) {
          callback(null, user);
        }
      });
    });
  }
};