const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './main.js',
  output: {
    path: __dirname + "/dist",
    filename: 'main.js'
  },
  devtool: 'source-map',

  performance: {
    maxEntrypointSize: 600000,
    maxAssetSize: 600000
  },

  devServer: {
    port: 3000,
    clientLogLevel: 'none',
    stats: 'errors-only'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new CopyPlugin([{from: 'data', to: 'data'}]),
    new HtmlPlugin({
      template: 'index.html'
    })
  ]
};
