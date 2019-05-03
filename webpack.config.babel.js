import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const NODE_MODULES = path.resolve(__dirname, 'node_modules');
const CLIENT = path.resolve(__dirname, 'src/client');

let config; // eslint-disable-line import/no-mutable-exports

if (process.env.NODE_ENV === 'production') {
  config = {
    entry: [
      'babel-polyfill',
      path.join(CLIENT, 'index.js')
    ],
    output: {
      path: path.join(CLIENT, 'build'),
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        { test: /\.js$/, loaders: ['babel-loader'], exclude: NODE_MODULES, include: CLIENT },
        { test: /\.scss$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        },
        { test: /\.png$/, loader: ['file-loader'] }
      ],
    },
    plugins: [
      new ExtractTextPlugin({ filename: 'bundle.css' }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } })
    ],
    stats: { children: false }
  };
} else {
  config = {
    devtool: 'eval',
    entry: [
      'babel-polyfill',
      path.join(CLIENT, 'index.js')
    ],
    output: {
      path: path.join(CLIENT, 'build'),
      filename: 'bundle.js',
      hotUpdateChunkFilename: 'hot/hot-update.js',
      hotUpdateMainFilename: 'hot/hot-update.json'
    },
    module: {
      loaders: [
        { test: /\.js$/, loader: 'happypack/loader?id=js', exclude: NODE_MODULES, include: CLIENT },
        { test: [/\.css$/, /\.scss$/], loader: 'happypack/loader?id=style' },
        { test: /\.png$/, loader: 'happypack/loader?id=file' }
      ],
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new HappyPack({ id: 'js', loaders: ['babel-loader'] }),
      new HappyPack({ id: 'style', loaders: ['style-loader', 'css-loader', 'sass-loader'] }),
      new HappyPack({ id: 'file', loaders: ['file-loader'] })
    ],
  };
}

export default config;
