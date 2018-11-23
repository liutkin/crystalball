import { src, dest } from 'gulp';
import pugJS from 'gulp-pug';
import moment from 'moment';
import faker from 'faker';
import _ from 'lodash';

import plumberErrorHandler from '../plumberErrorHandler';
import getPugData from '../getPugData';
import getPugUtil from '../getPugUtil';

const envSuffix = process.env.NODE_ENV === 'production' ? '.min' : '';

const pug = () =>
  src('src/pug/*.pug')
    .pipe(plumberErrorHandler())
    .pipe(
      pugJS({
        locals: {
          envSuffix,
          data: getPugData(),
          util: getPugUtil(),
          moment,
          faker,
          _,
        },
      }),
    )
    .on('error', console.log)
    .pipe(dest('dev'));

export default pug;
