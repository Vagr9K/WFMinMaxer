const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Merge = require('webpack-merge');
const Styles = require('./config/webpack.styles.js');

const TARGET = process.env.NODE_ENV;
let DEBUG = false;

if (TARGET === 'production') {
  console.log('Using production settings.');
  DEBUG = false;
} else {
  console.log('Using debug settings.');
  DEBUG = true;
}

const devOut = {
  publicPath: '/',
  filename: '[name].js',
  path: path.resolve(__dirname, 'dist.dev'),
};

const prodOut = {
  publicPath: '/',
  filename: '[name].[chunkhash].js',
  path: path.resolve(__dirname, 'dist.prod'),
};

const config = {
  output: DEBUG ? devOut : prodOut,
  entry: {
    index: './src/index.jsx',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: { presets: ['env', 'es2015', 'react'] } },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.join(__dirname, 'src'), 'node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
    }),
  ],
};

const styleConfig = Styles(DEBUG);
module.exports = Merge(config, styleConfig);
