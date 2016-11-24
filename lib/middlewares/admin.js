'use strict';

const
  AdminModel = require('../models').Admin,
  User = require('../lib/user'),
  config = require('../config');

module.exports = function () {
  return (req, res, next) => {
    const admin = User.create({
      Model: AdminModel,
      name: config.name,
      password: config.password
    }).init(() => {
      AdminModel.remove({name: this.name});
    });

    admin.save((err, admin) => {
      if ( err ) throw err;

      console.log('Successfully saved Admin');
    });
    
    req.someone = admin;
  };
};