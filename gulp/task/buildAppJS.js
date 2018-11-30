import { src, dest } from 'gulp';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

import addMinToBasename from '../addMinToBasename';

const buildAppJS = () =>
  src('dev/script/app.js')
    .pipe(uglify())
    .pipe(rename(addMinToBasename))
    .pipe(dest('dist/script'));

export default buildAppJS;
