const path = require('path')

module.exports = {
  title: 'Puyo Puyo Tutorials',
  description: 'New guides for playing Puyo Puyo!',
  chainWebpack: (config, isServer) => {
    config.resolveLoader
      .modules
      .add(path.resolve(__dirname, './node_modules'))
  },
  head: [
    ['script', { src: '/js/pixi.min.js' }],
    ['script', { src: '/js/bezier-easing.js' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Tutorial', link: '/tutorial/' },
      { text: 'Drills', link: '/drills/'}
    ],
    sidebar: {
      '/drills/': [
        '/drills/',
        {
          title: 'Drill Creator',
          collapsable: true,
          children: [
            '/drills/chainrecord',
          ]
        },
        {
          title: 'Basic Chaining',
          collapsable: true,
          children: [
            '/drills/basics/2chain_a',
            '/drills/basics/2chain_b',
            '/drills/basics/3chain_lshape_a'
          ]
        },
        {
          title: 'Yoshi100_Aus',
          collapsable: true,
          children: [
            '/drills/yoshi100_1'
          ]
        },
        {
          title: 'histy',
          collapsable: true,
          children: [
            '/drills/histy_1'
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