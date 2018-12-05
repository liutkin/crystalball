import { src, dest } from 'gulp';
import concatFiles from 'gulp-concat';
import clean from 'gulp-clean-css';
import rename from 'gulp-rename';

import addMinToBasename from '../addMinToBasename';

const buildVendorCSS = () =>
  src('src/vendor/css/**/*.prod.css')
    .pipe(concatFiles('vendor.css'))
    .pipe(clean({ level: { 1: { specialComments: 0 } } }))
    .pipe(rename(addMinToBasename))
    .pipe(dest('dist/style'));

export default buildVendorCSS;
