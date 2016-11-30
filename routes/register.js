'use strict';

const User = require('../models/')('user');

exports.form = function (req, res, next) {
  res.render('sign-up', {title: 'Sign up', msg: req.flash('error')});
};

exports.signup = function (req, res, next) {
  const body = req.body;

  User.findOne({ name: body.name }, (err, user) => {
    if ( err ) return next( err );

    if (user !== null && user._id) {
      req.flash('error', 'Username has already taken!');
      res.redirect('back');
    } else {
      User.create(body, (err, user) => {
        if ( err ) return next( err );

        req.session.uid = user._id;
        res.redirect('/profile/:' + user._id);
      });
    }
  });
};