'use strict';

module.exports = function ( mongoose, db ) {
  const schema = new mongoose.Schema({
    name: String,
    password: String
  });

  db.model('user', schema);
};