'use strict';

module.exports = {
  development: {
    url: 'http://spotty.com',
    database: {
      db: 'mongodb://127.0.0.1/spot-diff-game'
    },
    server: {
      host: '127.0.0.1',
      port: '3000'
    },
    admin: {
      name: 'Adel',
      password: '123456'
    }
  }
};