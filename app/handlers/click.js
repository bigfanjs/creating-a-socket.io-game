'use strict';

const Picture = require('../../models').Picture;

module.exports = function clickHandler(io, socket) {
  var clicks = 0;

  Picture.findById(socket.pic_id, function (err, picture) {
    if (err) {
      socket.emit('error', {text: err});
      return;
    }

    const pic = picture ? picture.toObject() : {};

    socket.on('click', function listener(coordinates) {
      const {x, y} = coordinates;

      if (clicks < pic.clicks) {
        clicks += 1;

        const distances = [];

        pic.spots.forEach(spot => {
          const
            diff_x = spot.x - x,
            diff_y = spot.y - y,
            dist = Math.sqrt(diff_x * diff_x + diff_y * diff_y);

          if (dist <= 5) { distances.push({dist, spot}); }
        });

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
              socket.player.name
            );
          pic.spots.splice(pic.spots.indexOf(smallest.spot), 1);
        } else if (distances.length == 1) {
          io.to(socket.groupName)
            .emit(
              'click:success',
              distances[0].spot,
              socket.player.name
            );
          pic.spots.splice(pic.spots.indexOf(distances[0].spot), 1);
        }


        socket.emit('click', clicks);
      } else {
        socket.emit('block-clicks');
        socket.removeListener('click', listener);
      }
    });
  });
};