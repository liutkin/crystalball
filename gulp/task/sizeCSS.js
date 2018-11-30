import { src } from 'gulp';
import sizereport from 'gulp-sizereport';

const sizeCSS = () =>
  src('dist/style/*.css').pipe(sizereport({ title: 'CSS', gzip: true }));

export default sizeCSS;
