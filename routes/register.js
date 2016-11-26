'use strict';

const User = require('../models/user');

exports.form = function (req, res, next) {
  res.render('sign-up', {title: 'Sign up'});
};

exports.signup = function (req, res, next) {
  const someone = req.body;

  User.findOne({ name: someone.name }, (err, user) => {
    if ( err ) return next( err );

    if (user._id) {
      req.flash('error', {type: 'danger', msg: 'Username has already taken!'});
      res.redirect('back');
    } else {
      User.create(someone, (err, user) => {
        if ( err ) return next( err );

        req.session.uid = user._id;
        res.redirect('/profile/:' + user._id);
      });
    }
  });
};