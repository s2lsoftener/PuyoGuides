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
      { text: 'Drills', link: '/tools/chainrecord'}
    ],
    sidebar: {
      '/tools/': [
        {
          title: 'Drill Creator',
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
            '/tutorial/test2'
          ]
        },
        {
          title: 'How to Get Puyo Games',
          collapsable: false,
          children: [
            '/tutorial/getesports'
          ]
        }
      ]
    }
  }
}