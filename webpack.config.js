const path = require("path");
module.exports = {
  context: __dirname,
  entry: "./lib/freeDOM.js",
  output: {
    path: path.resolve(__dirname, 'js'),
    publicPath: "/js/",
    filename: "bundle.js",
  },
  devtool: 'source-maps',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
