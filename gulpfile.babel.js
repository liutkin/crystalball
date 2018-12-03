'use strict';

import { series, parallel, watch } from 'gulp';

import { reload, serve } from './gulp/server';

import cleanDist from './gulp/task/cleanDist';
import dist from './gulp/task/dist';
import htmlBeautify from './gulp/task/htmlBeautify';
import js from './gulp/task/js';
import img from './gulp/task/img';
import pluginCSS from './gulp/task/pluginCSS';
import pluginJS from './gulp/task/pluginJS';
import pug from './gulp/task/pug';
import scss from './gulp/task/scss';
import archive from './gulp/task/archive';
import buildAppJS from './gulp/task/buildAppJS';
import buildAppCSS from './gulp/task/buildAppCSS';
import buildPluginJS from './gulp/task/buildPluginJS';
import buildPluginCSS from './gulp/task/buildPluginCSS';
import sizeJS from './gulp/task/sizeJS';
import sizeCSS from './gulp/task/sizeCSS';

const markup = series(pug, htmlBeautify);
const plugin = parallel(pluginJS, pluginCSS);
const dev = parallel(markup, scss, js, plugin);
const build = series(
  parallel(img, buildAppJS, buildAppCSS, buildPluginJS, buildPluginCSS),
  parallel(sizeJS, sizeCSS),
);

export const prod = series(dev, dist, build);
export const zip = series(prod, archive);

const watchFiles = () => {
  watch(
    ['src/pug/local/data.js', 'src/pug/local/util.js'],
    series(dev, reload),
  );
  watch('src/pug/**/*.pug', series(markup, reload));
  watch('src/scss/**/*.scss', series(scss));
  watch(['src/js/**/*.js', 'src/js/**/*.ts'], series(js, reload));
  watch('src/plugin/js/**/*.js', series(pluginJS, reload));
  watch('src/plugin/css/**/*.css', series(pluginCSS, reload));
};

export default series(cleanDist, dev, serve, watchFiles);
