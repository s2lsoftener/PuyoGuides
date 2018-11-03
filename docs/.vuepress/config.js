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
      { text: 'Streamers', link: '/streamers/'},
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
          title: ' ',
          collapsable: false,
          children: []
        },
        {
          title: 'Tools',
          collapsable: false,
          children: [
            '/drills/chainrecord',
            '/drills/drill_loader'
          ]
        },
        {
          title: ' ',
          collapsable: false,
          children: []
        },
        {
          title: 'Main Drills',
          collapsable: false,
          children: []
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
            '/drills/stairs/8chain_a',
            '/drills/5chain_stairs_nov2',
            '/drills/11chain_stairs_nov2'
          ]
        },
        {
          title: 'Sandwich',
          collapsable: true,
          children: [
            '/drills/sandwich/6chain_a',
            '/drills/8chain_sandwich_b_nov2',
            '/drills/8chain_sandwich_nov2',
            '/drills/8chain_sandwich_lshape_nov2',
            '/drills/9chain_sandwich_nov2',
            '/drills/14chain_sandwich_nov2'
          ]
        },
        {
          title: 'L-Shape',
          collapsable: true,
          children: [
            '/drills/lshape/2chain_a',
            '/drills/lshape/4chain_a',
            '/drills/lshape/6chain_a',
            '/drills/9chain_lshape_nov2',
            '/drills/10chain_lshape_nov2',
            '/drills/11chain_lshape_nov2',
            '/drills/12chain_lshape_nov2'
          ]
        },
        {
          title: 'GTR',
          collapsable: true,
          children: [
            '/drills/7chain_gtr_nov_2',
            '/drills/10chain_gtr_nov_2',
            '/drills/11chain_gtr_b_nov_2',
            '/drills/11chain_gtr_nov_2',
            '/drills/12chain_gtr_nov_2',
            '/drills/13chain_gtr_nov_2',
            '/drills/gtr/14chain_a',
            '/drills/14chain_gtr_cushion_nov_2',
            '/drills/14chain_gtr_nov_2'
          ]
        },
        {
          title: 'Yayoi',
          collapsable: true,
          children: [
            '/drills/8chain_yayoi_nov2',
            '/drills/10chain_yayoi_nov2',
            '/drills/13chain_yayoi_nov2'
          ]
        },
        {
          title: 'New GTR',
          collapsable: true,
          children: [
            '/drills/14chain_newgtr_nov_2'
          ]
        },
        {
          title: 'Fukigen GTR',
          collapsable: true,
          children: [
            '/drills/9chain_fukigen_gtr_nov_2'
          ]
        },
        {
          title: 'Tailing',
          collapsable: true,
          children: [
            '/drills/tailing/4chain_kumastacking_a',
            '/drills/4chain_tanakaspecial_nov2',
            '/drills/6chain_3columnavalanche_nov2',
            '/drills/8chain_avalanche_nov2',
            '/drills/8chain_avalanche_b_nov2',
            '/drills/tailing/10chain_3columnavalanche_a',
            '/drills/tailing/11chain_a',
            '/drills/12chain_tanakaspecial_nov2'
          ]
        },
        {
          title: ' ',
          collapsable: false,
          children: []
        },
        {
          title: 'Player Chains',
          collapsable: false,
          children: []
        },
        {
          title: 'Yoshi100_Aus',
          collapsable: true,
          children: [
            '/drills/playermade/yoshi100_1'
          ]
        },
        {
          title: 'histy',
          collapsable: true,
          children: [
            '/drills/playermade/histy_1',
            '/drills/playermade/histy_nov2/chain1_stairs',
            '/drills/playermade/histy_nov2/chain2_sandwich',
            '/drills/playermade/histy_nov2/chain3_gtr',
            '/drills/playermade/histy_nov2/chain4_flat',
            '/drills/playermade/histy_nov2/chain5_gtr',
            '/drills/playermade/histy_nov2/chain6_sandwich',
            '/drills/playermade/histy_nov2/chain7_gtrlong',
            '/drills/playermade/histy_nov2/chain8_gtr',
            '/drills/playermade/histy_nov2/chain9_lshape',
            '/drills/playermade/histy_nov2/chain10_sandwich',
            '/drills/playermade/histy_nov2/chain11_sandwich',
            '/drills/playermade/histy_nov2/chain12_avalanche',
            '/drills/playermade/histy_nov2/chain13_flat',
            '/drills/playermade/histy_nov2/chain14_lshape',
            '/drills/playermade/histy_nov2/chain15_sandwich',
            '/drills/playermade/histy_nov2/chain16_',
            '/drills/playermade/histy_nov2/chain17_kumastacking',
            '/drills/playermade/histy_nov2/chain18_flat',
            '/drills/playermade/histy_nov2/chain19_sandwich',
            '/drills/playermade/histy_nov2/chain20_kumastacking'
          ]
        },
        {
          title: 'DdR_Dan',
          collapsable: true,
          children: [
            '/drills/playermade/ddrdan_1'
          ]
        },
        {
          title: 'Shiningbolt',
          collapsable: true,
          children: [
            '/drills/playermade/shiningbolt_1'
          ]
        },
        {
          title: 'Pyro Jay',
          collapsable: true,
          children: [
            '/drills/playermade/pyrojay_1'
          ]
        },
        {
          title: 'Raikon',
          collapsable: true,
          children: [
            '/drills/playermade/raikon_1'
          ]
        },
        {
          title: 'Lon',
          collapsable: true,
          children: [
            '/drills/playermade/lon_1'
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
          title: 'Strong Western Players (R2400+)',
          collapsible: true,
          children: [
            '/streamers/',
            '/streamers/shiro',
            '/streamers/raikon',
            '/streamers/yoshi100',
            '/streamers/caneofpacci'
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