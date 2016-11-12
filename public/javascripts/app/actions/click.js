import Body from '../../lib/body';

const mouse = {x: 0, y: 0};

export default function ( canvas, actions ) {
  const circle = Body.setup({
    color: 'red',
    border: true,
    fill: false,
    lineWidth: 5
  });

  canvas.addEventListener('click', function ( e ) {
    const rect = canvas.getBoundingClientRect();

    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    circle.setPos( mouse );

    actions.push( circle );
  }, false);
}