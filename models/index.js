'use strict';

const
  config = require('../config'),
  mongoose = require('mongoose'),
  db = mongoose.connect(config.database.uri);

module.exports = {
  Admin: require('./admin')(mongoose, db),
  User: require('./user')(mongoose, db),
  Picture: require('./picture')(mongoose, db)
};