import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

export default () =>
  plumber({
    errorHandler: err => {
      notify.onError({
        title: `Gulp error in ${err.plugin}`,
        message: err.toString(),
      })(err);
    },
  });
