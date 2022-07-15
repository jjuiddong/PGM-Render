var path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: './dist/index.js',
  devtool: "inline-source-map",
  // devtool: "source-map",
  // devtool: false,
  // resolve: {
  //   extensions: [".ts", ".js"],
  // },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  optimization: {
  },
  plugins: [
  ]  
};
