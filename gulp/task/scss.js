import { src, dest } from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import gcmq from 'gulp-group-css-media-queries';
import sourcemaps from 'gulp-sourcemaps';

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
    .pipe(
      autoprefixer({
        browsers: ['> 1%'],
      }),
    )
    .pipe(gcmq())
    .pipe(sourcemaps.write())
    .pipe(dest('dev/style'))
    .pipe(stream());

export default scss;
