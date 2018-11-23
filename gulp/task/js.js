import { src, dest } from 'gulp';
import webpack from 'webpack-stream';

import plumberErrorHandler from '../plumberErrorHandler';

const js = () =>
  src(['src/js/app.ts', 'src/js/app.js'], { allowEmpty: true })
    .pipe(plumberErrorHandler())
    .pipe(webpack(require('../../webpack.config.js')))
    .pipe(dest('dev/script'));

export default js;
