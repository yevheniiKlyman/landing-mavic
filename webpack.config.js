const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
// const postcssNormalize = require('postcss-normalize');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
};

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
    ];
  }

  return config;
};

const filename = (ext) =>
  isDev ? `${ext}/[name].${ext}` : `${ext}/[name].[contenthash:8].min.${ext}`;

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../',
        hmr: isDev,
        reload: true,
      },
    },
    'css-loader',
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            // autoprefixer: {
            // flexbox: 'no-2009',
            // },
            stage: 3,
          }),
          // postcssNormalize(),
        ],
      },
    },
  ];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

module.exports = {
  context: PATHS.src,
  mode: 'development',
  entry: ['@babel/polyfill', './js/index.js'],
  output: {
    filename: filename('js'),
    path: PATHS.dist,
    // publicPath: '/',
  },
  devServer: {
    port: 3000,
    hot: isDev,
    watchContentBase: true,
  },
  optimization: optimization(),
  devtool: isDev ? 'source-map' : '',
  externals: {
    jquery: 'jQuery',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
        removeRedundantAttributes: isProd,
        useShortDoctype: isProd,
        removeEmptyAttributes: isProd,
        removeStyleLinkTypeAttributes: isProd,
        keepClosingSlash: isProd,
        minifyJS: isProd,
        minifyCSS: isProd,
        minifyURLs: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        // {
        //   from: `${PATHS.src}/favicon.ico`,
        //   to: PATHS.dist,
        // },
        {
          from: `${PATHS.src}/images`,
          to: `${PATHS.dist}/images`,
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.scss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
};
