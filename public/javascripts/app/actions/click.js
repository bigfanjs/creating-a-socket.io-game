import Body from '../../lib/body';

const mouse = {x: 0, y: 0};

export default function ( canvas, actions ) {
  canvas.addEventListener('click', function ( e ) {
    const
      circle = Body.setup({
        borderColor: 'red',
        border: true,
        fill: false,
        lineWidth: 2,
        opacity: 1
      }),
      rect = canvas.getBoundingClientRect();

    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    circle.setPos( mouse );

    actions.push( circle );
  }, false);
}