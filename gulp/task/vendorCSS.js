import { src, dest } from 'gulp';
import concatFiles from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';

import plumberErrorHandler from '../plumberErrorHandler';

const vendorCSS = () =>
  src('src/vendor/css/**/*.dev.css')
    .pipe(sourcemaps.init())
    .pipe(concatFiles('vendor.css'))
    .pipe(sourcemaps.write())
    .pipe(dest('dev/style'));

export default vendorCSS;
