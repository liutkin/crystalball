import { src, dest } from 'gulp';
import concatFiles from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

import addMinToBasename from '../addMinToBasename';

const buildPluginJS = () =>
  src('src/plugin/js/**/*.prod.js')
    .pipe(concatFiles('plugin.js'))
    .pipe(uglify())
    .pipe(rename(addMinToBasename))
    .pipe(dest('dist/script'));

export default buildPluginJS;
