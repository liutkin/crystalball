import { src, dest } from 'gulp';
import concatFiles from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';

import plumberErrorHandler from '../plumberErrorHandler';

const pluginCSS = () =>
  src('src/plugin/css/**/*.dev.css')
    .pipe(sourcemaps.init())
    .pipe(concatFiles('plugin.css'))
    .pipe(sourcemaps.write())
    .pipe(dest('dev/style'));

export default pluginCSS;
