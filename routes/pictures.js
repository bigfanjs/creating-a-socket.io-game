'use strict';

const Picture = require('../models/').picture;

exports.showPictures = function (req, res, next) {
  Picture.find((err, movies) => {
    if ( err ) return next( err );

    res.json( movies );
  });
};

exports.viewPicture = function (req, res, next) {
  Picture.find({ _id: req.params.id }, (err, movie) => {
    if ( err ) {
      res.status( 404 ).json('Not Found!');
      return next( err );
    }

    res.json( movie );
  });
};

exports.createPicture = function (req, res, next) {
  Picture.create((err, movie) => {
    if ( err ) return next( err );

    res.json( movie );
  });
};

exports.updatePicture = function (req, res, next) {
  Picture.update(
    { _id: req.params.id },
    req.body,
    { multi: false },
    (err, movie) => {
      if ( err ) return next( err );

      res.json( movie );
    }
  );
};

exports.deletePicture = function (req, res, next) {
  Picture.remove({ _id: req.params.id }, (err, movie) => {
    if ( err ) return next( err );

    res.json( movie );
  });
};