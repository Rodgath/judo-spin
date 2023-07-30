const { src, dest, series, parallel, watch, task } = require('gulp');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const rename = require('gulp-rename');

const compressJs = () => {
  return src('src/*.js')
        .pipe(dest('./demo/js')) // Send original script file to /demo
        .pipe(dest('./dist/js')) // Send original script file to /dist
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(rename( { suffix: '.min' } ))
        .pipe(dest('./demo/js'))
        .pipe(dest('./dist/js'))
}

const watchTask = () => {
  watch(['./src/*.js', './demo/*.html'], { events: 'all' }, compressJs)
}

task('compress:js', compressJs);

task('watch', watchTask);

exports.default = compressJs;