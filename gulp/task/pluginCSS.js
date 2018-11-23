import { src, dest } from 'gulp';
import concatFiles from 'gulp-concat';

import plumberErrorHandler from '../plumberErrorHandler';

const pluginCSS = () =>
  src('src/plugin/css/**/*.css')
    .pipe(concatFiles('plugin.css'))
    .pipe(dest('dev/style'));

export default pluginCSS;
