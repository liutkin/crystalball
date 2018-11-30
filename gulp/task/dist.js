import { src, dest } from 'gulp';

const dist = () =>
  src([
    'dev/**/*',
    '!dev/img/**/*',
    '!dev/script/**/*',
    '!dev/style/**/*',
    '!dev/**/favicon.ico',
  ]).pipe(dest('dist'));

export default dist;
