var webpack = require('webpack');

module.exports = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
    },
    output: {
      comments: false,
    },
    sourceMap: false,
  }),
  new webpack.optimize.DedupePlugin(),
];
