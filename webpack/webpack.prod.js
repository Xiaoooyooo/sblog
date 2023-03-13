const webpackConfig = require("./webpack.config");

/** @type {typeof webpackConfig} */
const config = {
  ...webpackConfig,
  mode: "production",
  optimization: {
    // chunkIds: "named",
    chunkIds: "deterministic",
    splitChunks: {
      chunks: "async",
      hidePathInfo: true,
      automaticNameDelimiter: "~~",
      minSize: 20000,
      maxSize: 50 * 1024,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        // demo: {
        //   /** @param {import("webpack").Module} module */
        //   test: function (module, ...args) {
        //     console.log(module.type, module.resource);
        //     return false;
        //   },
        //   priority: 100,
        // },
        react: {
          test: /[\\/]node_modules[\\/]react/,
          chunks: "initial",
          priority: 50,
          reuseExistingChunk: true,
          name: function (module, chunks, cacheGroupKey) {
            // console.log(module.resource);
            return module.resource.replace(/\//g, "_").replace(/\.\w+$/, "");
          },
        },
        highlightjs: {
          test: /[\\/]node_modules[\\/]highlight\.js/,
          chunks: "async",
          priority: 40,
          // name: false,
          name: function (module, chunks) {
            return "hljs";
            console.log(module.name)
            return chunks.map((item) => item.name).join("+");
          },
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          name: false,
          name: function (module, chunks) {
            console.log(module.name, chunks.length)
            // return undefined;
            // return "node_modules";
            // return module.name;
            // return module.resource.replace(/\//g, "_").replace(/\.\w+$/, "");
          },
          // name(module, chunks, cacheGroupKey) {
          //   const moduleFileName = module
          //     .identifier()
          //     .split("/")
          //     .reduceRight((item) => item);
          //   console.log(chunks.length)
          //   const allChunksNames = chunks.map((item) => item.name).join("~");
          //   return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
          // },
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: "default",
        },
      },
    },
  },
};

module.exports = config;
