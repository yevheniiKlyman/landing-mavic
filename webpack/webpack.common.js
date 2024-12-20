// copy files from dev (i.g. `assets/img/*`) to dist (i.g `static/img/*`)
const CopyWebpackPlugin = require('copy-webpack-plugin');
// extract css from js to another files
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// html support
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const defines = require('./webpack-defines');
const pages = require('./webpack-pages');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    app: `${defines.src}/${defines.scripts}/index.js`,
  },
  output: {
    path: defines.dist,
    filename: `${defines.scripts}/[name].[fullhash:8].js`,
  },

  // optimization (chunks)
  optimization: {
    chunkIds: 'named',
    mergeDuplicateChunks: true,

    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          name: 'vendors', // or comment name to make chunks works
          chunks: 'all',
          // the way to keep kit in the vendors
          test: /[\\/]node_modules[\\/]|[\\/]ui-kit[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
              target: 'es2016',
            },
          },
        },
      },

      // sass & css
      {
        test: /\.(s(a|c)ss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    // add more postcss plugins here
                    // ...

                    // https://www.npmjs.com/package/postcss-preset-env
                    // it's including autoprefixer by default (config is in `package.json`)
                    // pass `autoprefixer: false` to disable autoprefixer
                    'postcss-preset-env',
                  ],
                ],
                postcssOptions: {
                  parser: 'postcss-js',
                },
                execute: true,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
              api: 'modern',
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e)?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[hash:8].[ext]',
              outputPath: `${defines.images}/css-images/`,
            },
          },
        ],
        type: 'javascript/auto',
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: '[name].[hash:8].[ext]',
              outputPath: `${defines.fonts}/`,
            },
          },
        ],
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    ...pages.map(
      (page) => new HtmlWebpackPlugin({
        title: page.title,
        template: `${defines.src}/${page.template}`,
        filename: page.filename,
        favicon: `${defines.src}/misc/favicon.ico`,
      }),
    ),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: 'tsconfig.json',
        mode: 'readonly',
      },
      devServer: false,
      async: false,
    }),

    // extract css from js / ts files (it's a basic setup to keep css in `css` folder)
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      filename: `${defines.styles}/[name].[contenthash].css`,
      chunkFilename: '[id].css',
    }),

    // copy files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${defines.src}/${defines.images}`,
          to: `${defines.dist}/${defines.images}`,
          globOptions: {
            ignore: [
              '**/css-images/**',
            ],
          },
        },
        {
          from: `${defines.src}/misc`,
          to: `${defines.dist}`,
        },
      ],
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    new StylelintPlugin({
      files: '**/*.(s(c|a)ss|css)',
    }),
  ],

  resolve: {
    plugins: [
      new TsconfigPathsPlugin({
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
      }),
    ],
  },
};
