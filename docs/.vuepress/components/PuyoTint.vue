<template>
  <div id="color-edit-wrapper">
    <div id="color-edit">
      <div class="puyo-container" ref="puyocontainer"></div>
      <div class="color-edit-sliders">
        <div>
          <input type="checkbox" id="checkbox" v-model="colorSettings[currentChoice].tint"><label for="checkbox">Enable tint</label><br>
          R: <input type="range" min="0" max="255" step="1" v-model="colorSettings[currentChoice].r"
              style="vertical-align: middle;" /> <div style="width: 75px; display: inline-block;">{{ colorSettings[currentChoice].r }} / 255</div><br>
          G: <input type="range" min="0" max="255" step="1" v-model="colorSettings[currentChoice].g"
              style="vertical-align: middle;" /> <div style="width: 75px; display: inline-block;">{{ colorSettings[currentChoice].g }} / 255</div><br>
          B: <input type="range" min="0" max="255" step="1" v-model="colorSettings[currentChoice].b"
              style="vertical-align: middle;" /> <div style="width: 75px; display: inline-block;">{{ colorSettings[currentChoice].b }} / 255</div>
        </div>
        <div>
          <button @click="saveSettings">Save Settings</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import isNode from 'detect-node'

let PIXI = null
let loader = null
let resources = null

if (!isNode) {
  PIXI = window.PIXI
  loader = PIXI.loader
  resources = PIXI.loader.resources
}

