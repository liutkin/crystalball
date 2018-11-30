import { src } from 'gulp';
import sizereport from 'gulp-sizereport';

const sizeJS = () =>
  src('dist/script/*.js').pipe(sizereport({ title: 'JavaScript', gzip: true }));

export default sizeJS;
