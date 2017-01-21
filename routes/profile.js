'use strict';

const
  path = require('path'),
  User = require('../models').User;

exports.profile = function (req, res, next) {
  res.render('profile-view', {title: 'Profile'});
};

exports.form = function (req, res, next) {
  res.render('profile-edit');
};

exports.play = function (req, res) {
  res.sendFile('app.html', {
    root: path.join(__dirname, '../public')
  });
};

exports.edit = function (req, res, next) {
  User.update(
    { _id: req.param._id },
    req.body,
    { multi: false },
    (err, user) => {
      if ( err ) return next( err );
    }
  );
};

exports.remove = function (req, res, next) {
  User.remove({_id: req.param._id}, (err, user) => {
    if ( err ) return next( err );

    req.session.destroy();
    res.redirect('/login');
  });
};