'use strict';

const
  PlayerModel = require('../../models').User,
  User = require('../../lib/user');

const player = User.create({Model: PlayerModel});

exports.provideUser = function () {
  return (req, res, next) => {
    res.locals.user = true;
    req.user = player;
    req.failure = '/login';
    req.success = '/profile';
    next();
  };
};

exports.isAuthenticated = function () {
  return (req, res, next) => {
    const uid = req.session.uid;

    if (uid) {
      PlayerModel.findOne({ _id: uid }, (err, user) => {
        if ( err ) { return next( err ); }
        if (user && !user._id) {
          return next();
        }

        req.user = res.locals.user = user;
        next();
      });
    } else {
      res.redirect('/login');
    }
  };
};