import { src, dest } from 'gulp';

const dist = () => src(['dev/**/*', '!dev/**/favicon.ico']).pipe(dest('dist'));

export default dist;
