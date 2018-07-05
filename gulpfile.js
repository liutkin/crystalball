var gulp = require('gulp');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var pug = require('gulp-pug');
var htmlbeautify = require('gulp-html-beautify');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var concatFiles = require('gulp-concat');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var gcmq = require('gulp-group-css-media-queries');
var imagemin = require('gulp-imagemin');
var svgSprite = require('gulp-svg-sprite');
var zip = require('gulp-zip');
var faker = require('faker');
var reload = browserSync.reload;

var getConfig = function() {
  var config = require('./config');
  delete require.cache[require.resolve('./config')]; // prevent module caching

  return config;
};

// pug
gulp.task('pug', function() {
  return gulp
    .src('src/pug/*.pug')
    .pipe(
      pug({
        locals: {
          faker: faker,
          config: getConfig()
        }
      })
    )
    .on('error', console.log)
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
});

// htmlBeautify
gulp.task('htmlBeautify', function() {
  var options = {
    indentSize: 2
  };

  return gulp
    .src('dist/*.html')
    .pipe(htmlbeautify(options))
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
});

// js
gulp.task('js', function() {
  return gulp
    .src('src/js/app.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(webpackStream(require('./webpack.config.js'), webpack))
    .pipe(gulp.dest('dist/script/'))
    .pipe(reload({ stream: true }));
});

// scss
gulp.task('scss', function() {
  return gulp
    .src('src/scss/app.scss')
    .pipe(
      sass({
        outputStyle: 'expanded'
      }).on('error', sass.logError)
    )
    .pipe(
      autoprefixer({
        browsers: ['> 1%']
      })
    )
    .pipe(gcmq())
    .pipe(gulp.dest('dist/style'))
    .pipe(reload({ stream: true }));
});

// pluginCSS
gulp.task('pluginCSS', function() {
  return gulp
    .src('src/plugin/css/**/*.css')
    .pipe(concatFiles('plugin.css'))
    .pipe(gulp.dest('./dist/style'))
    .pipe(reload({ stream: true }));
});

// pluginJS
gulp.task('pluginJS', function() {
  return gulp
    .src('src/plugin/js/**/*.js')
    .pipe(concatFiles('plugin.js'))
    .pipe(gulp.dest('dist/script'))
    .pipe(reload({ stream: true }));
});

// optimizeImg
gulp.task('optimizeImg', function() {
  return gulp
    .src('dist/img/**/*')
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng(),
        imagemin.svgo()
      ])
    )
    .pipe(gulp.dest('dist/img'));
});

// svgSprite
gulp.task('svgSprite', function() {
  return gulp
    .src('dist/img/svg-sprite/**/*.svg')
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            dest: '',
            sprite: 'svg-sprite.svg'
          }
        }
      })
    )
    .pipe(gulp.dest('dist/img'));
});

// uglifyJS
gulp.task('uglifyJS', function() {
  return gulp
    .src('dist/script/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/script'));
});

// cleanCSS
gulp.task('cleanCSS', function() {
  return gulp
    .src('dist/style/*.css')
    .pipe(cleanCSS({ compatibility: 'ie9' }))
    .pipe(gulp.dest('dist/style'));
});

// zip
gulp.task('zip', function() {
  var projectName = require('./package.json').name;

  var getTimestamp = function() {
    var now = new Date();

    return (
      now.getDate() +
      '.' +
      (now.getMonth() + 1) +
      '.' +
      now.getFullYear() +
      '@' +
      now.getHours() +
      '-' +
      now.getMinutes()
    );
  };
  gulp
    .src(['dist/**/*', '!dist/**/favicon.ico', '!dist/**/robots.txt'], {
      base: '.'
    })
    .pipe(zip(projectName + '(' + getTimestamp() + ').zip'))
    .pipe(gulp.dest('./'));
});

// markup
gulp.task('markup', function() {
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
gulp.task('prod', function() {
  runSequence('build', 'optimizeImg', 'uglifyJS', 'cleanCSS', 'svgSprite');
});

// default (watch)
gulp.task('default', ['build'], function() {
  browserSync({
    notify: false,
    port: 9000,
    logLevel: 'silent',
    server: {
      baseDir: ['dist']
    }
  });

  gulp
    .watch(['dist/*.html', 'dist/style/**/*.css', 'dist/script/*.js'])
    .on('change', reload);

  gulp.watch('config.js', ['build']);
  gulp.watch('src/pug/**/*.pug', ['markup']);
  gulp.watch('src/scss/**/*.scss', ['style']);
  gulp.watch('src/js/**/*.js', ['script']);
  gulp.watch('src/plugin/js/**/*.js', ['pluginJS']);
  gulp.watch('src/plugin/css/**/*.css', ['pluginCSS']);
});
