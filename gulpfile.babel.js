'use strict';

import { series, parallel, watch } from 'gulp';

import { reload, serve } from './gulp/server';

import cleanCSS from './gulp/task/cleanCSS';
import cleanDist from './gulp/task/cleanDist';
import cleanDistAssets from './gulp/task/cleanDistAssets';
import dist from './gulp/task/dist';
import htmlBeautify from './gulp/task/htmlBeautify';
import js from './gulp/task/js';
import optimizeImg from './gulp/task/optimizeImg';
import pluginCSS from './gulp/task/pluginCSS';
import pluginJS from './gulp/task/pluginJS';
import pug from './gulp/task/pug';
import scss from './gulp/task/scss';
import uglifyJS from './gulp/task/uglifyJS';
import archive from './gulp/task/archive';

const markup = series(pug, htmlBeautify);
const plugin = parallel(pluginJS, pluginCSS);
const build = parallel(markup, scss, js, plugin);

export const prod = series(
  build,
  dist,
  cleanDistAssets,
  optimizeImg,
  uglifyJS,
  cleanCSS,
);
export const zip = series(prod, archive);

const watchFiles = () => {
  watch(
    ['src/pug/local/data.js', 'src/pug/local/util.js'],
    series(build, reload),
  );
  watch('src/pug/**/*.pug', series(markup, reload));
  watch('src/scss/**/*.scss', series(scss));
  watch(['src/js/**/*.js', 'src/js/**/*.ts'], series(js, reload));
  watch('src/plugin/js/**/*.js', series(pluginJS, reload));
  watch('src/plugin/css/**/*.css', series(pluginCSS, reload));
};

export default series(cleanDist, build, serve, watchFiles);
