let path = require('path');

module.exports = {
  entry: './src/client/index.js',
  output: {
    filename: 'coding-test.js',
    path: path.resolve(__dirname, 'assets/scripts'),
  },
  module: {
    loaders: [{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/}],
  },
};
