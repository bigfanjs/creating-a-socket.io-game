'use strict';

const
  PlayerModel = require('../models').User,
  User = require('../lib/user');

module.exports = function () {
  return (req, res, next) => {
    const player = User.create({Model: PlayerModel});

    req.someone = player;
  };
};