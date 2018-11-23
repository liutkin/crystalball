import { src, dest } from 'gulp';
import zip from 'gulp-zip';
import moment from 'moment';
import del from 'del';

const archive = () => {
  const projectName = require('../../package.json').name;
  const archiveName = `${projectName}_${moment().format(
    'YYYY-MM-DD@hh:mm',
  )}).zip`;

  return src(['dist/**/*'], {
    base: '.',
  })
    .pipe(zip(archiveName))
    .pipe(dest('./'));
};

export default archive;
