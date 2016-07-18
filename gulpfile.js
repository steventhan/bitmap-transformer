const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

var testFiles = ['test/**/*.js'];
var appFiles = ['lib/**/*.js', 'bin/bitmap'];
var eslintRules = {
  rules: {
    'no-console': 0,
    indent: [2, 2, {SwitchCase: 1}],
    quotes: [2, 'single'],
    'linebreak-style': [2, 'unix'],
    semi: [2, 'always']
  },
  envs: ['node', 'es6'],
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      impliedStrict: true,
      modules: true
    }
  },
  extends: 'eslint:recommended'
};

gulp.task('lint:app', () => {
  gulp.src(appFiles)
    .pipe(eslint(eslintRules))
    .pipe(eslint.format());
});

gulp.task('lint:test', () => {
  gulp.src(testFiles)
    .pipe(eslint(eslintRules))
    .pipe(eslint.format());
});

gulp.task('mocha', () => {
  gulp.src(testFiles)
    .pipe(mocha());
});

gulp.task('lintWatcher', () => {
  var lintWatcher = gulp.watch(['*/**/*.*', '!package.json'], ['lint']);
  lintWatcher.on('change', (event) => {
    console.log('File ' + event.path +  ' change detected, running task....');
  });
});

gulp.task('lint', ['lint:app', 'lint:test']);

gulp.task('default', ['lint', 'mocha', 'lintWatcher']);
