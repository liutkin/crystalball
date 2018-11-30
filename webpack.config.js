const devtool =
  process.env.NODE_ENV === 'development' ? 'eval-source-map' : false;

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
    extensions: ['.ts', '.tsx', '.js'],
  },
  mode: process.env.NODE_ENV,
};
