const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebPackPluginConfig = new HtmlWebpackPlugin({
  template: './app/index.html', //our custom html template
  filename: 'index.html', //output generated html
  inject: 'body' //all javascript resources will be placed at the bottom of the body element
})

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: require("eslint-friendly-formatter"),
          configFile: path.resolve(__dirname, './.eslintrc'),
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  plugins: [
    HtmlWebPackPluginConfig,
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    })
  ]
}