'use strict';

const
  AdminModel = require('../models').Admin,
  User = require('../lib/user'),
  config = require('../config');

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

exports.provideAdmin = function () {
  return (req, res, next) => {
    req.admin = admin;
  };
};

exports.isAuthenticated = function () {
  return (req, res, next) => {
    const uid = req.session.uid;

    if ( !uid ) {
      return next();
    }

    AdminModel.findOne({ _id: uid }, (err, admin) => {
      if ( err ) return next( err );

      if ( !admin._id ) {
        return next();
      }

      res.admin = res.locals.admin = admin;
      next();
    });
  };
};