<template>
  <div class="chainsim">
    <h1>Chainsim page.</h1>
    <p>
      Canvas should appear below.
    </p>
    <div id="game" ref="game">
      <div class="loading-progress" v-if="!spritesheetLoaded">
        <p><img class="loading-wheel" src="/img/save_wheel.png" style="vertical-align: middle">{{ loadingText }}</p>
      </div>
    </div>
    <chainsim-puyo v-for="(sprite, index) in spriteMatrix1D" :key="`Puyo_${index}`" :index="index"
    :Simulator="Simulator" :fieldState="fieldState" :fieldData="fieldData" :sprite="spriteMatrix1D[index]"
    :spritesheet="sprites" :resources="pixiResources" :spritesheetLoaded="spritesheetLoaded"
    :simulationSpeed="simulationSpeed" :coordArray="coordArray"
    v-on:end-popping="togglePoppingCell" v-on:end-dropping="toggleDroppingCell" v-on:edit-puyo-field="editFieldData" />
    <chainsim-shadow-puyo v-for="(sprite, index) in shadowSpriteMatrix1D" :key="`Shadow_${index}`" :index="index"
    :Simulator="Simulator" :fieldState="fieldState" :shadowData="shadowData" :sprite="shadowSpriteMatrix1D[index]"
    :spritesheet="sprites" :resources="pixiResources" :spritesheetLoaded="spritesheetLoaded"
    v-on:end-popping="togglePoppingCell" v-on:end-dropping="toggleDroppingCell" v-on:edit-puyo-field="editFieldData" />
    <chainsim-scoredisplay :scoreDisplay="scoreDisplay" :score="score" :spritesheetLoaded="spritesheetLoaded" :fieldSprites="fieldSprites" />
    <chainsim-garbagetray :garbage="garbage" :spritesheet="sprites" :spritesheetLoaded="spritesheetLoaded" :garbageDisplay="garbageDisplay" />
    <br>
    <button @click="editFieldData">Change Puyo</button>
    <button @click="playStep">Play Step</button>
    <button @click="playChain">Play Chain</button>
    <button @click="skipChain">Skip Chain</button>
    <button @click="moveTestPuyo">Move Test Puyo</button>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'
import { TweenMax } from 'gsap' // eslint-disable-line no-unused-vars
import PixiPlugin from 'gsap/PixiPlugin' // eslint-disable-line no-unused-vars
import Chainsim from '@/assets/js/chainsim'
import ChainsimPuyo from './ChainsimPuyo'
import ChainsimShadowPuyo from './ChainsimShadowPuyo'
import ChainsimScoredisplay from './ChainsimScoredisplay'
import ChainsimGarbagetray from './ChainsimGarbagetray'

let loader = PIXI.loader
let resources = PIXI.loader.resources
let Sprite = PIXI.Sprite

