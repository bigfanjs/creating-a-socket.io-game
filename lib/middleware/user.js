'use strict';

const
  PlayerModel = require('../models').User,
  User = require('../lib/user');

const player = User.create({Model: PlayerModel});

exports.provideUser = function () {
  return (req, res, next) => {
    req.user = player;
  };
};

exports.isAuthenticated = function () {
  return (req, res, next) => {
    const uid = req.session.uid;

    if ( !uid ) {
      return next();
    }

    PlayerModel.findOne({ _id: uid }, (err, user) => {
      if ( err ) { return next( err ); }
      if ( !user._id ) {
        return next();
      }

      res.user = res.locals.user= user;
      next();
    });
  };
};