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
        test: /\.[js|ts]/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  mode,
};
