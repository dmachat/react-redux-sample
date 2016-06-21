var path = require('path');
var webpack = require('webpack');

var nodeEnv = process.env.NODE_ENV || 'development';
var isProd = nodeEnv === 'production';

var productionPlugins = require('./config/production-plugins');
var developmentPlugins = require('./config/development-plugins');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './app/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
	plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    })
  ].concat(isProd ? productionPlugins : developmentPlugins),
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel?cacheDirectory&presets=["es2015","stage-0","react"]'],
      include: path.join(__dirname, 'app'),
    }],
  }
};
