import { src, dest } from 'gulp';
import htmlbeautify from 'gulp-html-beautify';

import plumberErrorHandler from '../plumberErrorHandler';

const options = { indentSize: 2 };

const htmlBeautify = () =>
  src('dev/*.html')
    .pipe(plumberErrorHandler())
    .pipe(htmlbeautify(options))
    .pipe(dest('dev'));

export default htmlBeautify;
