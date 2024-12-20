/* Production build */
const { merge } = require('webpack-merge');
const JsonMinimizerPlugin = require('json-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const defines = require('./webpack-defines');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'production',
  devtool: false,
  output: {
    path: defines.dist,
  },
  plugins: [
    // compress example:
    // new CompressionPlugin({
    //   exclude: /\/static/,
    // }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new JsonMinimizerPlugin(),
      new TerserPlugin(),
      new CssMinimizerPlugin({
        minimizerOptions: {
          // targets: { ie: 11 },
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
  },
});
