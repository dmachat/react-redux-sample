var path = require('path');
var webpack = require('webpack');

var nodeEnv = process.env.NODE_ENV || 'development';
var isProd = nodeEnv === 'production';

var productionPlugins = require('./config/production-plugins');
var developmentPlugins = require('./config/development-plugins');

var entry = isProd ?
  [
    './app/index'
  ] :
  {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './app/index',
    ],
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'react-router-redux',
      'redux-thunk',
    ],
  };

var plugins = [
  new webpack.ProvidePlugin({
    React: 'react',
  }),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
  }),
].concat(isProd ? productionPlugins : developmentPlugins);

var assetPath = isProd ?
  'http://localhost:8080/dist/' :
  '/dist/';

module.exports = {
  target: 'web',
  devtool: isProd ? 'hidden-source-map' : 'source-map',
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: assetPath,
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      path.resolve('./client'),
      'node_modules'
    ]
  },
  plugins: plugins,
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.join(__dirname, 'app'),
      query: {
        presets: ['es2015', 'stage-0', 'react'],
        cacheDirectory: true,
        env: {
          development: {
            plugins: ['react-hot-loader/babel'],
          },
        },
      },
    }],
  }
};
