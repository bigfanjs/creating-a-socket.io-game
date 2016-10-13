import gulp from 'gulp';
import mocha from 'gulp-mocha';

export default function () {
  return () => {
    gulp.src('./test/.js')
      .pipe(mocha());
  };
}