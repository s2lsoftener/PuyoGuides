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
      { text: 'Form List', link: 'https://puyonexus.com/wiki/List_of_Chaining_Forms'},
      { text: 'Drills', link: '/drills/'},
      {
        text: 'eSports',
        items: [
          { text: 'Overview', link: '/esports/overview' },
          { text: 'Buying Puyo eSports', link: '/esports/translation/purchasing' },
          { text: 'Menu Translation', link: '/esports/translation/menus' }
        ]
      },
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
            '/drills/basics/2chain_b',
            '/drills/basics/3chain_lshape_a',
            '/drills/basics/3chain_stairs_a',
            '/drills/basics/4chain_yayoi_a',
            '/drills/basics/6chain_a'
          ]
        },
        {
          title: 'Stairs',
          collapsable: true,
          children: [
            '/drills/stairs/5chain_a',
            '/drills/stairs/8chain_a'
          ]
        },
        {
          title: 'Sandwich',
          collapsable: true,
          children: [
            '/drills/sandwich/6chain_a'
          ]
        },
        {
          title: 'L-Shape',
          collapsable: true,
          children: [
            '/drills/lshape/2chain_a',
            '/drills/lshape/4chain_a',
            '/drills/lshape/6chain_a'
          ]
        },
        {
          title: 'GTR',
          collapsable: true,
          children: [
            '/drills/gtr/14chain_a'
          ]
        },
        {
          title: 'Tailing',
          collapsable: true,
          children: [
            '/drills/tailing/4chain_kumastacking_a',
            '/drills/tailing/10chain_3columnavalanche_a',
            '/drills/tailing/11chain_a'
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
          title: 'Introduction',
          collapsable: false,
          children: [
            '/tutorial/',
            '/tutorial/gamescreen',
            '/tutorial/basics'
          ]
        },
        {
          title: 'Chaining',
          collapsable: false,
          children: [
            '/tutorial/stairs',
            '/tutorial/test2'
          ]
        },
        {
          title: 'Fighting',
          collapsable: false,
          children: []
        },
        {
          title: 'Fever mode',
          collapsable: false,
          children: []
        },
        {
          title: 'Links',
          collapsable: false,
          children: []
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

      '/esports/': [
        '/esports/overview',
        '/esports/translation/purchasing',
        '/esports/translation/menus'
      ],

      '/settings/': [
        '/settings/settings'
      ]
    }
  }
}