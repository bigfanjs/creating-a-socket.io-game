'use strict';

module.exports = function ( mongoose, db ) {
  const schema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    level: Number,
    score: Number,
    diffs: Number,
    wins: Number,
    looses: Number,
    games: Number,
    ranking: Number,
    avatar: {
      name: String,
      path: String
    }
  });

  return db.model('user', schema);
};