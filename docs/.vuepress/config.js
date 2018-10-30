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
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tutorial', link: '/tutorial/' },
      { text: 'Tools', link: '/tools/'}
    ],
    sidebar: {
      '/tools/': [
        {
          title: 'Drill Making Tools',
          collapsable: true,
          children: [
            '/tools/chainrecord'
          ]
        }
      ],

      '/tutorial/': [
        {
          title: 'Tutorial',
          collapsable: true,
          children: [
            '/tutorial/',
            '/tutorial/gamescreen',
            '/tutorial/basics',
            '/tutorial/stairs',
            '/tutorial/test',
            '/tutorial/test2'
          ]
        }
      ]
    }
  }
}