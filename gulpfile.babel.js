import gulp from 'gulp';

import bundle from './tasks/bundle';
import browserSync from './tasks/browser-sync';
import nodemon from './tasks/nodemon';
import testBrowser from './tasks/test-browser';
import nodeBabel from './tasks/node-babel';
import clean from './tasks/clean';
import runSequence from 'run-sequence';

gulp.task('bundle', bundle());
gulp.task('node-babel', nodeBabel());
gulp.task('nodemon', ['node-babel'], nodemon());
gulp.task('browserSync', browserSync());
gulp.task('test-browser', testBrowser());
gulp.task('clean', clean());

gulp.task('default', cb => {
  runSequence('clean', ['nodemon', 'browserSync', 'bundle'], cb);
});