'use strict';

const bcrypt = require('bcrypt');

const
  Admin = require('../models/').admin,
  config = require('../config');

bcrypt.genSalt(12, (err, salt) => {
  if ( err ) throw err;

  bcrypt.hash(config.password, salt, (err, hash) => {
    if ( err ) throw err;

    Admin.remove({ name: config.name });
    Admin.create({
      name: config.name,
      password: hash
    }, (err, admin) => {
      if ( err ) throw err;

      
    });
  });
});

module.exports = {
  authenticate: function () {
    
  }
};