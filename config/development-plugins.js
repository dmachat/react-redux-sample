var webpack = require('webpack');

module.exports = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: false,
    debug: true,
  }),
];
