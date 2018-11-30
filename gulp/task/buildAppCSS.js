import { src, dest } from 'gulp';
import clean from 'gulp-clean-css';
import rename from 'gulp-rename';

import addMinToBasename from '../addMinToBasename';

const buildAppCSS = () =>
  src('dev/style/app.css')
    .pipe(clean({ compatibility: '*' }))
    .pipe(rename(addMinToBasename))
    .pipe(dest('dist/style'));

export default buildAppCSS;
