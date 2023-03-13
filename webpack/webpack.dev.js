const webpackConfig = require("./webpack.config");

/** @type {typeof webpackConfig} */
const config = {
  mode: "development",
  ...webpackConfig,
  devServer: {
    hot: true,
    historyApiFallback: true,
    host: "0.0.0.0"
  },
  devtool: "source-map",
};

module.exports = config;