export default {
  data () {
    return {
      currentMode: 'hue',
      renderer: new PIXI.WebGLRenderer(384, 64, {
        resolution: 1,
        transparent: true
      }),
      ticker: new PIXI.ticker.Ticker(),
      stage: new PIXI.Container(),
      puyos: {},
      puyoSprites: undefined,
      colorSettings: {
        red: {
          r: 255,
          g: 255,
          b: 255,
          tint: true
        },
        green: {
          r: 255,
          g: 255,
          b: 255,
          tint: true
        },
        blue: {
          r: 255,
          g: 255,
          b: 255,
          tint: true
        },
        yellow: {
          r: 255,
          g: 255,
          b: 255,
          tint: true
        },
        purple: {
          r: 255,
          g: 255,
          b: 255,
          tint: true
        },
        garbage: {
          r: 255,
          g: 255,
          b: 255,
          tint: true
        }
      },
      currentChoice: 'red',
      choiceArray: ['red', 'green', 'blue', 'yellow', 'purple', 'garbage'],
      count: 0,
      cursorDisplay: []
    }
  },
  mounted () {
    if (localStorage.getItem('puyotint')) {
      try {
        this.colorSettings = JSON.parse(localStorage.getItem('puyotint'))
        console.log('Found color settings in localStorage')
      } catch(e) {
        console.log('Removing puyotint from localStorage.')
        localStorage.removeItem('puyotint')
      }
    }

    this.$refs.puyocontainer.appendChild(this.renderer.view)

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
        this.puyoSprites = resources['/img/puyo.json'].textures

        for (let i = 0; i < this.choiceArray.length; i++) {
          this.cursorDisplay[i] = new PIXI.Sprite(resources['/img/cursor.png'].texture)
          this.cursorDisplay[i].x = i * 64
          this.stage.addChild(this.cursorDisplay[i])
        }

        this.puyos.red = new PIXI.Sprite(this.puyoSprites['red_n.png'])
        this.puyos.red.on('pointerdown', () => {
          this.currentChoice = 'red'
        })
        this.puyos.red.tint = this.rgbToHex(this.colorSettings.red.r, this.colorSettings.red.g, this.colorSettings.red.b)
        this.stage.addChild(this.puyos.red)

        this.puyos.green = new PIXI.Sprite(this.puyoSprites['green_n.png'])
        this.puyos.green.x += 64
        this.puyos.green.on('pointerdown', () => {
          this.currentChoice = 'green'
        })
        this.puyos.green.tint = this.rgbToHex(this.colorSettings.green.r, this.colorSettings.green.g, this.colorSettings.green.b)
        this.stage.addChild(this.puyos.green)

        this.puyos.blue = new PIXI.Sprite(this.puyoSprites['blue_n.png'])
        this.puyos.blue.x += 128
        this.puyos.blue.on('pointerdown', () => {
          this.currentChoice = 'blue'
        })
        this.puyos.blue.tint = this.rgbToHex(this.colorSettings.blue.r, this.colorSettings.blue.g, this.colorSettings.blue.b)
        this.stage.addChild(this.puyos.blue)

        this.puyos.yellow = new PIXI.Sprite(this.puyoSprites['yellow_n.png'])
        this.puyos.yellow.x += 192
        this.puyos.yellow.on('pointerdown', () => {
          this.currentChoice = 'yellow'
        })
        this.puyos.yellow.tint = this.rgbToHex(this.colorSettings.yellow.r, this.colorSettings.yellow.g, this.colorSettings.yellow.b)
        this.stage.addChild(this.puyos.yellow)

        this.puyos.purple = new PIXI.Sprite(this.puyoSprites['purple_n.png'])
        this.puyos.purple.x += 256
        this.puyos.purple.on('pointerdown', () => {
          this.currentChoice = 'purple'
        })
        this.puyos.purple.tint = this.rgbToHex(this.colorSettings.purple.r, this.colorSettings.purple.g, this.colorSettings.purple.b)
        this.stage.addChild(this.puyos.purple)

        this.puyos.garbage = new PIXI.Sprite(this.puyoSprites['garbage_n.png'])
        this.puyos.garbage.x += 320
        this.puyos.garbage.on('pointerdown', () => {
          this.currentChoice = 'garbage'
        })
        this.puyos.garbage.tint = this.rgbToHex(this.colorSettings.garbage.r, this.colorSettings.garbage.g, this.colorSettings.garbage.b)
        this.stage.addChild(this.puyos.garbage)

        // Apply some stuff to all the Puyos
        for (let i = 0; i < this.choiceArray.length; i++) {
          // Enable interactivity
          this.puyos[this.choiceArray[i]].interactive = true
          this.puyos[this.choiceArray[i]].buttonMode = true

          // Decrease the alpha for the Puyos that aren't in focus.
          if (this.choiceArray[i] !== this.currentChoice) {
            this.cursorDisplay[i].visible = false
          } else {
            this.cursorDisplay[i].visible = true
          }
        }

        this.ticker.add(this.editorLoop)
        this.ticker.start()
      })
    },
    componentToHex: function (c) {
      let hex = c.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    },
    rgbToHex: function (r, g, b) {
      return parseInt(this.componentToHex(parseInt(r, 10)) + this.componentToHex(parseInt(g, 10)) + this.componentToHex(parseInt(b, 10)), 16)
    },
    editorLoop: function () {
      if (this.colorSettings.red.tint === true) {
        this.puyos.red.tint = this.rgbToHex(this.colorSettings.red.r, this.colorSettings.red.g, this.colorSettings.red.b)
      } else {
        this.puyos.red.tint = 0xFFFFFF
      }

      if (this.colorSettings.green.tint === true) {
        this.puyos.green.tint = this.rgbToHex(this.colorSettings.green.r, this.colorSettings.green.g, this.colorSettings.green.b)
      } else {
        this.puyos.green.tint = 0xFFFFFF
      }

      if (this.colorSettings.blue.tint === true) {
        this.puyos.blue.tint = this.rgbToHex(this.colorSettings.blue.r, this.colorSettings.blue.g, this.colorSettings.blue.b)
      } else {
        this.puyos.blue.tint = 0xFFFFFF
      }

      if (this.colorSettings.yellow.tint === true) {
        this.puyos.yellow.tint = this.rgbToHex(this.colorSettings.yellow.r, this.colorSettings.yellow.g, this.colorSettings.yellow.b)
      } else {
        this.puyos.yellow.tint = 0xFFFFFF
      }

      if (this.colorSettings.purple.tint === true) {
        this.puyos.purple.tint = this.rgbToHex(this.colorSettings.purple.r, this.colorSettings.purple.g, this.colorSettings.purple.b)
      } else {
        this.puyos.purple.tint = 0xFFFFFF
      }

      if (this.colorSettings.garbage.tint === true) {
        this.puyos.garbage.tint = this.rgbToHex(this.colorSettings.garbage.r, this.colorSettings.garbage.g, this.colorSettings.garbage.b)
      } else {
        this.puyos.garbage.tint = 0xFFFFFF
      }
      
      for (let i = 0; i < this.choiceArray.length; i++) {
        // Change focus of cursor
        if (this.choiceArray[i] !== this.currentChoice) {
          this.cursorDisplay[i].visible = false
        } else {
          this.cursorDisplay[i].visible = true
        }
      }
      this.renderer.render(this.stage)
    },
    saveSettings: function () {
      let parsed = JSON.stringify(this.colorSettings);
      localStorage.setItem('puyotint', parsed);
    }
  }
}
</script>

<style scoped>
#color-edit-wrapper {
  display: flex;
  justify-content: center;
}
#color-edit {
  display: inline-flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #f3f5f7;
  min-width: 500px;
  margin-left: 8px;
  margin-right: 8px;
  padding: 12px;
  border-radius: 8px;
  -moz-box-shadow: 3px 3px 1px 0px #999;
  -webkit-box-shadow: 3px 3px 1px 0px #999;
  box-shadow: 3px 3px 1px 0px #999;
  text-align: center;
}
.puyo-container {
  display: flex;
  width: 384px;
  flex-grow: 1;
  justify-content: center;
}
.color-edit-sliders {
  flex-grow: 9;
}
</style>
