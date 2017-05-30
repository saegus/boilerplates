const webpack = require('webpack') // eslint-disable-line
const webpackMerge = require('webpack-merge'); // eslint-disable-line
const BrowserSyncPlugin = require('browser-sync-webpack-plugin'); // eslint-disable-line
const commonConfig = require('./common.conf');
const path = require('path');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8080,
      server: { baseDir: ['dist'] },
    }),
  ],
});
