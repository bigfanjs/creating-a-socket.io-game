'use strict';

module.exports = function ( mongoose, db ) {
  const schema = new mongoose.Schema({
    diffs: Number,
    clicks: Number,
    spots: [{
      xPos: Number,
      yPos: Number
    }]
  });

  return db.model('picture', schema);
};