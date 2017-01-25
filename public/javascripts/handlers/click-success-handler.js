import Body from '../lib/body';
import Text from '../lib/text';

export default function (socket, drawings, layout) {
  socket.on('click:success', (spot, clicker) => {
    const circle = Body.setup({
      borderColor: 'lightgreen',
      radius: 10,
      border: true,
      fill: false,
      lineWidth: 2,
      opacity: 0.7,
      x: spot.x,
      y: spot.y + 50
    });

    const text = Text.setup({
      text: clicker.name,
      x: spot.x + 13,
      y: spot.y + 50,
      color: 'lightgreen',
      fontSize: 10
    });

    drawings.push(text.draw.bind(text));
    drawings.push(circle.draw.bind(circle));

    const players = layout.regions['players'].view;

    players.forEach(player => {
      if (Body.isPrototypeOf( player )) return;

      if (player.id === clicker.id) {
        player.text = `${ clicker.name }(${ player.spots++ })`;
      }
    });
  });
}