const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const browserSync = require('browser-sync');
const runSequence = require('run-sequence');
const pug = require('gulp-pug');
const htmlbeautify = require('gulp-html-beautify');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concatFiles = require('gulp-concat');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const imagemin = require('gulp-imagemin');
const zip = require('gulp-zip');
const faker = require('faker');
const _ = require('lodash');
const moment = require('moment');
const reload = browserSync.reload;

const getPugData = () => {
  const data = require('./src/pug/local/data');
  delete require.cache[require.resolve('./src/pug/local/data')]; // prevent module caching

  return data;
};

const getPugUtil = () => {
  const util = require('./src/pug/local/util');
  delete require.cache[require.resolve('./src/pug/local/util')]; // prevent module caching

  return util;
};

const plumberErrorHandler = () =>
  plumber({
    errorHandler: err => {
      notify.onError({
        title: `Gulp error in ${err.plugin}`,
        message: err.toString(),
      })(err);
    },
  });

// pug
gulp.task('pug', () =>
  gulp
    .src('src/pug/*.pug')
    .pipe(plumberErrorHandler())
    .pipe(
      pug({
        locals: {
          data: getPugData(),
          util: getPugUtil(),
          moment,
          faker,
          _,
        },
      }),
    )
    .on('error', console.log)
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true })),
);

// htmlBeautify
gulp.task('htmlBeautify', () => {
  const options = { indentSize: 2 };

  return gulp
    .src('dist/*.html')
    .pipe(plumberErrorHandler())
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
});

// js
gulp.task('js', () =>
  gulp
    .src('src/js/app.js')
    .pipe(plumberErrorHandler())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(webpackStream(require('./webpack.config.js'), webpack))
    .pipe(gulp.dest('dist/script/'))
    .pipe(reload({ stream: true })),
);

// scss
gulp.task('scss', () =>
  gulp
    .src('src/scss/app.scss')
    .pipe(plumberErrorHandler())
    .pipe(
      sass({
        outputStyle: 'expanded',
      }).on('error', sass.logError),
    )
    .pipe(
      autoprefixer({
        browsers: ['> 1%'],
      }),
    )
    .pipe(gcmq())
    .pipe(gulp.dest('dist/style'))
    .pipe(reload({ stream: true })),
);

// pluginCSS
gulp.task('pluginCSS', () =>
  gulp
    .src('src/plugin/css/**/*.css')
    .pipe(concatFiles('plugin.css'))
    .pipe(gulp.dest('./dist/style'))
    .pipe(reload({ stream: true })),
);

// pluginJS
gulp.task('pluginJS', () =>
  gulp
    .src('src/plugin/js/**/*.js')
    .pipe(concatFiles('plugin.js'))
    .pipe(gulp.dest('dist/script'))
    .pipe(reload({ stream: true })),
);

// optimizeImg
gulp.task('optimizeImg', () =>
  gulp
    .src('dist/img/**/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng(),
        imagemin.svgo(),
      ]),
    )
    .pipe(gulp.dest('dist/img')),
);

// uglifyJS
gulp.task('uglifyJS', () =>
  gulp
    .src('dist/script/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/script')),
);

// cleanCSS
gulp.task('cleanCSS', () =>
  gulp
    .src('dist/style/*.css')
    .pipe(cleanCSS({ compatibility: 'ie9' }))
    .pipe(gulp.dest('dist/style')),
);

// zip
gulp.task('zip', () => {
  const projectName = require('./package.json').name;
  const archiveName = `${projectName}_${moment().format(
    'YYYY-MM-DD@hh:mm',
  )}).zip`;

  gulp
    .src(['dist/**/*', '!dist/**/favicon.ico'], {
      base: '.',
    })
    .pipe(zip(archiveName))
    .pipe(gulp.dest('./'));
});

// markup
gulp.task('markup', () => {
  runSequence('pug', 'htmlBeautify');
});

// style
gulp.task('style', ['scss']);

// script
gulp.task('script', ['js']);

// plugin
gulp.task('plugin', ['pluginJS', 'pluginCSS']);

// build
gulp.task('build', ['markup', 'style', 'script', 'plugin']);

// prod
gulp.task('prod', () => {
  runSequence('build', 'optimizeImg', 'uglifyJS', 'cleanCSS');
});

// default (watch)
gulp.task('default', ['build'], () => {
  browserSync({
    notify: false,
    port: 9000,
    logLevel: 'silent',
    server: {
      baseDir: ['dist'],
    },
  });

  gulp.watch(['src/pug/local/data.js', 'src/pug/local/util.js'], ['build']);
  gulp.watch('src/pug/**/*.pug', ['markup']);
  gulp.watch('src/scss/**/*.scss', ['style']);
  gulp.watch('src/js/**/*.js', ['script']);
  gulp.watch('src/plugin/js/**/*.js', ['pluginJS']);
  gulp.watch('src/plugin/css/**/*.css', ['pluginCSS']);
});
