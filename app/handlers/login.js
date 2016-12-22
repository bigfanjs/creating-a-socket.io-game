'use strict';

const
  crispy = require('crispy-string'),
  find = require('lodash/find'),
  difference = require('lodash/difference'),
  intersection = require('lodash/intersection'),
  Picture = require('../../models').Picture;

const
  generateName = function ( len ) {
    return crispy.base32String(len || 10);
  },
  findPicture = function (pictures, players) {
    return pictures.forEach(picture => {
      const ids = players.map(player => player._id);

      if (intersection(picture.seenBy, ids).length === 0) {
        return picture;
      }
    });
  },
  addToQueue = function (socket, queue, player) {
    queue.push({
      player: player,
      amount: player.competitors_num,
      id: socket.id
    });
  },
  createGroup = function (groups, amount, players, picture) {
    var name;

    do {
      name = generateName();
    } while (find(groups, ['name', name]));

    const group = { name, amount, players, url: picture.url};

    return group ;
  },
  findMatching = function findMatching(queue, groups, pictures) {
    var group, players = queue.slice(0);

    const fn = function (b, p1, p2) {
      return (b && p2.amount.match(/any/i)) ||
        p2.amount === p1.amount;
    };

    const anies = [];

    for (let i = 0; i < players.length; i++) {
      const
        player = players[ i ],
        next = player[i+1],
        amount = player.amount,
        picture = findPicture.bind(null, pictures);

      if (amount.match(/^any/i)) {
        let pic;

        anies.push(player);

        if (anies.length > 1           &&
            !next.amount.match(/any/i) &&
            (pic=picture(anies))
          ) {
          console.log('match found!');
          group = createGroup(groups, anies.length, anies, pic);
          queue = difference(queue, anies);
          break;
        } else continue;
      }

      const result = players
        .filter(fn.bind(null, true, player))
        .slice(0, amount);

      let pic;

      if (result.length === amount && (pic=picture(result))) {
        console.log('matching found!');
        group = createGroup(groups, amount, result, pic);
        queue = difference(queue, result);
        break;
      } else {
        players = players.filter(fn.bind(null, false, player));
        i = i - 1;
      }
    }

    return group;
  };

module.exports = function handleUserlogin(socket, io, queue, players) {
  Picture.find({}, (err, pictures) => {
    if ( err ) { throw err; }

    (function timer() {
      const group = findMatching(queue, pictures);

      if (typeof group !== 'undefined') {
        socket.emit('start', group);
      }

      setTimeout(timer, 1000);
    })();

    socket.on('player', function ( player ) {
      var
        name = player.name,
        amount = player.competitors_num;

      socket.player = player;
      players.push( name );

      addToQueue(socket, queue, player);

      socket.emit('loginResult', {
        success: true,
        amount: amount
      });

      io.to( group.name ).emit('players', {
        amount: amount,
        players: group.players.map(obj => obj.name),
        avatar: player.avatar
      });
    });
  });
};