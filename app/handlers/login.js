'use strict';

const
  forEach = require('lodash/forEach'),
  find = require('lodash/find');

const GroupMaker = require('../../lib/group-maker');

const groups = [];

module.exports =  function handleUserlogin( socket, io, players ) {
  socket.on('player', function ( player ) {
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
      /* If there is no group matching the coming player's amount
      and the player has any amount he's gonna join the first 
      wiating group*/
      group = group || groups[ 0 ];

      if (find( group.players, ['name', name] )) {
        socket.emit('loginResult', {
          success: false,
          message: 'The Name is alrady taken!'
        });

        return;
      }

      /*
        if there is already a group with "any" number
        of players. And the new player has "any" too,
        they are gonna play together and if
        otherwise, the group has to be renamed to
        the new player's amount.
      */
      if ( hasAnyAmount ) {
        group.amount = !matchAny ? amount : 2;
      }

      socket.join( group.name );
      group.players.push({ name: name, id: socket.id });

      if ( group.players.length === Number( group.amount ) ) {
        io.to( group.name ).emit('start', {
          amount: group.amount,
          players: group.players
        });
        groups.splice( groups.indexOf( group ), 1 );

        return;
      }
    }

    socket.emit('loginResult', {
      success: true,
      amount: amount
    });

    io.to( group.name ).emit('players', {
      amount: amount,
      players: group.players.map(obj => obj.name)
    });

    // socket.emit('loginResult', {
    //   success: false,
    //   message: 'name is already taken'
    // });
  });
};