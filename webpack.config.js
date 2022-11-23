const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/src/main.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /.(css|sass|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /.html$/i,
        use: "html-loader",
      }
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./app/src/main.html",
    }),
  ],
  mode: "development",
};
