var webpack = require('webpack');

module.exports = {
  output: {
    path: __dirname + '/dist',
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      vue:
        process.env.NODE_ENV === 'production'
          ? 'vue/dist/vue.common.js'
          : 'vue/dist/vue.js'
    }
  },
  mode: process.env.NODE_ENV || 'development'
};
