'use strict';

module.exports = function clickHandler(io, socket, pic) {
  var clicks = 0;

  socket.on('click', function listener(coordinates, width) {
    const {x, y} = coordinates;

    if (clicks < pic.clicks) {
      clicks += 1;

      const distances = [];

      for (let i = 0; i < pic.spots.length*2; i++) {
        const spot = pic.spots[ i%pic.spots.length ];

        var onSide2 = i >= pic.spots.length;

        const
          diff_x = (spot.x + (onSide2 ? width/2 : 0)) - x,
          diff_y = spot.y - y,
          dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

        if (dist <= 5) {
          if (onSide2) {spot.x += width/2;}
          distances.push({dist, spot});
        }
      }

      if (distances.length > 1) {
        const smallest = distances.reduce((pre, curr) => {
          const diff = pre.dist - curr.dist;

          if (diff < 0) {
            return pre;
          }

          return curr;
        });

        io.to(socket.groupName)
          .emit(
            'click:success',
            smallest.spot,
            socket.player
          );
        pic.spots.splice(pic.spots.indexOf(smallest.spot), 1);
      } else if (distances.length == 1) {
        io.to(socket.groupName)
          .emit(
            'click:success',
            distances[0].spot,
            socket.player
          );
        pic.spots.splice(pic.spots.indexOf(distances[0].spot), 1);
      }


      socket.emit('click', clicks);
    } else {
      socket.emit('block-clicks');
      socket.removeListener('click', listener);
    }
  });
};