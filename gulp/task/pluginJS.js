import { src, dest } from 'gulp';
import concatFiles from 'gulp-concat';

import plumberErrorHandler from '../plumberErrorHandler';

const pluginJS = () =>
  src('src/plugin/js/**/*.dev.js')
    .pipe(concatFiles('plugin.js'))
    .pipe(dest('dev/script'));

export default pluginJS;
