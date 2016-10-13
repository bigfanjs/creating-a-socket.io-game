import browserSync from 'browser-sync';

export const bs = browserSync.create();
export default function () {
  return () => {
    bs.init({
      baseDir: 'public/',
      files: [
        './javascripts/apps/**/*.js',
        './javascripts/lib/**/*.js',
        './javascripts/*.js',
        './*.html'
      ],
      proxy: 'http://localhost:3000',
      port: 5000
    });
  };
}