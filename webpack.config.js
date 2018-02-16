const webpack = require("webpack");

module.exports = {
  entry: [
      './src/a11y-shooter-assets.js',
      './src/a11y-shooter.js'
  ],
  devtool: "source-map",
  output: {
    path: "./dist",
    filename: "a11y-shooter.min.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};
