'use strict';

const User = require('../models/user');

exports.view = function (req, res, next) {
  res.render('profile', { title: 'Profile' });
};

exports.form = function (req, res, next) {
  res.render('profile-edit');
};

exports.remove = function (req, res, next) {
  User.remove({_id: req.param._id}, (err, user) => {
    if ( err ) return next( err );

    req.session.destroy();
    res.redirect('/login');
  });
};