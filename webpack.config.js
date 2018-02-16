const webpack = require("webpack");

module.exports = {
  entry: [
      __dirname + '/src/a11y-shooter-assets.js',
      __dirname + '/src/a11y-shooter.js'
  ],
  devtool: "source-map",
  output: {
    path: __dirname + "/dist",
    filename: "a11y-shooter.min.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      minimize: true
    })
  ]
};
