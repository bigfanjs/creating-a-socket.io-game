import gulp from 'gulp';
import imageMin from 'gulp-imagemin';
// import cache from 'gulp-cache';

export default function () {
  return () => {
    gulp.src('./public/images/*')
      .pipe(imageMin())
      .pipe(gulp.dest('../build/public/images/'));
  };
}