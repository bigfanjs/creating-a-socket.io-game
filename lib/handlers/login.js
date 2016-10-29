'use strict';

const
  forEach = require('lodash/forEach'),
  find = require('lodash/find');

const GroupMaker = require('../group-maker');

const groups = [];

module.exports =  function handleUserlogin( socket, io, players ) {
  socket.on('player', function ( player ) {
    if ( players.indexOf( player.name ) === -1 ) {
      var
        name = player.name,
        amount = player.playerNumbers,
        group, groupName;

      socket.player = name;
      players.push( name );

      const
        hasAmount = find( groups, ['amount', amount] ),
        hasAnyAmount = find( groups, ['amount', 'any'] ),
        matchAny = amount.match( /any/i );

      if (groups.length === 0 || (!matchAny && !hasAmount)) {
        groupName = GroupMaker.createGroup();

        groups.push(group = {
          amount: amount,
          name: groupName,
          players: [{ name: name, id: socket.id }]
        });

        socket.join( groupName );
      } else if ((group = (hasAnyAmount || hasAmount)) || matchAny) {
        group = group || groups[ 0 ];

        /*
          if there is already a group with "any" number
          of players. And the new player has "any" too,
          they are gonna play together and if
          otherwise, the group has to be renamed to
          the new player's amount.
        */
        if ( hasAnyAmount ) {
          group.amount = amount = !matchAny ? amount : 2;
        }

        socket.join( group.name );
        group.players.push({ name: name, id: socket.id });
      }

      if (typeof amount !== 'string' && group.players.length === Number( amount )) {
        io.to( group.name ).emit('start', {
          amount: amount,
          players: group.players.map(obj => obj.name)
        });
        groups.splice( groups.indexOf( group ), 1 );
      } else {
        socket.emit('loginResult', {
          success: true,
          amount: amount
        });

        io.to( group.name ).emit('players', {
          amount: amount,
          players: group.players.map(obj => obj.name)
        });
      }

    } else {
      socket.emit('loginResult', {
        success: false,
        message: 'name is already taken'
      });
    }
  });
};