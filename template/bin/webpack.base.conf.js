const $path = require('path')
const config = require('./config')
const { isdev, paths: { src, cache }, env, [env]: { assetsRoot, publicPath } } = config
const base = require('./base')
const loaders = require('./loaders')
const plugins = require('./plugins')
const { getFilename } = require('./utils')

const configs = []

const jsLoader = loaders.getJsLoaders(cache)

const definePlugin = plugins.getDefinePlugin()
const cleanPlugin = plugins.getCleanPlugin(assetsRoot)

// javascript
configs.push(Object.assign({}, base, {
  entry: $path.join(src, 'index.js'),
  output: {
    path: assetsRoot,
    filename: '{{ name }}.js',
    chunkFilename: isdev ? '[id].js' : '[id]-[chunkhash].js',
    publicPath,
    library: '{{ name }}',
    libraryTarget: 'commonjs'
  },
  resolve: {
    alias: config.alias,
    modules: ['node_modules'],
    mainFields: ['main', 'module', 'browser'],
    extensions: ['.js', '.json']
  },
  externals: config.externals,
  module: {
    rules: [jsLoader]
  },
  plugins: [definePlugin, cleanPlugin]
}))

module.exports = configs
