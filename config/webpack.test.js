const helpers = require('./helpers');
var webpack = require('webpack');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: helpers.root('src'),
  },
  module: {
    preLoaders: [
      {
        test: /\.ts$/,
        loader: 'tslint-loader',
        exclude: [helpers.root('node_modules')]
      },
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular')
        ]
      }
    ],
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
        query: {
          compilerOptions: {
            removeComments: true
          }
        },
        exclude: [/\.e2e\.ts$/]
      },
      { test: /\.json$/, loader: 'json-loader', exclude: [helpers.root('src/index.html')] },
      { test: /\.css$/, loader: 'raw-loader', exclude: [helpers.root('src/index.html')] },
      { test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('src/index.html')] }
    ],
    postLoaders: [
      {
        test: /\.(js|ts)$/, loader: 'istanbul-instrumenter-loader',
        include: helpers.root('src'),
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new DefinePlugin({
      'ENV': JSON.stringify(ENV),
      'HMR': false,
      'process.env': {
          'ENV': JSON.stringify(ENV),
          'NODE_ENV': JSON.stringify(ENV),
          'HMR': false,
      }
    })
  ],
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src'
  },
  node: {
    global: 'window',
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
