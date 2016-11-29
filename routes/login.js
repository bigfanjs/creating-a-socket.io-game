'use strict';

exports.form = function (req, res, next) {
  res.render('login', {msg: req.flash('error'), title: 'Login'});
};

exports.submit = function (req, res, next) {
  const
    logger = req.user || req.admin,
    body = req.body;

  logger.authenticate(body.username, body.password, (err, user) => {
    if ( err ) return next( err );

    if ( user ) {
      req.session.uid = user._id;
      res.redirect( req.success );
    } else {
      req.flash('error', 'Sorry, invalid credantials!');
      res.redirect( req.failure );
    }
  });
};

exports.logout = function (req, res, next) {
  req.session.destroy(err => {
    if ( err ) return next( err );

    res.redirect('/login');
  });
};