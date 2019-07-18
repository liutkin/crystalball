import { src, dest } from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import mqpacker from 'css-mqpacker';

import plumberErrorHandler from '../plumberErrorHandler';
import { stream } from '../server';

const scss = () =>
  src('src/scss/app.scss')
    .pipe(plumberErrorHandler())
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded',
      }).on('error', sass.logError),
    )
    .pipe(autoprefixer())
    .pipe(postcss([mqpacker()]))
    .pipe(sourcemaps.write())
    .pipe(dest('dev/style'))
    .pipe(stream());

export default scss;
