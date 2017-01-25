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
        Model: UserModel,

        //-- temparary placeholders----------
        score: 37,
        level: 5,
        diffs: 45,
        wins: 24,
        looses: 12,
        games: 23,
        ranking: 245,
        avatar: {
          name: 'pic',
          path: '/images/user.png'
        },
        birthday: '1995/10/30',
        email: 'example@email.com',
        website: 'example.com',
        location: 'San Fransisco, USA',
        social: {
          facebook: 'jonnyhany',
          twitter: '@jonnyhany',
          google: 'jonnyhany',
          github: 'jonnyhany'
        }
        //---------------
      }).save((err, user) => {
        if ( err ) { return next( err ); }

        req.session.uid = user._id;
        res.redirect('/profile');
      });
    }
  });
};