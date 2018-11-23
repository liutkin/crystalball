import { src, dest } from 'gulp';
import imagemin from 'gulp-imagemin';

const optimizeImg = () =>
  src('dist/img/**/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng(),
        imagemin.svgo(),
      ]),
    )
    .pipe(dest('dist/img'));

export default optimizeImg;
