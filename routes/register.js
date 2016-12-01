'use strict';

const UserModel = require('../models/').User;
const User = require('../lib/user');

exports.form = function (req, res, next) {
  res.render('sign-up', {title: 'Sign up', msg: req.flash('error')});
};

exports.signup = function (req, res, next) {
  const body = req.body;

  UserModel.findOne({ name: body.name }, (err, user) => {
    if ( err ) return next( err );

    if (user !== null && user._id) {
      req.flash('error', 'Username has already taken!');
      res.redirect('back');
    } else {
      User.create({
        name: body.username,
        password: body.password,
        Model: UserModel
      }).save((err, user) => {
        if ( err ) { return next( err ); }

        req.session.uid = user._id;
        res.redirect('/profile/:' + user._id);
      });
    }
  });
};