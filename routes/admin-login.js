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

exports.form = function (req, res, next) {
  res.render('login', {title: 'Login'});
};

exports.submit = function (req, res, next) {
  const body = req.body;

  admin.authenticate(body.name, body.pass, (err, admine) => {
    if ( err ) return next( err );

    if ( admine ) {
      req.session.uid = admine._id;
      res.redirect('/api/pictures'); 
    } else {
      res.error('Sorry, invalid credantials!');
      res.redirect('back');
    }
  });
};

exports.logout = function (req, res, next) {
  req.session.destroy(err => {
    if ( err ) return next( err );

    res.redirect('/admin/login');
  });
};