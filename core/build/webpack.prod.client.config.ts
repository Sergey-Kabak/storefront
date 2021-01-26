import path from 'path';
import merge from 'webpack-merge';
import baseClientConfig from './webpack.client.config';
import BrotliPlugin from 'brotli-webpack-plugin';

const themeRoot = require('./theme-path');

const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))

const prodClientConfig = merge(baseClientConfig, {
  mode: 'production',
  // devtool: 'nosources-source-map',
  plugins: [
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          // create 'vendor' group from initial packages from node_modules
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          priority: 1
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
})

module.exports = extendedConfig(prodClientConfig, {
  isClient: true,
  isDev: false
})
