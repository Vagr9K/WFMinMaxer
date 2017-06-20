const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Merge = require('webpack-merge');
const Styles = require('./config/webpack.styles.js');

const TARGET = process.env.NODE_ENV;
const DEBUG = TARGET !== 'production';

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
  devtool: DEBUG ? 'source-map' : 'hidden-source-map',
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
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
};

const styleConfig = Styles(DEBUG);
module.exports = Merge(config, styleConfig);
