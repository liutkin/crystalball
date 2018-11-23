const mode = process.env.NODE_ENV;
const devtool = mode === 'development' ? 'eval-source-map' : false;

module.exports = {
  devtool,
  output: {
    filename: 'app.js',
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.ts/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    extensions: ['.ts', '.tsx', '.js'],
  },
  mode,
};
