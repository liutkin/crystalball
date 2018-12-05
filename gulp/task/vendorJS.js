import { src, dest } from 'gulp';
import concatFiles from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';

import plumberErrorHandler from '../plumberErrorHandler';

const vendorJS = () =>
  src('src/vendor/js/**/*.dev.js')
    .pipe(sourcemaps.init())
    .pipe(concatFiles('vendor.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dev/script'));

export default vendorJS;