export default {
  name: 'Chainsim',
  components: {
    ChainsimPuyo,
    ChainsimShadowPuyo,
    ChainsimScoredisplay,
    ChainsimGarbagetray
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
      fieldHistory: [], // This doesn't really work correctly yet. Need to create state handling for chainsim state.
      shadowData: [['0', '0', '0', '0', '0', '0'], // Placeholder field data for testing purposes
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', 'B', 'R', 'P'],
        ['0', '0', '0', '0', '0', 'G'],
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
      spriteMatrix: [[]],
      shadowSpriteMatrix: [[]],
      cursorString: '000000000000111010010101000010101010000101100101000000010101010010010001101010',
      simulationSpeed: 1,
      chainAutoPlay: true,

      // Scoring
      score: 0,
      stepScore: 0,
      garbage: 0,
      stepGarbage: 0,
      garbagePoints: 0,
      leftoverGarbagePoints: 0,
      chainLength: 0,

      // Sprites
      sprites: {},
      fieldSprites: {},
      fieldObjects: {},
      scoreDisplay: [],
      scoreSprites: {},
      garbageDisplay: [],

      // Loader stuff
      loadingText: 'Loading canvas...',
      spritesheetLoaded: false
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
      colorBonus: [0, 3, 6, 12, 24],
      groupBonus: [0, 2, 3, 4, 5, 6, 7, 10],
      chainPower: [0, 8, 16, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480, 512, 544, 576, 608, 640, 672],
      targetPoint: 70,
      scaling: 1
    }
    this.fieldData = [['R', '0', '0', '0', '0', '0'],
      ['P', '0', '0', '0', '0', '0'],
      ['G', '0', '0', '0', '0', '0'],
      ['B', '0', '0', '0', '0', '0'],
      ['R', '0', '0', 'B', '0', '0'],
      ['Y', '0', '0', 'B', '0', '0'],
      ['G', 'Y', '0', 'B', '0', '0'],
      ['G', 'Y', 'P', 'B', '0', 'R'],
      ['Y', 'P', 'P', 'R', '0', 'R'],
      ['Y', 'Y', 'P', 'J', 'R', 'Y'],
      ['G', 'R', 'B', 'G', 'Y', 'Y'],
      ['G', 'G', 'R', 'B', 'G', 'G'],
      ['R', 'R', 'B', 'B', 'G', 'Y']]
    this.fieldData = [['J', 'J', 'P', 'B', 'R', 'P'],
      ['R', 'Y', 'Y', 'B', 'R', 'G'],
      ['G', 'Y', 'Y', 'P', 'B', 'R'],
      ['B', 'P', 'P', 'B', 'R', 'G'],
      ['R', 'G', 'Y', 'P', 'B', 'G'],
      ['G', 'Y', 'P', 'B', 'P', 'G'],
      ['R', 'G', 'Y', 'P', 'B', 'P'],
      ['R', 'G', 'Y', 'P', 'B', 'P'],
      ['R', 'B', 'B', 'G', 'R', 'G'],
      ['B', 'P', 'Y', 'B', 'G', 'G'],
      ['G', 'R', 'P', 'Y', 'B', 'R'],
      ['G', 'R', 'P', 'Y', 'B', 'R'],
      ['G', 'R', 'P', 'Y', 'B', 'R']]
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
        width: 872, // 608
        height: 854, // 842
        antialias: true,
        transparent: false,
        backgroundColor: 0x061639,
        resolution: 1
      })
    },
    popups: function () {
      return resources['/img/popups.json'].textures
    },
    coordArray: function () {
      // Used to correctly place a sprite on the field matrix.
      // Anchor points are set to the middle of the Puyo.
      let coord = []
      for (let y = 0; y < this.Field.totalRows; y++) {
        coord[y] = []
        for (let x = 0; x < this.Field.columns; x++) {
          coord[y][x] = {
            x: (x * this.Field.cellWidth) + (this.Field.cellWidth / 2) + 24,
            y: (y * this.Field.cellHeight) + (this.Field.cellHeight / 2) + 4
          }
        }
      }
      return coord
    },
    spriteMatrix1D: function () {
      let matrix1D = []
      for (let y = 0; y < this.spriteMatrix.length; y++) {
        for (let x = 0; x < this.spriteMatrix[0].length; x++) {
          matrix1D.push(this.spriteMatrix[y][x])
        }
      }
      return matrix1D
    },
    shadowSpriteMatrix1D: function () {
      let matrix1D = []
      for (let y = 0; y < this.shadowSpriteMatrix.length; y++) {
        for (let x = 0; x < this.shadowSpriteMatrix[0].length; x++) {
          matrix1D.push(this.shadowSpriteMatrix[y][x])
        }
      }
      return matrix1D
    },
    pixiResources: function () {
      return resources
    }
  },
  methods: {
    moveTestPuyo: function () {
      TweenMax.to(this.spriteMatrix[8][0], 3, { pixi: { y: '+=240px' } })
    },
    // Canvas methods
    loadCanvas: function () { // Chains ino makeFieldSprites
      // Add Canvas to HTML
      this.$refs.game.appendChild(this.app.view)
      // Setup function
      let setup = () => {
        this.makeFieldSprites() // Chains into makeShadowArray()
      }

      // Set loading message
      this.loadingText = 'Loading...'

      // Load Sprites
      if (resources['/img/puyo.json'] === undefined ||
          resources['/img/popups.json'] === undefined ||
          resources['/img/field.json'] === undefined) {
        console.log('Spritesheets not loaded yet. Loading...')
        loader.add('/img/arle_bg.png')
        loader.add('/img/field.json')
        loader.add('/img/puyo.json')
        loader.add('/img/popups.json')
        this.canvasLoaded = true
        loader.load(setup)
      } else {
        console.log('Spritesheet already loaded')
        this.canvasLoaded = true
        loader.load(setup)
      }
    },
    makeFieldSprites: function () { // Chains into makeScoreDisplay
      // Make field sprites available
      this.fieldSprites = resources['/img/field.json'].textures

      // Character Background
      this.fieldObjects.charBG = new Sprite(resources['/img/arle_bg.png'].texture)
      this.fieldObjects.charBG.x = 17
      this.fieldObjects.charBG.y = 63
      this.app.stage.addChild(this.fieldObjects.charBG)

      // Top Border
      this.fieldObjects.borderTop = new Sprite(this.fieldSprites['field_border_top.png'])
      this.fieldObjects.borderTop.y = 12
      this.app.stage.addChild(this.fieldObjects.borderTop)

      // Left border, top half
      this.fieldObjects.borderLeftTop = new Sprite(this.fieldSprites['field_border_left_tophalf.png'])
      this.fieldObjects.borderLeftTop.y = 64
      this.app.stage.addChild(this.fieldObjects.borderLeftTop)

      // Left border, bottom half
      this.fieldObjects.borderLeftBottom = new Sprite(this.fieldSprites['field_border_left_bottomhalf.png'])
      this.fieldObjects.borderLeftBottom.y = 416
      this.app.stage.addChild(this.fieldObjects.borderLeftBottom)

      // Right border, top half
      this.fieldObjects.borderRightTop = new Sprite(this.fieldSprites['field_border_right_tophalf.png'])
      this.fieldObjects.borderRightTop.x = 417
      this.fieldObjects.borderRightTop.y = 64
      this.app.stage.addChild(this.fieldObjects.borderRightTop)

      // Right border, bottom half
      this.fieldObjects.borderRightBottom = new Sprite(this.fieldSprites['field_border_right_bottomhalf.png'])
      this.fieldObjects.borderRightBottom.x = 417
      this.fieldObjects.borderRightBottom.y = 416
      this.app.stage.addChild(this.fieldObjects.borderRightBottom)

      // Bottom border
      this.fieldObjects.borderBottom = new Sprite(this.fieldSprites['field_border_bottom.png'])
      this.fieldObjects.borderBottom.y = 782
      this.app.stage.addChild(this.fieldObjects.borderBottom)

      // Next Window Border
      this.fieldObjects.nextWindowBorder = new Sprite(this.fieldSprites['next_border_1p.png'])
      this.fieldObjects.nextWindowBorder.x = 456
      this.fieldObjects.nextWindowBorder.y = 40
      this.app.stage.addChild(this.fieldObjects.nextWindowBorder)

      // Next Window Inner
      this.fieldObjects.nextWindowInner = new Sprite(this.fieldSprites['next_background_1p.png'])
      this.fieldObjects.nextWindowInner.x = 456
      this.fieldObjects.nextWindowInner.y = 40
      this.app.stage.addChild(this.fieldObjects.nextWindowInner)

      // Garbage Tray (opponent)
      this.fieldObjects.garbageTray = new Sprite(this.fieldSprites['garbage_tray.png'])
      this.fieldObjects.garbageTray.x = 456
      this.fieldObjects.garbageTray.y = 360
      this.app.stage.addChild(this.fieldObjects.garbageTray)

      // Chain into makeScoreDisplay
      this.makeScoreDisplay()
    },
    makeScoreDisplay: function () { // Chains into makeSpriteArray
      let startX = 150
      let spriteArray = []
      for (let i = 0; i < 8; i++) {
        spriteArray[i] = new Sprite()
        spriteArray[i].anchor.set(0.5)
        spriteArray[i].x = startX + 40 * 0.9 * i
        spriteArray[i].y = 815
        this.app.stage.addChild(spriteArray[i])
      }

      // Set scoreDisplay array
      this.scoreDisplay = spriteArray

      // Chain into makePuyoSprites
      this.makePuyoSprites()
    },
    makePuyoSprites: function () { // Chains into makeGarbageSprites
      // Make Puyo sprites available
      this.sprites = resources['/img/puyo.json'].textures

      // Make gameover X
      this.fieldObjects.redX = new Sprite(this.sprites['death_X.png'])
      this.fieldObjects.redX.anchor.set(0.5)
      this.fieldObjects.redX.x = this.coordArray[1][2].x
      this.fieldObjects.redX.y = this.coordArray[1][2].y
      this.app.stage.addChild(this.fieldObjects.redX)

      let spriteArray = []
      for (let y = 0; y < this.fieldData.length; y++) {
        spriteArray[y] = []
        for (let x = 0; x < this.fieldData[0].length; x++) {
          spriteArray[y][x] = new Sprite()
          spriteArray[y][x].anchor.set(0.5)
          spriteArray[y][x].x = this.coordArray[y][x].x
          spriteArray[y][x].y = this.coordArray[y][x].y
          this.app.stage.addChild(spriteArray[y][x])
        }
      }
      this.spriteMatrix = spriteArray
      this.makeGarbageSprites()
    },
    makeGarbageSprites: function () { // Chains into makeShadowSpriteArray
      let spriteArray = []
      let startX = 468
      for (let i = 0; i < this.Field.columns; i++) {
        spriteArray[i] = new Sprite(this.sprites['crown.png'])
        spriteArray[i].x = startX + spriteArray[i].width * i
        spriteArray[i].y = 350
        this.app.stage.addChild(spriteArray[i])
      }
      this.garbageDisplay = spriteArray
      this.makeShadowSpriteArray()
    },
    makeShadowSpriteArray: function () { // chains into makeChainPopupSprites
      let spriteArray = []
      for (let y = 0; y < this.fieldData.length; y++) {
        spriteArray[y] = []
        for (let x = 0; x < this.fieldData[0].length; x++) {
          spriteArray[y][x] = new Sprite()
          spriteArray[y][x].anchor.set(0.5)
          spriteArray[y][x].alpha = 0.4
          spriteArray[y][x].x = this.coordArray[y][x].x
          spriteArray[y][x].y = this.coordArray[y][x].y
          this.app.stage.addChild(spriteArray[y][x])
        }
      }
      this.shadowSpriteMatrix = spriteArray
      this.makeChainPopupSprites()
    },
    makeChainPopupSprites: function () { // chains into setSpritesheetLoaded
      let chainPopups = {}
      chainPopups.firstDigit = new Sprite()
      chainPopups.secondDigit = new Sprite()
      chainPopups.rensa = new Sprite()
      this.setSpritesheetLoaded()
    },
    setSpritesheetLoaded: function () {
      this.spritesheetLoaded = true
    },
    // Simulation core
    editFieldData: function (cell) {
      // this.fieldData[cell.y].splice(cell.x, 1, cell.puyo)
      this.fieldData[Math.floor(Math.random() * 13)].splice(Math.floor(Math.random() * 6), 1, ['R', 'B', 'G', 'Y', 'P'][Math.floor(Math.random() * 4)])
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
        this.fieldState = 'dropping' // When child component hears 'dropping', it'll trigger drop animations.
        console.log('Set fieldState to "dropping"')
      }
    },
    clearPuyos: function () {
      let clearResult = Chainsim.Simulate.clearPuyos(this.Field)

      // Create an array that tracks which cells are animating.
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
        this.fieldState = 'idle'
        this.fieldHistory.push(JSON.parse(JSON.stringify(this.fieldData)))
        console.log('Set fieldState to "idle"')
      } else {
        this.calculateScore(clearResult.popData)
        this.fieldHistory.push(JSON.parse(JSON.stringify(this.fieldData)))
        this.fieldState = 'popping'
        console.log('Set fieldState to "popping"')
      }
    },
    calculateScore: function (popData) {
      this.chainLength += 1
      let uniqueColors = [...new Set(popData.poppingColors)]
      console.log(uniqueColors)
      let CB = this.fieldSettings.colorBonus[uniqueColors.length - 1]
      let CP = this.fieldSettings.chainPower[this.chainLength - 1]
      let GB = 0 // group bonus
      let PC = 0 // number of puyo cleared in chain
      for (let g = 0; g < popData.poppingGroups.length; g++) {
        let puyoInGroup = popData.poppingGroups[g].length
        PC += puyoInGroup
        if (puyoInGroup >= 11) {
          GB += this.fieldSettings.groupBonus[this.fieldSettings.groupBonus.length - 1]
        } else {
          GB += this.fieldSettings.groupBonus[puyoInGroup - 4]
        }
      }

      let totalBonus = CP + CB + GB
      if (totalBonus < 1) {
        totalBonus = 1
      } else if (totalBonus > 999) {
        totalBonus = 999
      }

      this.stepScore = (10 * PC) * (totalBonus)
      this.score += this.stepScore

      this.calculateGarbage()
    },
    calculateGarbage: function () {
      this.garbagePoints = this.stepScore / this.fieldSettings.targetPoint + this.leftoverGarbagePoints
      this.stepGarbage = Math.floor(this.garbagePoints)
      this.leftoverGarbagePoints = this.garbagePoints - this.stepGarbage
      this.garbage += this.stepGarbage
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
      this.fieldState = 'idle'
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
      this.fieldState = 'idle'
      this.$emit('unset-reset-field', false)
      this.$nextTick(() => {
        this.fieldData = this.originalField
      })
    },
    playStep: function () {
      if (this.fieldState === 'idle') {
        this.fieldHistory.push(JSON.parse(JSON.stringify(this.fieldData)))
        this.chainAutoPlay = false
        this.simulationSpeed = 1
        this.dropPuyos()
      }
    },
    playChain: function () {
      if (this.fieldState === 'idle') {
        this.fieldHistory.push(JSON.parse(JSON.stringify(this.fieldData)))
        this.chainAutoPlay = true
        this.simulationSpeed = 1
        this.dropPuyos()
      }
    },
    skipChain: function () {
      if (this.fieldState === 'idle') {
        this.fieldHistory.push(JSON.parse(JSON.stringify(this.fieldData)))
        this.chainAutoPlay = true
        this.simulationSpeed = 5
        this.dropPuyos()
      }
    }
  },
  mounted () {
    this.loadCanvas()
  },
  watch: {
    isPopping: function (newVal, oldVal) {
      if (newVal === false && oldVal === true) {
        if (this.toggleResetField === true) {
          console.log('Resetting field to prior state.')
          this.resetField()
        } else {
          this.fieldData = this.clearPuyosResult
          console.log('set cleared puyo field')
          this.dropPuyos()
        }
      }
    },
    isDropping: function (newVal, oldVal) {
      if (newVal === false && oldVal === true) {
        if (this.toggleResetField === true) {
          console.log('Resetting field to prior state.')
          this.resetField()
        } else {
          this.fieldData = this.dropPuyosResult
          console.log('Dropped the new puyo field')
          if (this.chainAutoPlay === true) {
            this.clearPuyos()
          } else {
            this.fieldState = 'idle'
          }
        }
      }
    },
    fieldState: function (newVal, oldVal) {
      console.log(newVal)
      console.log(oldVal)
      if (newVal !== 'dropping' && oldVal === 'dropping') {
        console.log('Resetting drop distances to 0')
        for (let y = 0; y < this.dropDistances.length; y++) {
          for (let x = 0; x < this.dropDistances[0].length; x++) {
            this.dropDistances[y].splice(x, 1, 0)
          }
        }
      }
    }
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

#game {
  position: relative;
  width: auto;
  height: auto;
}

.loading-progress {
  position: absolute;
  top: 0;
  width: 100%;
  text-align: center;
}

.loading-progress p {
  font-weight: bold;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.7rem;
  line-height: 0;
  color: white;
  text-shadow: 2px 2px black;
  vertical-align: middle;
}

.loading-wheel {
  width: 3rem;
  height: 3rem;
  animation: rotation 2s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
