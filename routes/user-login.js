'use strict';

const User = require('../lib/user');

exports.form = function (req, res, next) {
  res.render('admin-login', { title: 'Login' });
};

exports.submit = function (req, res, next) {
  const { name, pass } = req.body;

  User.authenticate(name, pass, (err, user) => {
    if ( err ) return next( err );

    if ( user ) {
      req.session.uid = user._id;
      res.redirect('/profile');
    } else {
      res.error('Sorry, invalid credantials!');
      res.redirect('/login');
    }
  });
};

exports.logout = function (req, res, next) {
  req.session.destory(err => {
    if ( err ) return next( err );

    res.redirect('/login');
  });
};