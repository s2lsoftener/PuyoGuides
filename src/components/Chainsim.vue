<template>
  <div class="chainsim">
    <h1>Chainsim page.</h1>
    <p>
      Canvas should appear below.
    </p>
    <div ref="game"></div>
    <chainsim-puyo v-for="index in CellCount" v-bind:key="index" :index="index"
    :Simulator="Simulator" :fieldState="fieldState" :fieldData="fieldData"
    @end-popping="togglePoppingCell" @end-dropping="toggleDroppingCell"
    @edit-puyo-field="editFieldData" :app="app" :pixiLoader="pixiLoader" :pixiResources="pixiResources"
    :canvasLoaded="canvasLoaded"></chainsim-puyo>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'
import { TweenMax } from 'gsap' // eslint-disable-line no-unused-vars
import PixiPlugin from 'gsap/PixiPlugin' // eslint-disable-line no-unused-vars
import Chainsim from '@/assets/js/chainsim'
import ChainsimPuyo from './ChainsimPuyo'

let loader = PIXI.loader
let resources = PIXI.loader.resources
let Sprite = PIXI.Sprite

export default {
  name: 'Chainsim',
  components: {
    ChainsimPuyo
  },
  data () {
    return {
      // Chainsim State data
      fieldState: 'idle', // idle -> dropping -> popping -> idle/dropping
      fieldSettings: {},
      fieldData: [['0', '0', '0', '0', '0', '0'], // Placeholder field data for testing purposes
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0']], // On app load, this gets set to a field provided via URL. Otherwise, loads a blank field.
      originalField: [['0', '0', '0', '0', '0', '0'], // Placeholder field data for testing purposes
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0']],
      poppingCells: [], // boolean 2D matrix that tracks which cells are currently popping
      droppingCells: [], // boolean 2D matrix that tracks which cells are currently dropping
      dropDistances: [], // numeric 2D matrix that contains how far Puyos need to drop during their drop animations
      clearPuyosResult: [],
      dropPuyosResult: [],
      windowHeight: 0,
      scaling: 1,
      canvasLoaded: false
    }
  },
  created () {
    // Later on, the app should read in a string from a URL

    this.fieldSettings = {
      columns: 6,
      visibleRows: 12,
      hiddenRows: 1,
      cellWidth: 72, // pixels
      cellHeight: 68, // pixels
      puyoToClear: 4,
      scaling: 1
    }
    this.fieldData = [['R', '0', '0', '0', '0', '0'],
      ['P', '0', '0', '0', '0', '0'],
      ['G', '0', '0', '0', '0', '0'],
      ['B', '0', '0', '0', '0', '0'],
      ['R', '0', '0', '0', '0', '0'],
      ['Y', '0', '0', '0', '0', '0'],
      ['G', 'Y', '0', '0', '0', '0'],
      ['G', 'Y', 'P', '0', '0', 'R'],
      ['Y', 'P', 'P', 'R', '0', 'R'],
      ['Y', 'Y', 'P', 'J', 'R', 'Y'],
      ['G', 'R', 'B', 'G', 'Y', 'Y'],
      ['G', 'G', 'R', 'B', 'G', 'G'],
      ['R', 'R', 'B', 'B', 'G', 'Y']]
    console.log('Set default field.')
    console.log('Default settings:')
    console.log(this.fieldSettings)

    for (let y = 0; y < this.fieldData.length; y++) {
      this.poppingCells[y] = []
      this.droppingCells[y] = []
      this.dropDistances[y] = []
      this.clearPuyosResult[y] = []
      this.dropPuyosResult[y] = []
      for (let x = 0; x < this.fieldData[0].length; x++) {
        this.poppingCells[y][x] = false
        this.droppingCells[y][x] = false
        this.dropDistances[y][x] = 0
        this.clearPuyosResult[y][x] = '0'
        this.dropPuyosResult[y][x] = '0'
      }
    }
  },
  computed: {
    // Computed Simulator core properties
    Field: function () {
      return new Chainsim.Field(this.fieldSettings, this.fieldData)
    },
    isPopping: function () {
      if (this.poppingCells.length === this.Field.totalRows) {
        if (this.poppingCells[0].length === this.Field.columns) {
          for (let y = 0; y < this.Field.totalRows; y++) {
            for (let x = 0; x < this.Field.columns; x++) {
              if (this.poppingCells[y][x] === true) {
                return true // If just one cell is still popping, return true. Animations are ongoing.
              }
            }
          }
        }
      }
      return false // If none of the cells are popping, return false. Animations complete.
    },
    isDropping: function () {
      for (let y = 0; y < this.Field.totalRows; y++) {
        for (let x = 0; x < this.Field.columns; x++) {
          if (this.droppingCells[y][x] === true) {
            return true // If just one cell is still dropping, return true. Animations are ongoing.
          }
        }
      }
      return false // If none of the cells are dropping, return false. Animations complete.
    },
    Simulator: function () { // Contains simulator state data to pass on to child components
      return {
        fieldState: this.fieldState,
        Field: this.Field,
        poppingCells: this.poppingCells,
        droppingCells: this.droppingCells,
        dropDistances: this.dropDistances
      }
    },
    CellCount: function () {
      return [...Array(this.Field.columns * this.Field.totalRows).keys()]
    },
    // Canvas stuff
    app: function () {
      return new PIXI.Application({
        width: 64 * 6,
        height: 60 * 13,
        antialias: true,
        transparent: false,
        resolution: 1
      })
    },
    sprites: function () {
      return resources['/img/spritesheet.json'].textures
    },
    redpuyo: function () {
      let newPuyo = new Sprite(this.sprites['red_ud.png'])
      newPuyo.anchor.set(0.5)
      newPuyo.x = newPuyo.width / 2
      newPuyo.y = newPuyo.height / 2
      return newPuyo
    },
    redOtherPuyo: function () {
      let newPuyo = new PIXI.Sprite(this.sprites['red_ur.png'])
      newPuyo.anchor.set(0.5)
      newPuyo.x = newPuyo.width / 2
      newPuyo.y = newPuyo.height / 2 + 60
      return newPuyo
    },
    pixiLoader: function () {
      return loader
    },
    pixiResources: function () {
      return resources
    }
  },
  methods: {
    // Canvas methods
    loadCanvas: function () {
      // Add Canvas to HTML
      this.$refs.game.appendChild(this.app.view)
      // Setup function
      let setup = () => {
        this.app.stage.addChild(this.redpuyo)
        this.app.stage.addChild(this.redOtherPuyo)
      }

      // Load Sprites
      if (resources['/img/spritesheet.json'] === undefined) {
        console.log('Spritesheet not loaded yet. Loading...')
        loader.add('/img/spritesheet.json')
        this.canvasLoaded = true
        loader.load(setup)
      } else {
        console.log('Spritesheet already loaded')
        this.canvasLoaded = true
        loader.load(setup)
      }
    },
    // Simulation core
    editFieldData: function (cell) {
      this.fieldData[cell.y].splice(cell.x, 1, cell.puyo)
    },
    togglePoppingCell: function (cell) { // expects object of form: {x:int, y:int, bool:boolean}
      this.poppingCells[cell.y].splice(cell.x, 1, cell.bool) // Have to use array methods or this won't be reactive.
    },
    toggleDroppingCell: function (cell) { // expects object of form: {x:int, y:int, bool:boolean}
      this.droppingCells[cell.y].splice(cell.x, 1, cell.bool) // Have to use array methods or this won't be reactive.
    },
    dropPuyos: function () {
      let dropResult = Chainsim.Simulate.dropPuyos(this.Field)
      let anyToDrop = false

      // Create an array that tracks which cells are in their drop animations.
      let dropAnimationArray = []
      for (let y = 0; y < this.Field.totalRows; y++) {
        dropAnimationArray[y] = []
        for (let x = 0; x < this.Field.columns; x++) {
          if (dropResult.dropDistances[y][x] > 0) {
            dropAnimationArray[y][x] = true
            anyToDrop = true
          } else {
            dropAnimationArray[y][x] = false
          }
        }
      }

      this.droppingCells = dropAnimationArray
      this.dropDistances = dropResult.dropDistances
      this.dropPuyosResult = Chainsim.mapToStringArray(dropResult.dropResult)

      if (anyToDrop === false) {
        this.clearPuyos()
      } else {
        this.$emit('update-field-state', 'dropping') // When child component hears 'dropping', it'll trigger drop animations.
        console.log('Set fieldState to "dropping"')
      }
    },
    clearPuyos: function () {
      let clearResult = Chainsim.Simulate.clearPuyos(this.Field)

      // Create an array in the Vuex Store that tracks which cells are animating.
      let popAnimationArray = []
      for (let y = 0; y < this.Field.totalRows; y++) {
        popAnimationArray[y] = []
        for (let x = 0; x < this.Field.columns; x++) {
          if (this.Field.map[y][x].toPop === true) {
            popAnimationArray[y][x] = true
          } else {
            popAnimationArray[y][x] = false
          }
        }
      }
      this.poppingCells = popAnimationArray
      this.clearPuyosResult = Chainsim.mapToStringArray(clearResult.newField.map)

      // If there's no pops to do, set fieldState to 'idle'. Otherwise, set 'popping'
      if (clearResult.popData.poppingGroups.length === 0) {
        this.$emit('update-field-state', 'idle')
        console.log('Set fieldState to "idle"')
      } else {
        this.$emit('update-field-state', 'popping')
        console.log('Set fieldState to "popping"')
      }
    },
    // Simulation controls
    clearField: function () {
      let poppingCells = []
      let droppingCells = []
      let dropDistances = []
      let originalField = []
      let emptyField = []
      for (let y = 0; y < this.Field.totalRows; y++) {
        poppingCells[y] = []
        droppingCells[y] = []
        dropDistances[y] = []
        originalField[y] = []
        emptyField[y] = []
        for (let x = 0; x < this.Field.columns; x++) {
          poppingCells[y][x] = false
          droppingCells[y][x] = false
          dropDistances[y][x] = false
          originalField[y][x] = '0'
          emptyField[y][x] = '0'
        }
      }
      this.poppingCells = poppingCells
      this.droppingCells = droppingCells
      this.dropDistances = dropDistances
      this.originalField = originalField
      this.fieldData = emptyField
      this.$emit('update-field-state', 'idle')
    },
    resetField: function () {
      let poppingCells = []
      let droppingCells = []
      let dropDistances = []
      for (let y = 0; y < this.Field.totalRows; y++) {
        poppingCells[y] = []
        droppingCells[y] = []
        dropDistances[y] = []
        for (let x = 0; x < this.Field.columns; x++) {
          poppingCells[y][x] = false
          droppingCells[y][x] = false
          dropDistances[y][x] = false
        }
      }
      this.poppingCells = poppingCells
      this.droppingCells = droppingCells
      this.dropDistances = dropDistances
      this.$emit('update-field-state', 'idle')
      this.$emit('unset-reset-field', false)
      this.$nextTick(() => {
        this.fieldData = this.originalField
      })
    },
    playStep: function () {
      if (this.fieldState === 'idle') {
        this.originalField = JSON.parse(JSON.stringify(this.fieldData))
        this.dropPuyos()
      }
    },
    playChain: function () {
      if (this.fieldState === 'idle') {
        this.originalField = JSON.parse(JSON.stringify(this.fieldData))
        this.dropPuyos()
      }
    }
  },
  mounted () {
    this.loadCanvas()
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
