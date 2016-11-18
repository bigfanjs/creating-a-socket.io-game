'use strict';

const
  http = require('http'),
  path = require('path'),
  express = require('express');

const spotDiff = require('./app/spot-diff');

const
  app = express(),
  server = http.createServer( app );

// routes:
const
  login = require('./routes/login'),
  pictures = require('./routes/pictures');

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, './public')));

app.get('/api/pictures', pictures.showPictures);
app.get('/api/pictures/:id', pictures.viewPicture);
app.post('/api/pictures', pictures.createPicture);
app.put('/api/pictures/:id', pictures.updatePicture);
app.delete('/api/pictures/:id', pictures.deletePicture);

app.get('/admin/login', login.form);
app.post('/admin/login', login.submit);
app.get('/admin/logout', login.logout);

server.listen(3000, function () {
  console.log('listening on port 3000');
});

spotDiff( server );