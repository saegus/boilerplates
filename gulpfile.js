const Gulp = require('gulp');
const ChildProcess = require('child_process');
const exec = command =>
  new Promise((resolve, reject) => ChildProcess.exec(command, (err) => {
    if (err) reject(err);
    else resolve();
  }))
;

Gulp.task('php', () =>
  exec('./Transphpile/bin/transphpile transpile src --dest tmp')
  .then(() => exec('rm -R dist'))
  .then(() => exec('mv tmp/src dist'))
  .then(() => exec('rmdir tmp'))
  .catch(err => console.log(err))
);

Gulp.task('default', ['php'], () => {
  Gulp.watch('./src/**/*.php', ['php']);
});
