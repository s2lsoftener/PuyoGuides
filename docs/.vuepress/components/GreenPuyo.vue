<template>
  <div class="green-puyo">
    <div ref="puyo"></div>
  </div>
</template>

<script>
import '../assets/js/pixi.min.js'

const loader = PIXI.loader // eslint-disable-line no-unused-vars
const resources = PIXI.loader.resources // eslint-disable-line no-unused-vars

export default {
  data () {
    return {
      puyo: undefined,
      ticker: new PIXI.ticker.Ticker(),
      stage: new PIXI.Container(),
      puyoSprites: undefined,
      colorSettings: {
        red: {
          hue: 0,
          brightness: 100,
          contrast: 0,
          saturate: 0
        },
        green: {
          hue: 0,
          brightness: 100,
          contrast: 0,
          saturate: 0
        },
        blue: {
          hue: 0,
          brightness: 100,
          contrast: 0,
          saturate: 0
        },
        yellow: {
          hue: 0,
          brightness: 100,
          contrast: 0,
          saturate: 0
        },
        purple: {
          hue: 0,
          brightness: 100,
          contrast: 0,
          saturate: 0
        },
        garbage: {
          hue: 0,
          brightness: 100,
          contrast: 0,
          saturate: 0
        }
      },
      colorFilter: new PIXI.filters.ColorMatrixFilter(),
      color: 'green'
    }
  },
  mounted () {
    if (localStorage.getItem('puyocolors')) {
      try {
        this.colorSettings = JSON.parse(localStorage.getItem('puyocolors'))
        console.log('Found color settings in localStorage')
      } catch(e) {
        console.log('Removing puyocolors from localStorage.')
        localStorage.removeItem('puyocolors')
        console.log('Using default color settings instead.')
        this.colorSettings = {
          red: {
            hue: 0,
            brightness: 100,
            contrast: 0,
            saturate: 0
          },
          green: {
            hue: 0,
            brightness: 100,
            contrast: 0,
            saturate: 0
          },
          blue: {
            hue: 0,
            brightness: 100,
            contrast: 0,
            saturate: 0
          },
          yellow: {
            hue: 0,
            brightness: 100,
            contrast: 0,
            saturate: 0
          },
          purple: {
            hue: 0,
            brightness: 100,
            contrast: 0,
            saturate: 0
          },
          garbage: {
            hue: 0,
            brightness: 100,
            contrast: 0,
            saturate: 0
          }
        }
      }
    }
    
    this.renderer = new PIXI.WebGLRenderer(16, 15, {
      resolution: 1,
      antialias: false,
      transparent: true
    })
    this.$refs.puyo.appendChild(this.renderer.view)

    let waitForLoad = new Promise((resolve, reject) => {
      setInterval(function () {
        if (loader.progress < 100) {
          console.log('Not loaded')
        } else {
          resolve('Assets loaded...!')
        }
      }, 50)
    })

    waitForLoad.then((value) => {
      this.initPuyo()
    })
  },
  methods: {
    initPuyo: function () {
      loader.load(() => {
        console.log(`Let's load the sprite.`)
        this.puyoSprites = resources['/img/puyo.json'].textures
        this.puyo = new PIXI.Sprite(this.puyoSprites[`${this.color}_n.png`])
        this.puyo.width = 16
        this.puyo.height = 15
        this.puyo.filters = [this.colorFilter]
        console.log('Hmmm....')
        console.log(this.colorSettings[this.color].hue)
        this.colorFilter.hue(this.colorSettings[this.color].hue)
        this.stage.addChild(this.puyo)
        this.renderer.render(this.stage)
      })
    }
  }
}
</script>

<style scoped>
.green-puyo {
  display: inline-block;
}
</style>
