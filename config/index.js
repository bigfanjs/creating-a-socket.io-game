'use strict';

const
  env = process.env.NODE_ENV || 'development',
  config = require('./conf.' + env);

module.exports = config;