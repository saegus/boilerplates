const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const commonConfig = require("./common.conf");
const path = require("path");
const sso = require("../sso.config.json");

module.exports = webpackMerge(commonConfig, {
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    publicPath: "http://localhost:8080/",
    filename: "[name].js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("dev"),
        SSO: JSON.stringify(sso)
      }
    })
  ]
});
