const path = require('path')
// inViewport = require('vue-in-viewport-mixin')
module.exports = {
  title: 'Puyo Puyo Tutorials',
  description: 'New guides for playing Puyo Puyo!',
  chainWebpack: (config, isServer) => {
    config.resolveLoader
      .modules
      .add(path.resolve(__dirname, './node_modules'))
  }
  // inViewport: inViewport
}