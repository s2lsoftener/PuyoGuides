const path = require('path')

module.exports = {
  title: 'S2\'s Puyo Puyo Tutorials',
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
      { text: 'Tutorial', link: '/tutorial/' },
      { text: 'Forms', link: 'https://puyonexus.com/wiki/List_of_Chaining_Forms'},
      { text: 'Drills', link: '/drills/'},
      { text: 'eSports', link: '/esports/' },
      { text: 'Streamers', link: '/streamers/s2lsoftener'},
      {
        text: 'Community',
        items: [
          { text: 'Discord', link: 'http://bit.ly/puyodiscord' },
          { text: 'Patreon', link: 'https://www.patreon.com/puyonexus' },
          { text: 'Reddit', link: 'https://www.reddit.com/r/puyopop' }
        ]
      },
      { text: 'Settings', link: '/settings/settings'}
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
      ],

      '/streamers/': [
        {
          title: 'Legends of Japan (~R2800+)',
          collapsable: true,
          children: [
          ],
        },
        {
          title: 'Strong Western Players (R2300+)',
          collapsible: true,
          children: [
            '/streamers/s2lsoftener'
          ]
        }
      ],

      '/settings/': [
        '/settings/settings'
      ]
    }
  }
}