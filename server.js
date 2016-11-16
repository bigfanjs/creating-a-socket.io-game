'use strict';

const
  http = require('http'),
  path = require('path'),
  express = require('express');

const spotDiff = require('./app/spot-diff');

const
  app = express(),
  server = http.createServer( app );

app.use(express.static(path.join(__dirname, './public')));

server.listen(3000, function () {
  console.log('listening on port 3000');
});

app.get('/api/picture', function ( req, res ) {

});

spotDiff( server );