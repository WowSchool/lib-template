exports.getJsLoaders = function (cacheDir = true) {
  return {
    test: /\.jsx?$/,
    use: [{
      loader: 'babel-loader',
      options: {
        cacheDirectory: cacheDir
      },
    }],
    exclude: /node_modules/
  }
}
