const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");
const dotenv = require("dotenv");

const cwd = process.cwd();
const parsedEnvs = dotenv.config().parsed;

/** @type {import("webpack").Configuration} */
const config = {
  entry: "./src/main.tsx",
  output: {
    path: path.resolve(cwd, "dist"),
    // filename: "assets/js/[name].js",
    filename: "assets/js/[contenthash:8]~[id].js",
    clean: true,
    publicPath: "/",
  },
  devtool: false,
  resolve: {
    alias: {
      "@": path.resolve(cwd, "src"),
    },
    modules: ["node_modules"],
    extensions: [".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: "babel-loader",
      },
      {
        test: /\.scss/,
        use: [
          miniCssPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.css/,
        use: [miniCssPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "public/index.html",
      title: parsedEnvs.SITE_TITLE,
    }),
    new miniCssPlugin({
      filename: "assets/style/[name].css",
    }),
    new DefinePlugin({
      ...Object.keys(parsedEnvs).reduce((prev, next) => {
        prev[next] = JSON.stringify(parsedEnvs[next]);
        return prev;
      }, {}),
    }),
  ],
};

module.exports = config;
