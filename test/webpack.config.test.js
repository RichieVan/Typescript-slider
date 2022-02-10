const path = require('path');
// const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    test: './test/tests.js',
  },
  output: {
    path: path.resolve(__dirname, 'tests_dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader',
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg|ico|svg|ttf|woff|woff2|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      minify: false,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.scss'],
    modules: [path.resolve(__dirname, '..', 'node_modules'), 'node_modules'],
  },
  devServer: {
    compress: true,
    port: 8001,
    client: {
      logging: 'none',
      progress: false,
    },
    static: {
      directory: path.join(__dirname, 'tests_dist'),
      watch: true,
    },
    historyApiFallback: true,
  },
};
