import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';

const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const CLIENT = path.resolve(__dirname, 'src', 'client');

export default {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    './src/client/routes.js'
  ],
  output: {
    path: path.join(CLIENT, 'build'),
    filename: 'bundle.js',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  module: {
    loaders: [
      {
        test: /\.js$/, loader: 'happypack/loader?id=js', exclude: NODE_MODULES, include: CLIENT,
      },
      { test: [/\.css$/, /\.scss$/], loader: 'happypack/loader?id=style' },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HappyPack({ id: 'js', loaders: ['babel-loader'] }),
    new HappyPack({ id: 'style', loaders: ['style-loader', 'css-loader', 'sass-loader'] }),
  ],
};
