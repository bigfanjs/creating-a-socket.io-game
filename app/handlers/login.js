'use strict';

const
  crispy = require('crispy-string'),
  find = require('lodash/find'),
  includes = require('lodash/includes'),
  Picture = require('../../models').Picture;

const generateName = function ( len ) {
  return crispy.base32String(len || 10);
};

module.exports = function handleUserlogin(socket, io, groups, players) {
  socket.on('player', function ( player ) {
    var
      name = player.name,
      amount = player.playerNumbers,
      group;

    socket.player = player;
    players.push( name );

    const
      hasAmount = find(groups, ['amount', amount]),
      hasAnyAmount = find(groups, ['amount', 'any']),
      matchAny = amount.match( /any/i );

    if (groups.length === 0 || (!matchAny && !hasAmount)) {
      let groupName;

      do {
        groupName = generateName();
      } while (find(groups, ['name', groupName]));

      groups.push(group = {
        amount: amount,
        name: groupName,
        players: [{ name: name, id: socket.id }]
      });

      socket.groupName = groupName;
      socket.join( groupName );
    } else if ((group = (hasAnyAmount || hasAmount)) || matchAny) {
      /* If there is no group matching the coming player's amount
      and the player has any amount he's gonna join the first 
      wiating group. */
      group = group || groups[ 0 ];

      /* if there is already a group with "any" number
        of players. And the new player has "any" too,
        they are gonna play together and if
        otherwise, the group has to be renamed to
        the new player's amount. */
      if ( hasAnyAmount ) {
        group.amount = !matchAny ? amount : 2;
      }

      socket.groupName = group.name;
      socket.join( group.name );
      group.players.push({ name: name, id: socket.id });

      if (group.players.length === Number( group.amount )) {
        Picture.findOne({seenBy: { $nin: group.players }}, (err, picture) => {
          if ( err ) {
            io.to( group.name ).emit('error', { text: err });
            return;
          }

          Picture.findByIdAndUpdate(picture._id,
            {$set: { seenBy: group.players.map(obj => obj.id) }},
            { new: false },
            ( err, picture ) => {
              if ( err ) {
                io.to( group.name ).emit('error', { text: err });
                return;
              }

              io.to( group.name ).emit('start', {
                amount: group.amount,
                players: group.players,
                path: picture.path
              });
              groups.splice( groups.indexOf( group ), 1 );
            }
          );
        });

        return;
      }
    }

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
};