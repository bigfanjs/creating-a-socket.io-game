import gulp from 'gulp';
import imageMin from 'gulp-imagemin';

export default function () {
  return () => {
    gulp.src('./public/images/**/*.+(png|jpg|gif|svg)')
      .pipe(imageMin())
      .pipe(gulp.dest('../build/public/images/'));
  };
}