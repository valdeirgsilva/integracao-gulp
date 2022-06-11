const { series, parallel, src, dest } = require('gulp');
const del = require('del');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const tsify = require('tsify');

function limparDist() {
  return del(['dist']);
}

function copiarHTML() {
  return src('public/**/*')
    .pipe(dest('dist'));
}

function gerarJS() {
  return browserify({
    basedir: '.',
    entries: ['src/main.ts']
  })
  .plugin(tsify)
  .bundle()
  .pipe(source('app.js'))
  .pipe(dest('dist'));
}

exports.default = series(
  limparDist,
  parallel(gerarJS, copiarHTML)
);
