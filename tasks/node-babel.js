import gulp from 'gulp';
import babel from 'gulp-babel';
import sourcemasps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';

// use rename.

export default function () {
  return () => {
    return gulp.src(['server.js', 'lib/**/*.js'], { base: '.' })
      .pipe(sourcemasps.init())
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(uglify())
      .pipe(sourcemasps.write('.'))
      .pipe(gulp.dest('../build'));
  };
}