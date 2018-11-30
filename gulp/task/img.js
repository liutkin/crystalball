import { src, dest } from 'gulp';
import imagemin from 'gulp-imagemin';

const img = () =>
  src('dev/img/**/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng(),
        imagemin.svgo(),
      ]),
    )
    .pipe(dest('dist/img'));

export default img;
