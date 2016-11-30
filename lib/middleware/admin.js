'use strict';

const
  AdminModel = require('../../models').Admin,
  User = require('../../lib/user'),
  config = require('../../config');

const admin = User.create({
  Model: AdminModel,
  name: config.admin.name,
  password: config.admin.password
}).init(function () {
  AdminModel.remove({name: this.name}, err => {
    if ( err ) throw err;
  });
});

admin.save((err, admin) => {
  if ( err ) throw err;

  console.log('Successfully saved Admin');
});
exports.provideAdmin = function () {
  return (req, res, next) => {
    req.admin = admin;
    req.success = '/admin/pictures';
    req.failure = '/admin/login';
    next();
  };
};

exports.isAuthenticated = function () {
  return (req, res, next) => {
    const uid = req.session.uid;

    if ( uid ) {
      AdminModel.findOne({ _id: uid }, (err, admin) => {
        if ( err ) return next( err );

        if (admin && !admin._id) {
          return next();
        }

        res.admin = res.locals.admin = admin;
        next();
      });
    } else {
      res.redirect('/admin/login');
    }
  };
};