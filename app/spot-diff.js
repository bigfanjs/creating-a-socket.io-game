'use strict';

// requiring third-party modules:
const
  socketio = require('socket.io'),
  crispy = require('crispy-string'),
  find = require('lodash/find'),
  remove = require('lodash/remove'),
  difference = require('lodash/difference'),
  intersection = require('lodash/intersection');

// requiring handlers.
const
  handleUserlogin = require('./handlers/login'),
  handleUserClicks = require('./handlers/click'),
  handleGameStart = require('./handlers/game-start'),
  handleDisconnection = require('./handlers/user-disconnect');

const Picture = require('../models').Picture;

const players = [];

var queue = [];

const
  generateName = function ( len ) {
    return crispy.base32String(len || 10);
  },
  findPicture = function (pictures, sockets) {
    var result;

    const ids = sockets.map(socket => {
      return socket.player.id;
    });

    for (let i=0; i < pictures.length; i++) {
      const picture = pictures[i].toObject();

      if (intersection(picture.seenBy, ids).length == 0) {
        result = picture;
        break;
      }
    }

    return result;
  },
  createGroup = function (io, amount, sockets, picture) {
    var name;

    const groupNames = Object.keys(io.sockets.adapter.rooms);

    do {
      name = generateName();
    } while (find(groupNames, ['name', name]));

    const group = { name, amount, sockets, url: picture.url};

    return group ;
  },
  findMatching = function (io, pictures) {
    var group, sockets = queue.slice(0);

    const fn = function (b, player, socket) {
      return (b && socket.player.competitors_num.match(/any/i)) ||
        socket.player.competitors_num === player.competitors_num;
    };

    const
      picture = findPicture.bind(null, pictures),
      anies = [];

    for (let i = 0; i < sockets.length; i++) {
      const
        socket = sockets[ i ],
        next = sockets[i+1],
        amount = socket.player.competitors_num;

      console.log(queue);

      if (amount.match(/^any/i)) {
        let pic;

        anies.push(socket);

        if (anies.length > 1 &&
            (!next || !next.player.amount.match(/any/i)) &&
            (pic=picture(anies))
          ) {
          group = createGroup(io, anies.length, anies, pic);
          queue = difference(queue, anies);
          // console.log(queue);
          break;
        } else continue;
      }

      const result = sockets
        .filter(fn.bind(null, true, socket.player))
        .slice(0, amount);

      let pic;

      if (result.length === amount && (pic=picture(result))) {
        console.log('matching found!');
        group = createGroup(io, amount, result, pic);
        queue = difference(queue, result);
        break;
      } else {
        remove(sockets, fn.bind(null, false, socket.player));
        i = i - 1;
      }
    }

    return group;
  };

module.exports =  function ( server ) {
  const io = socketio.listen( server );

  Picture.find((err, pictures) => {
    if (err) { throw err; }

    (function timer() {
      const group = findMatching(io, pictures);

      if (typeof group !== 'undefined') {
        const
          sockets = group.sockets,
          name = group.name;

        if (intersection(queue, sockets).length == sockets.length) {
          sockets.forEach(socket => {
            socket.groupName = name;
            socket.join(name);
          });

          io.to(name).emit('start', {
            amount: group.amount,
            url: group.url,
            players: sockets.map(socket => socket.player)
          });
        }
      }

      setTimeout(timer, 1000);
    })();
  });

  io.on('connection', function ( socket ) {
    handleUserlogin(socket, queue, players);
    handleUserClicks(socket);
    handleGameStart(socket);
    handleDisconnection(socket, io, queue);
  });
};