'use strict';

// requiring third-party modules:
const
  http = require('http'),
  path = require('path'),
  express = require('express'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  flash = require('connect-flash');

// requiring built-in modules:
const
  userMiddleware = require('./lib/middleware/user'),
  adminMiddleware = require('./lib/middleware/admin');

const
  spotDiff = require('./app/spot-diff'),
  app = express(),
  server = http.createServer( app ),
  join = path.join;

// routes:
const
  login = require('./routes/login'),
  pictures = require('./routes/pictures'),
  profile = require('./routes/profile'),
  register = require('./routes/register');

// configuring express:
app.set('view engine', 'jade');
app.set('views', path.resolve(__dirname, './views'));

// adding third-party middleware to the stack:
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride());
app.use(cookieParser('my secret code'));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'my secret code'
}));
app.use(flash());
app.use(express.static(join(__dirname, './public')));

// adding built-in middleware to the stack:
app.use('/login', userMiddleware.provideUser());
app.use('/admin/login', adminMiddleware.provideAdmin());
app.use('/profile', userMiddleware.isAuthenticated());
app.use('/session', userMiddleware.isAuthenticated());
app.use('/admin/pictures/', adminMiddleware.isAuthenticated());

app.get('/', (req, res, next) => {
  const uid = req.session.uid;

  if (uid) {
    res.redirect('/profile/view');
  } else {
    res.redirect('/login');
  }
});

app.get('/session', function (req, res, next) {
  res.status(200).json( req.user );
});

app.get('/login', login.form);
app.post('/login', login.submit);
app.get('/logout', login.logout);

app.get('/admin/login', login.form);
app.post('/admin/login', login.submit);
app.get('/admin/logout', login.logout);

app.get('/signup', register.form);
app.post('/signup', register.signup);

app.get('/profile', profile.profile);
app.get('/profile/edit', profile.form);
app.get('/profile/play', profile.play);
app.put('/profile/edit/', profile.edit);
app.delete('/profile', profile.remove);

app.get('/admin/login', login.form);
app.post('/admin/login', login.submit);
app.get('/admin/logout', login.logout);

app.get('/admin', function (req, res) {
  res.redirect('/admin/pictures');
});
app.get('/admin/pictures', pictures.showPictures);
app.get('/admin/pictures/view/:id', pictures.viewPicture);
app.get('/admin/pictures/new', pictures.form);
app.post('/admin/pictures/new', pictures.createPicture);
app.get('/admin/pictures/edit/:id', pictures.form);
app.put('/admin/pictures/edit/:id', pictures.updatePicture);
app.delete('/admin/pictures/view/:id', pictures.deletePicture);

server.listen(3000, function () {
  console.log('listening on port 3000');
});

spotDiff( server );