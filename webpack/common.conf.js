const webpack = require("webpack");
const path = require("path");
const ExtractText = require("extract-text-webpack-plugin");

module.exports = {
  target: "web",
  stats: {
    chunks: false,
    colors: true
  },
  context: path.resolve(__dirname, "..", "src"),
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [
      path.resolve(__dirname, "..", "node_modules"),
      path.resolve(__dirname, "..", "src")
    ],
    alias: process.env.MOCK ? {
      'factories': 'factories/mocks',
    } : undefined,
  },
  entry: {
    polyfills: ["es5-shim", "es6-shim"],
    bundle: "app.jsx"
  },
  plugins: [new ExtractText("styles.css")],
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: "file-loader",
          query: {
            name: "[name].html"
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|mp4|webm)(\?.+)?$/,
        exclude: /node_modules/,
        use: {
          loader: "file-loader",
          query: {
            context: path.resolve(__dirname, "..", "src", "assets"),
            name: "assets/[path][name].[ext]"
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractText.extract({
          use: [
            {
              loader: "css-loader",
              query: {
                sourceMap: true
              }
            },
            {
              loader: "postcss-loader",
              query: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader",
              query: {
                sourceMap: true,
                includePaths: [path.resolve(__dirname, "..", "src", "scss")]
              }
            }
          ]
        })
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: [
          {
            loader: "babel-loader",
            query: {
              presets: ["react", "es2015", "stage-1"],
              plugins: ["transform-object-rest-spread", "transform-decorators-legacy"]
            }
          },
          "prettier-loader"
        ]
      }
    ]
  }
};