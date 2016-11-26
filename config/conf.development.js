'use strict';

const config = require('./conf.global');

config.env = 'development';
config.database = {
  uri: 'mongodb://127.0.0.1/spot-diff-game'
};

module.exports = config;