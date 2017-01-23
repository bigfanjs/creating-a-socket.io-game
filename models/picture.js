'use strict';

module.exports = function ( mongoose, db ) {
  const schema = new mongoose.Schema({
    url: String,
    diffs: Number,
    clicks: Number,
    spots: [{
      x: Number,
      y: Number
    }]
  });

  return db.model('picture', schema);
};