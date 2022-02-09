const path = require('path');
// const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
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
      favicon: './src/assets/favicon.ico',
      minify: false,
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, 'src/blocks/comment/images'),
    //       to: path.resolve(__dirname, 'dist/images'),
    //     },
    //     {
    //       from: path.resolve(__dirname, 'src/blocks/catalog-card/images'),
    //       to: path.resolve(__dirname, 'dist/images'),
    //     },
    //     {
    //       from: path.resolve(__dirname, 'src/blocks/catalog-detailed/images'),
    //       to: path.resolve(__dirname, 'dist/images'),
    //     },
    //     {
    //       from: path.resolve(__dirname, 'src/blocks/banner-image/images'),
    //       to: path.resolve(__dirname, 'dist/images'),
    //     },
    //   ],
    // }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.scss'],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
  },
  devServer: {
    compress: true,
    port: 8000,
    client: {
      logging: 'none',
      progress: false,
    },
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: true,
    },
    historyApiFallback: true,
  },
};
