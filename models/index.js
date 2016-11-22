'use strict';

const
  config = require('../config'),
  mongoose = require('mongoose'),
  db = mongoose.connect( config.db );

module.exports = {
  admin: require('./admin')(mongoose, db),
  user: require('./user')(mongoose, db),
  picture: require('./picture')(mongoose, db)
};