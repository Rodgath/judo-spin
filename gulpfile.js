const { src, dest, series, parallel, watch, task } = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

task('compress', () => {
  return src('src/*.js')
          .pipe(babel({
              presets: ['@babel/env']
          }))
          .pipe(uglify())
          .pipe(rename( {suffix: '.min'} ))
          .pipe(dest('dist'))
});