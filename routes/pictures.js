'use strict';

const Picture = require('../models/').Picture;

exports.showPictures = function (req, res, next) {
  Picture.find((err, pictures) => {
    if ( err ) return next( err );

    res.render('pictures', { pictures });
  });
};

exports.form = function (req, res, next) {
  const id = req.prams.id;

  if ( id ) {
    Picture.findOne({ _id: id }, (err, picture) => {
      if ( err ) return next( err );

      res.render('picture-form', { picture });
    });
  } else {
    res.render('picture-form');
  }

};

exports.viewPicture = function (req, res, next) {
  Picture.find({ _id: req.params.id }, (err, picture) => {
    if ( err ) {
      res.status( 404 ).json('Not Found!');
      return next( err );
    }

    res.render('picture', { picture });
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