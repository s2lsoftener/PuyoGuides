const path = require('path')

module.exports = {
  title: 'Puyo Puyo Tutorials',
  description: 'New guides for playing Puyo Puyo!',
  chainWebpack: (config, isServer) => {
    config.resolveLoader
      .modules
      .add(path.resolve(__dirname, './node_modules'))
  },
  themeConfig: {
    sidebar: [
      {
        title: 'Tutorial',
        collapsable: false,
        children: [
          '/tutorial/',
          '/tutorial/basics'
        ]
      }
    ]
  }
}