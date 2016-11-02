import Text from './text';

var interval;

export default function ( canvas, count, callback ) {
  const number = Number( count );

  count = Number.isInteger( count ) || number ? number : 3;

  const
    ctx = canvas.getContext('2d'),
    countDown = Text.setup({
      x: canvas.width/2,
      y: canvas.height/2,
      textAlign: "center",
      baseLine: "center",
      fontSize: 25,
      fontFamily: 'Arial',
      color: '#FFF'
    }),
    startTime = new Date().getTime();

  interval = window.setInterval(() => {
    const
      currTime = new Date().getTime(),
      text = count - Math.floor((currTime - startTime) / 1000);

    countDown.text = text;

    ctx.clearRect( 0, 0, canvas.width, canvas.height );
    countDown.draw( ctx );

    if (Number( text ) <= 0) {
      window.clearInterval( interval );
      callback();
    }
  }, 100);
}