const CopyPlugin = require('copy-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const filename = ext => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`);

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties'],
      },
    },
  ];

  if (isDev) {
    loaders.push('eslint-loader');
  }

  return loaders;
};

const config = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  devtool: isDev ? 'source-map' : false,
  entry: {
    index: ['@babel/polyfill', './index.js'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'public'),
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src', 'core'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      },
      template: 'index.html',
      minify: {
        removeComments: isProd ? true : false,
        collapseWhitespace: isProd ? true : false,
      },
    }),
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'public'),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|public)/,
        use: jsLoaders(),
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000&name=fonts/[name].[ext]',
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    host: 'localhost',
    port: 3000,
  },
};

module.exports = config;
