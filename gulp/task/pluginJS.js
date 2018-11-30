import { src, dest } from 'gulp';
import concatFiles from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';

import plumberErrorHandler from '../plumberErrorHandler';

const pluginJS = () =>
  src('src/plugin/js/**/*.dev.js')
    .pipe(sourcemaps.init())
    .pipe(concatFiles('plugin.js'))
    .pipe(sourcemaps.write())
    .pipe(dest('dev/script'));

export default pluginJS;
