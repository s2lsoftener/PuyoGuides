<template>
  <div id="color-edit-wrapper">
    <div id="color-edit">
      <div class="puyo-container" ref="puyocontainer"></div>
      <div class="color-edit-sliders">
        <div @mouseover="currentMode = 'hue'">
          Hue: <input type="range" min="0" max="360" step="1" v-model="colorSettings[currentChoice].hue"
              style="vertical-align: middle;" /> {{ Math.round(computedSettings[currentChoice].hue) }} / 360
        </div>
        <!-- <div @mouseover="currentMode = 'brightness'"> -->
        <!-- <div>
          Brightness: <input type="range" min="0" max="300" step="1" v-model="colorSettings[currentChoice].brightness"
              style="vertical-align: middle;" /> {{ Math.round(computedSettings[currentChoice].brightness * 100) }} / 100
        </div> -->
        <!-- <div @mouseover="currentMode = 'contrast'"> -->
        <!-- <div>
          Contrast: <input type="range" min="0" max="300" step="1" v-model="colorSettings[currentChoice].contrast"
              style="vertical-align: middle;" /> {{ Math.round(computedSettings[currentChoice].contrast * 100) }} / 100
        </div> -->
        <!-- <div @mouseover="currentMode = 'saturate'"> -->
        <!-- <div>
          Saturate: <input type="range" min="0" max="300" step="1 / 100" v-model="colorSettings[currentChoice].saturate"
              style="vertical-align: middle;" /> {{ Math.round(computedSettings[currentChoice].saturate * 100) }} / 100
        </div> -->
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
      colorFilters: {
        red: new PIXI.filters.ColorMatrixFilter(),
        green: new PIXI.filters.ColorMatrixFilter(),
        blue: new PIXI.filters.ColorMatrixFilter(),
        yellow: new PIXI.filters.ColorMatrixFilter(),
        purple: new PIXI.filters.ColorMatrixFilter(),
        garbage: new PIXI.filters.ColorMatrixFilter()
      },
      currentChoice: 'red',
      choiceArray: ['red', 'green', 'blue', 'yellow', 'purple', 'garbage'],
      count: 0,
      cursorDisplay: []
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
        this.puyos.red.filters = [this.colorFilters.red]
        this.stage.addChild(this.puyos.red)

        this.puyos.green = new PIXI.Sprite(this.puyoSprites['green_n.png'])
        this.puyos.green.x += 64
        this.puyos.green.on('pointerdown', () => {
          this.currentChoice = 'green'
        })
        this.puyos.green.filters = [this.colorFilters.green]
        this.stage.addChild(this.puyos.green)

        this.puyos.blue = new PIXI.Sprite(this.puyoSprites['blue_n.png'])
        this.puyos.blue.x += 128
        this.puyos.blue.on('pointerdown', () => {
          this.currentChoice = 'blue'
        })
        this.puyos.blue.filters = [this.colorFilters.blue]
        this.stage.addChild(this.puyos.blue)

        this.puyos.yellow = new PIXI.Sprite(this.puyoSprites['yellow_n.png'])
        this.puyos.yellow.x += 192
        this.puyos.yellow.on('pointerdown', () => {
          this.currentChoice = 'yellow'
        })
        this.puyos.yellow.filters = [this.colorFilters.yellow]
        this.stage.addChild(this.puyos.yellow)

        this.puyos.purple = new PIXI.Sprite(this.puyoSprites['purple_n.png'])
        this.puyos.purple.x += 256
        this.puyos.purple.on('pointerdown', () => {
          this.currentChoice = 'purple'
        })
        this.puyos.purple.filters = [this.colorFilters.purple]
        this.stage.addChild(this.puyos.purple)

        this.puyos.garbage = new PIXI.Sprite(this.puyoSprites['garbage_n.png'])
        this.puyos.garbage.x += 320
        this.puyos.garbage.on('pointerdown', () => {
          this.currentChoice = 'garbage'
        })
        this.puyos.garbage.filters = [this.colorFilters.garbage]
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
    editorLoop: function () {
      if (this.currentMode === 'hue') {
        this.colorFilters.red.hue(this.redSettings.hue)
        this.colorFilters.green.hue(this.greenSettings.hue)
        this.colorFilters.blue.hue(this.blueSettings.hue)
        this.colorFilters.yellow.hue(this.yellowSettings.hue)
        this.colorFilters.purple.hue(this.purpleSettings.hue)
        this.colorFilters.garbage.hue(this.garbageSettings.hue)
      } else if (this.currentMode === 'brightness') {
        this.colorFilters.red.brightness(this.redSettings.brightness)
        this.colorFilters.green.brightness(this.greenSettings.brightness)
        this.colorFilters.blue.brightness(this.blueSettings.brightness)
        this.colorFilters.yellow.brightness(this.yellowSettings.brightness)
        this.colorFilters.purple.brightness(this.purpleSettings.brightness)
        this.colorFilters.garbage.brightness(this.garbageSettings.brightness)
      } else if (this.currentMode === 'contrast') {
        this.colorFilters.red.contrast(this.redSettings.contrast)
        this.colorFilters.green.contrast(this.greenSettings.contrast)
        this.colorFilters.blue.contrast(this.blueSettings.contrast)
        this.colorFilters.yellow.contrast(this.yellowSettings.contrast)
        this.colorFilters.purple.contrast(this.purpleSettings.contrast)
        this.colorFilters.garbage.contrast(this.garbageSettings.contrast)
      } else if (this.currentMode === 'saturate') {
        this.colorFilters.red.saturate(this.redSettings.saturate)
        this.colorFilters.green.saturate(this.greenSettings.saturate)
        this.colorFilters.blue.saturate(this.blueSettings.saturate)
        this.colorFilters.yellow.saturate(this.yellowSettings.saturate)
        this.colorFilters.purple.saturate(this.purpleSettings.saturate)
        this.colorFilters.garbage.saturate(this.garbageSettings.saturate)
      }

      for (let i = 0; i < this.choiceArray.length; i++) {
        // Decrease the alpha for the Puyos that aren't in focus.
        if (this.choiceArray[i] !== this.currentChoice) {
          this.cursorDisplay[i].visible = false
        } else {
          this.cursorDisplay[i].visible = true
        }
      }
      this.renderer.render(this.stage)
    },
    saveSettings: function () {
      let parsed = JSON.stringify(this.computedSettings);
      localStorage.setItem('puyocolors', parsed);
    }
  },
  computed: {
    redSettings: function () {
      return {
        hue: parseInt(this.colorSettings.red.hue),
        brightness: parseInt(this.colorSettings.red.brightness) / 100,
        contrast: parseInt(this.colorSettings.red.contrast) / 100,
        saturate: parseInt(this.colorSettings.red.saturate) / 100
      }
    },
    greenSettings: function () {
      return {
        hue: parseInt(this.colorSettings.green.hue),
        brightness: parseInt(this.colorSettings.green.brightness) / 100,
        contrast: parseInt(this.colorSettings.green.contrast) / 100,
        saturate: parseInt(this.colorSettings.green.saturate) / 100
      }
    },
    blueSettings: function () {
      return {
        hue: parseInt(this.colorSettings.blue.hue),
        brightness: parseInt(this.colorSettings.blue.brightness) / 100,
        contrast: parseInt(this.colorSettings.blue.contrast) / 100,
        saturate: parseInt(this.colorSettings.blue.saturate) / 100
      }
    },
    yellowSettings: function () {
      return {
        hue: parseInt(this.colorSettings.yellow.hue),
        brightness: parseInt(this.colorSettings.yellow.brightness) / 100,
        contrast: parseInt(this.colorSettings.yellow.contrast) / 100,
        saturate: parseInt(this.colorSettings.yellow.saturate) / 100
      }
    },
    purpleSettings: function () {
      return {
        hue: parseInt(this.colorSettings.purple.hue),
        brightness: parseInt(this.colorSettings.purple.brightness) / 100,
        contrast: parseInt(this.colorSettings.purple.contrast) / 100,
        saturate: parseInt(this.colorSettings.purple.saturate) / 100
      }
    },
    garbageSettings: function () {
      return {
        hue: parseInt(this.colorSettings.garbage.hue),
        brightness: parseInt(this.colorSettings.garbage.brightness) / 100,
        contrast: parseInt(this.colorSettings.garbage.contrast) / 100,
        saturate: parseInt(this.colorSettings.garbage.saturate) / 100
      }
    },
    computedSettings: function () {
      return {
        red: this.redSettings,
        green: this.greenSettings,
        blue: this.blueSettings,
        yellow: this.yellowSettings,
        purple: this.purpleSettings,
        garbage: this.garbageSettings
      }
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
