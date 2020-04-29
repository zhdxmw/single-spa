/* eslint-env node */
const webpack = require('webpack')
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/people.js'),
  output: {
    filename: 'people.js',
    library: 'people',
    libraryTarget: 'amd',
    path: path.resolve(__dirname, 'build/people'),
  },
  mode: 'production',

  module: {
    rules: [{
        parser: {
          System: false
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        loader: 'babel-loader',
        options: {
          plugins: [
            [
              require.resolve('babel-plugin-named-asset-import'),
              {
                loaderMap: {
                  svg: {
                    ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                  },
                },
              },
            ],
          ],
        },
      },
      {
        test: /\.css$/,
        exclude: [path.resolve(__dirname, 'node_modules'), /\.krem.css$/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]',
              publicPath: '../../',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [
                  require('autoprefixer')
                ];
              },
              publicPath: '../../',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules')],
        exclude: [/\.krem.css$/],
        use: ['style-loader', 'css-loader'],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: '10000',
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.krem.css$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [{
          loader: 'kremling-loader',
          options: {
            namespace: 'people',
            publicPath: '/',
            postcss: {
              plugins: {
                'autoprefixer': {},
              }
            }
          },
        }, ]
      },
      // {
      //   test: /\.krem.css$/,
      //   loader: MiniCssExtractPlugin.loader,
      //   options: {
      //     publicPath: '../../'
      //   }
      // },
    ],
  },
  resolve: {
    modules: [
      __dirname,
      'node_modules',
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['build/people']),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'src/people.js')
    }]),
  ],
  devtool: 'source-map',
  externals: [
    /^@portal\/*/,
    /^lodash$/,
    /^single-spa$/,
    /^rxjs\/?.*$/,
    /^react$/,
    /^react\/lib.*/,
    /^react-dom$/,
    /.*react-dom.*/,
  ],
};