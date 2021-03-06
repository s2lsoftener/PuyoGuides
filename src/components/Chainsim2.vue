<template>
  <div id="chainsim" @mousedown="setMouseDown(true)" @mouseup="setMouseDown(false)">
    <p>おはようございます</p>
    <div class="game-container">
      <div id="game" ref="game"></div> <!-- PIXI.js app stage goes in here -->
    </div>
    <div v-if="gameLoaded"> <!-- ensures that the v-for loops execute -->
      <chainsim-puyo v-for="(sprite, index) in puyoDisplay" :key="`Puyo_${index}`" :index="index"
      :Simulator="Simulator" :gameState="gameState" :fieldData="fieldData" :sprite="puyoDisplay[index]"
      :puyoSprites="puyoSprites" :gameLoaded="gameLoaded"
      :simulationSpeed="simulationSpeed" :coordArray="coordArray" :needToReset="needToReset"
      :isMouseDown="isMouseDown" :frame="frame" :delta="delta"
      v-on:end-popping="togglePoppingCell" v-on:end-dropping="toggleDroppingCell" v-on:edit-puyo-field="editFieldData" />

      <chainsim-shadow-puyo v-for="(sprite, index) in shadowDisplay" :key="`Shadow_${index}`" :index="index"
      :Simulator="Simulator" :gameState="gameState" :shadowData="shadowData" :sprite="shadowDisplay[index]"
      :puyoSprites="puyoSprites" :gameLoaded="gameLoaded" />

      <chainsim-control-button v-for="(sprite, index) in fieldControls" :key="`Control_${index}`"
      :gameLoaded="gameLoaded" :fieldSprites="fieldSprites" :button="sprite" :buttonName="index"
      v-on:controlField="controlField" />

      <chainsim-garbagetray :garbage="garbage" :puyoSprites="puyoSprites" :gameLoaded="gameLoaded" :garbageDisplay="garbageDisplay"
      :frame="frame" :delta="delta" />

      <chainsim-scoredisplay :scoreDisplay="scoreDisplay" :score="score" :gameLoaded="gameLoaded" :fieldSprites="fieldSprites" />

      <chainsim-chain-count :chainLength="chainLength" :chainCountSprites="chainCountSprites" :gameLoaded="gameLoaded"
      :chainCountDisplay="chainCountDisplay" :frame="frame" :delta="delta" />

      <chainsim-cursor v-for="(sprite, index) in cursorDisplay" :key="`Cursor_${index}`"
      :gameLoaded="gameLoaded" :cursorData="cursorData" :sprite="cursorDisplay[index]" :index="index"
      :frame="frame" :delta="delta" :Simulator="Simulator" />

      <chainsim-arrow v-for="(sprite, index) in arrowDisplay" :key="`Arrow_${index}`"
      :gameLoaded="gameLoaded" :arrowData="arrowData" :sprite="arrowDisplay[index]" :index="index"
      :frame="frame" :delta="delta" :Simulator="Simulator" />
    </div>
    <br><p>{{ gameState }}</p>
    <p>{{ frame }}</p>
    <button @click="stopGame = !stopGame">Stop</button>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'
import Chainsim from '@/assets/js/chainsim'
import ChainsimPuyo from './ChainsimPuyo'
import ChainsimControlButton from './ChainsimControlButton'
import ChainsimGarbagetray from './ChainsimGarbagetray'
import ChainsimScoredisplay from './ChainsimScoredisplay'
import ChainsimChainCount from './ChainsimChainCount'
import ChainsimShadowPuyo from './ChainsimShadowPuyo'
import ChainsimCursor from './ChainsimCursor'
import ChainsimArrow from './ChainsimArrow'

let uniformMatrix = Chainsim.uniformMatrix // Generates a 2D matrix all filled with one value
let stringTo2dArray = Chainsim.stringTo2dArray // Converts 1D string to 2D matrix

let loader = PIXI.loader
let resources = PIXI.loader.resources
let Sprite = PIXI.Sprite

export default {
  name: 'Chainsim2',
  props: ['importedData'],
  components: {
    ChainsimPuyo,
    ChainsimControlButton,
    ChainsimGarbagetray,
    ChainsimScoredisplay,
    ChainsimChainCount,
    ChainsimShadowPuyo,
    ChainsimCursor,
    ChainsimArrow
  },
  data () {
    return {
      /* Settings */
      fieldSettings: {
        columns: 6,
        visibleRows: 12,
        hiddenRows: 1,
        totalRows: 13,
        puyoToClear: 4,
        colorBonus: [0, 3, 6, 12, 24],
        groupBonus: [0, 2, 3, 4, 5, 6, 7, 10],
        chainPower: [0, 8, 16, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 480, 512, 544, 576, 608, 640, 672],
        targetPoint: 70,
        scaling: 1
      },

      /* Chainsim logic */
      // Game states
      gameMode: 'editor', // editor, playable
      gameState: 'idle', // idle/playing -> dropping -> popping -> dropping/chainEnded ||

      // Field Arrays
      fieldData: [[]], // 2D string array with the main field representation
      fieldOriginal: [[]], // 2D array holding the original chain before the simulator starts
      fieldHistory: [], // Allows rewinding of a chain that's popping
      shadowData: [[]], // 2D string array denoting where transparent Puyos should go
      cursorData: [[]], // 2D numeric array to place a cursor (with an optional number)
      arrowData: [[]], // arrows ugh
      clearPuyosResult: [[]], // 2D string array. Result from clearPuyos(); assigned to fieldData
      dropPuyosResult: [[]], // 2D string array. Result from dropPuyos(); assigned to fieldData

      // Scoring.
      score: 0,
      stepScore: 0,
      garbage: 0,
      stepGarbage: 0,
      garbagePoints: 0,
      leftoverGarbagePoints: 0,
      chainLength: 0,

      // Animation data arrays
      poppingCells: [[]], // boolean 2D array. Which cells are undergoing a popping animation?
      droppingCells: [[]], // boolean 2D array. Which cells are undergoing a dropping animation?
      dropDistances: [[]], // integer 2D matrix. How many cells to drop?

      /* Chainsim Presentation */
      // Main display settings
      displayMode: 'simple',
      modeSettings: {
        simple: {
          width: 608,
          height: 854,
          antialias: true,
          transparent: false,
          backgroundColor: 0x061639,
          resolution: 1
        },
        full: {
          width: 872,
          height: 854,
          antialias: true,
          transparent: false,
          backgroundColor: 0x061639,
          resolution: 1
        }
      },
      app: undefined, // PIXI.js Application
      scaleFactor: 0.4,

      // Texture data
      texturesToLoad: [
        '/img/arle_bg.png',
        '/img/field.json',
        '/img/puyo.json',
        '/img/arrow.png',
        '/img/cursor.png',
        '/img/chain_font.json',
        '/img/edit_bubble.png'
      ],
      puyoSprites: {},
      fieldSprites: {},
      scoreSprites: {},
      chainCountSprites: {},

      // Displayed objects
      puyoDisplay: [],
      shadowDisplay: [],
      scoreDisplay: [],
      garbageDisplay: [],
      cursorDisplay: [],
      arrowDisplay: [],
      chainCountDisplay: {},
      fieldDisplay: {},

      /* Loader details */
      loadingText: 'Loading...',
      texturesLoaded: false,
      gameLoaded: false,

      // Controls
      fieldControls: {},
      simulationSpeed: 1,
      needToReset: false,
      isMouseDown: false,
      frame: 0,
      delta: 0,
      stopGame: false
    }
  },
  mounted () {
    this.initData()
    this.initGame()
  },
  methods: {
    initData: function () {
      this.fieldData = stringTo2dArray(this.importedData.fieldData, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.shadowData = stringTo2dArray(this.importedData.shadowData, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.cursorData = stringTo2dArray(this.importedData.cursorData, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.arrowData = stringTo2dArray(this.importedData.arrowData, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.poppingCells = uniformMatrix(false, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.droppingCells = uniformMatrix(false, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.dropDistances = uniformMatrix(0, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.clearPuyosResult = uniformMatrix('0', this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.dropPuyosResult = uniformMatrix('0', this.fieldSettings.totalRows, this.fieldSettings.columns)
    },
    initGame: function () {
      this.app = new PIXI.Application(this.modeSettings[this.displayMode])
      this.$refs.game.appendChild(this.app.view)

      let setup = () => {
        // Mark textures as loaded
        this.texturesLoaded = this.texturesToLoad.every((texture) => {
          return resources[texture] !== undefined
        })

        // Assign loaded spritesheets to vue data
        this.fieldSprites = resources['/img/field.json'].textures
        this.puyoSprites = resources['/img/puyo.json'].textures
        this.chainCountSprites = resources['/img/chain_font.json'].textures

        // Place sprites on the field
        this.initFieldDisplay()
        this.initScoreDisplay()
        this.initGameOverX()
        this.initPuyoDisplay()
        this.initGarbageDisplay()
        this.initFieldControls()
        this.initChainCounter()
        this.initShadowDisplay()
        this.initCursorDisplay()
        this.initArrowDisplay()

        // resize canvas
        this.$refs.game.childNodes[0].style.width = `${this.modeSettings.simple.width * this.scaleFactor}px`
        this.$refs.game.childNodes[0].style.width = `${this.modeSettings.simple.height * this.scaleFactor}px`

        // Marked game as loaded
        this.gameLoaded = true

        // Run the game loop
        this.app.ticker.add(delta => this.gameLoop(delta))
      }

      let loadProgressHandler = (loader, resource) => {
        console.log(`Loading: ${resource.url}`)
        console.log(`Progress: ${Math.floor(loader.progress)}%`)
      }

      // Check if textures have already been loaded
      this.texturesLoaded = this.texturesToLoad.every((texture) => {
        return resources[texture] !== undefined
      })
      if (this.texturesLoaded === false) {
        loader
          .add(this.texturesToLoad)
          .on('progress', loadProgressHandler)
          .load(setup)
      } else {
        loader
          .load(setup)
      }
    },
    initFieldDisplay: function () {
      // Character Background
      this.fieldDisplay.charBG = new Sprite(resources['/img/arle_bg.png'].texture)
      this.fieldDisplay.charBG.x = 17
      this.fieldDisplay.charBG.y = 63
      this.app.stage.addChild(this.fieldDisplay.charBG)

      // Top Border
      this.fieldDisplay.borderTop = new Sprite(this.fieldSprites['field_border_top.png'])
      this.fieldDisplay.borderTop.y = 12
      this.app.stage.addChild(this.fieldDisplay.borderTop)

      // Left border, top half
      this.fieldDisplay.borderLeftTop = new Sprite(this.fieldSprites['field_border_left_tophalf.png'])
      this.fieldDisplay.borderLeftTop.y = 64
      this.app.stage.addChild(this.fieldDisplay.borderLeftTop)

      // Left border, bottom half
      this.fieldDisplay.borderLeftBottom = new Sprite(this.fieldSprites['field_border_left_bottomhalf.png'])
      this.fieldDisplay.borderLeftBottom.y = 416
      this.app.stage.addChild(this.fieldDisplay.borderLeftBottom)

      // Right border, top half
      this.fieldDisplay.borderRightTop = new Sprite(this.fieldSprites['field_border_right_tophalf.png'])
      this.fieldDisplay.borderRightTop.x = 417
      this.fieldDisplay.borderRightTop.y = 64
      this.app.stage.addChild(this.fieldDisplay.borderRightTop)

      // Right border, bottom half
      this.fieldDisplay.borderRightBottom = new Sprite(this.fieldSprites['field_border_right_bottomhalf.png'])
      this.fieldDisplay.borderRightBottom.x = 417
      this.fieldDisplay.borderRightBottom.y = 416
      this.app.stage.addChild(this.fieldDisplay.borderRightBottom)

      // Bottom border
      this.fieldDisplay.borderBottom = new Sprite(this.fieldSprites['field_border_bottom.png'])
      this.fieldDisplay.borderBottom.y = 782
      this.app.stage.addChild(this.fieldDisplay.borderBottom)

      // Next Window Border
      this.fieldDisplay.nextWindowBorder = new Sprite(this.fieldSprites['next_border_1p.png'])
      this.fieldDisplay.nextWindowBorder.x = 456
      this.fieldDisplay.nextWindowBorder.y = 40
      this.app.stage.addChild(this.fieldDisplay.nextWindowBorder)

      // Next Window Inner
      this.fieldDisplay.nextWindowInner = new Sprite(this.fieldSprites['next_background_1p.png'])
      this.fieldDisplay.nextWindowInner.x = 456
      this.fieldDisplay.nextWindowInner.y = 40
      this.app.stage.addChild(this.fieldDisplay.nextWindowInner)
    },
    initScoreDisplay: function () {
      let startX = 150
      if (this.displayMode === 'full') {
        startX = 150
      } else if (this.displayMode === 'simple') {
        startX = 32
      }
      let spriteArray = []
      for (let i = 0; i < 8; i++) {
        spriteArray[i] = new Sprite(this.fieldSprites['score_0.png'])
        spriteArray[i].anchor.set(0.5)
        spriteArray[i].x = startX + spriteArray[i].width * 0.9 * i
        spriteArray[i].y = 815
        this.app.stage.addChild(spriteArray[i])
      }

      // Set scoreDisplay array
      this.scoreDisplay = spriteArray
    },
    initGameOverX: function () {
      this.fieldDisplay.redX = new Sprite(this.puyoSprites['death_X.png'])
      this.fieldDisplay.redX.anchor.set(0.5)
      this.fieldDisplay.redX.x = this.coordArray[1][2].x
      this.fieldDisplay.redX.y = this.coordArray[1][2].y
      this.app.stage.addChild(this.fieldDisplay.redX)
    },
    initPuyoDisplay: function () {
      let returnArray = []
      let spriteArray = []
      for (let y = 0; y < this.Field.totalRows; y++) {
        spriteArray[y] = []
        for (let x = 0; x < this.Field.columns; x++) {
          spriteArray[y][x] = new Sprite(this.puyoSprites['red_urdl.png'])
          spriteArray[y][x].anchor.set(0.5)
          spriteArray[y][x].x = this.coordArray[y][x].x
          spriteArray[y][x].y = this.coordArray[y][x].y
          this.app.stage.addChild(spriteArray[y][x])
          returnArray.push(spriteArray[y][x])
        }
      }
      this.puyoDisplay = returnArray
    },
    initGarbageDisplay: function () {
      if (this.displayMode === 'full') { // Display mode: full
        this.fieldDisplay.garbageTray = new Sprite(this.fieldSprites['garbage_tray.png'])
        this.fieldDisplay.garbageTray.x = 456
        this.fieldDisplay.garbageTray.y = 360
        this.app.stage.addChild(this.fieldDisplay.garbageTray)
      } else if (this.displayMode === 'simple') {
        this.fieldDisplay.garbageTray = new Sprite(this.fieldSprites['garbage_tray.png'])
        this.fieldDisplay.garbageTray.x = 316
        this.fieldDisplay.garbageTray.y = 795
        this.fieldDisplay.garbageTray.scale.set(0.7, 0.7)
        this.app.stage.addChild(this.fieldDisplay.garbageTray)
      }

      if (this.displayMode === 'full') {
        let spriteArray = []
        let startX = 468
        for (let i = 0; i < this.Field.columns; i++) {
          spriteArray[i] = new Sprite(this.puyoSprites['crown.png'])
          spriteArray[i].x = startX + spriteArray[i].width * i
          spriteArray[i].origX = startX + spriteArray[i].width * i
          spriteArray[i].y = 350
          this.app.stage.addChild(spriteArray[i])
        }
        this.garbageDisplay = spriteArray
      } else if (this.displayMode === 'simple') {
        let spriteArray = []
        let startX = 324
        for (let i = 0; i < this.Field.columns; i++) {
          spriteArray[i] = new Sprite(this.puyoSprites['crown.png'])
          spriteArray[i].scale.set(0.7, 0.7)
          spriteArray[i].x = startX + spriteArray[i].width * i
          spriteArray[i].origX = startX + spriteArray[i].width * i
          spriteArray[i].y = 790
          this.app.stage.addChild(spriteArray[i])
        }
        this.garbageDisplay = spriteArray
      }
    },
    initFieldControls: function () {
      let startY = 360
      let height
      let i = 0

      this.fieldControls.reset = new Sprite(this.fieldSprites['btn_reset.png'])
      this.fieldControls.reset.x = 452
      this.fieldControls.reset.y = startY
      this.fieldControls.reset.interactive = true
      this.fieldControls.reset.buttonMode = true
      this.app.stage.addChild(this.fieldControls.reset)
      height = this.fieldControls.reset.height

      this.fieldControls.pause = new Sprite(this.fieldSprites['btn_pause.png'])
      this.fieldControls.pause.x = 528
      this.fieldControls.pause.y = startY + height * i
      this.fieldControls.pause.interactive = true
      this.fieldControls.pause.buttonMode = true
      this.app.stage.addChild(this.fieldControls.pause)
      i += 1

      this.fieldControls.play = new Sprite(this.fieldSprites['btn_play.png'])
      this.fieldControls.play.x = 452
      this.fieldControls.play.y = startY + height * i
      this.fieldControls.play.interactive = true
      this.fieldControls.play.buttonMode = true
      this.app.stage.addChild(this.fieldControls.play)

      this.fieldControls.auto = new Sprite(this.fieldSprites['btn_auto.png'])
      this.fieldControls.auto.x = 528
      this.fieldControls.auto.y = startY + height * i
      this.fieldControls.auto.interactive = true
      this.fieldControls.auto.buttonMode = true
      this.app.stage.addChild(this.fieldControls.auto)
      i += 1

      this.fieldControls.edit = new Sprite(this.fieldSprites['btn_edit.png'])
      this.fieldControls.edit.x = 490
      this.fieldControls.edit.y = startY + i * this.fieldControls.edit.height /* + this.fieldControls.edit.height / 3 */
      this.fieldControls.edit.interactive = true
      this.fieldControls.edit.buttonMode = true
      this.app.stage.addChild(this.fieldControls.edit)

      this.fieldDisplay.editBubble = new Sprite(resources['/img/edit_bubble.png'].texture)
      this.fieldDisplay.editBubble.x = 17
      this.fieldDisplay.editBubble.y = 580
      // this.app.stage.addChild(this.fieldDisplay.editBubble)
    },
    initChainCounter: function () {
      let startX = 412
      let startY = 612

      this.chainCountSprites.firstDigit = new Sprite(this.chainCountSprites['chain_1.png'])
      this.chainCountSprites.firstDigit.x = startX
      this.chainCountSprites.firstDigit.y = startY
      this.chainCountSprites.firstDigit.scale.set(0.85, 0.85)

      this.chainCountSprites.secondDigit = new Sprite(this.chainCountSprites['chain_0.png'])
      this.chainCountSprites.secondDigit.x = startX + 40
      this.chainCountSprites.secondDigit.y = startY
      this.chainCountSprites.secondDigit.scale.set(0.85, 0.85)

      this.chainCountSprites.chainText = new Sprite(this.chainCountSprites['chain_text.png'])
      this.chainCountSprites.chainText.x = startX + 84
      this.chainCountSprites.chainText.y = startY + 10
      this.chainCountSprites.chainText.scale.set(0.85, 0.85)

      this.chainCountDisplay = new PIXI.Container()
      this.chainCountDisplay.addChild(this.chainCountSprites.firstDigit)
      this.chainCountDisplay.addChild(this.chainCountSprites.secondDigit)
      this.chainCountDisplay.addChild(this.chainCountSprites.chainText)
      this.app.stage.addChild(this.chainCountDisplay)
    },
    initShadowDisplay: function () {
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
          this.shadowDisplay.push(spriteArray[y][x])
        }
      }
    },
    initCursorDisplay: function () {
      let spriteArray = []
      for (let y = 0; y < this.fieldData.length; y++) {
        spriteArray[y] = []
        for (let x = 0; x < this.fieldData[0].length; x++) {
          spriteArray[y][x] = new Sprite(resources['/img/cursor.png'].texture)
          spriteArray[y][x].anchor.set(0.5)
          spriteArray[y][x].x = this.coordArray[y][x].x
          spriteArray[y][x].y = this.coordArray[y][x].y
          this.app.stage.addChild(spriteArray[y][x])
          this.cursorDisplay.push(spriteArray[y][x])
        }
      }
    },
    initArrowDisplay: function () {
      let spriteArray = []
      for (let y = 0; y < this.fieldData.length; y++) {
        spriteArray[y] = []
        for (let x = 0; x < this.fieldData[0].length; x++) {
          spriteArray[y][x] = new Sprite(resources['/img/arrow.png'].texture)
          spriteArray[y][x].anchor.set(0.5)
          spriteArray[y][x].x = this.coordArray[y][x].x
          spriteArray[y][x].y = this.coordArray[y][x].y
          spriteArray[y][x].scale.set(0.9, 0.9)
          this.app.stage.addChild(spriteArray[y][x])
          this.arrowDisplay.push(spriteArray[y][x])
        }
      }
    },
    gameLoop: function (delta) {
      if (this.stopGame === false) {
        this.frame += this.simulationSpeed
        this.delta = delta
      }
    },
    setMouseDown: function (bool) {
      this.isMouseDown = bool // true, false
    },
    // Simulation controls
    controlField: function (control) { // expects a string
      if (control === 'reset') {
        if (this.gameState === 'chainStopped') {
          this.resetField()
        } else if (this.gameState !== 'idle') {
          this.needToReset = true
        }
      } else if (control === 'back') {
        console.log(`I didn't make a function for back yet.`)
      } else if (control === 'pause') {
        this.chainAutoPlay = false
      } else if (control === 'play') {
        if (this.gameState === 'idle') {
          this.fieldOriginal = JSON.parse(JSON.stringify(this.fieldData))
        }
        this.playStep()
      } else if (control === 'auto') {
        if (this.gameState === 'idle') {
          this.fieldOriginal = JSON.parse(JSON.stringify(this.fieldData))
        }
        this.playChain()
      }
    },
    editFieldData: function (cell) {
      this.fieldData[cell.y].splice(cell.x, 1, cell.puyo)
      // this.fieldData[Math.floor(Math.random() * 13)].splice(Math.floor(Math.random() * 6), 1, ['R', 'B', 'G', 'Y', 'P'][Math.floor(Math.random() * 4)])
    },
    togglePoppingCell: function (cell) { // expects object of form: {x:int, y:int, bool:boolean}
      this.poppingCells[cell.y].splice(cell.x, 1, cell.bool) // Have to use array methods or this won't be reactive.
    },
    toggleDroppingCell: function (cell) { // expects object of form: {x:int, y:int, bool:boolean}
      this.droppingCells[cell.y].splice(cell.x, 1, cell.bool) // Have to use array methods or this won't be reactive.
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
      this.gameState = 'idle'
      this.score = 0
      this.stepScore = 0
      this.garbage = 0
      this.stepGarbage = 0
      this.garbagePoints = 0
      this.leftoverGarbagePoints = 0
      this.chainLength = 0
      this.$nextTick(() => {
        this.fieldData = this.fieldOriginal
        this.needToReset = false
      })
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
        this.gameState = 'dropping' // When child component hears 'dropping', it'll trigger drop animations.
        console.log('Set gameState to "dropping"')
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
            popAnimationArray[y].splice(x, 1, true)
          } else {
            popAnimationArray[y].splice(x, 1, false)
          }
        }
      }
      this.poppingCells = popAnimationArray
      this.clearPuyosResult = Chainsim.mapToStringArray(clearResult.newField.map)

      // If there's no pops to do, set gameState to 'idle'. Otherwise, set 'popping'
      if (clearResult.popData.poppingGroups.length === 0) {
        this.gameState = 'chainStopped'
        this.fieldHistory.push(JSON.parse(JSON.stringify(this.fieldData)))
        console.log('Set gameState to "idle"')
      } else {
        this.calculateScore(clearResult.popData)
        this.gameState = 'popping'
        this.fieldHistory.push(JSON.parse(JSON.stringify(this.fieldData)))
        console.log('Set gameState to "popping"')
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
    playStep: function () {
      if (this.gameState === 'idle') {
        this.fieldHistory.push(JSON.parse(JSON.stringify(this.fieldData)))
        this.chainAutoPlay = false
        this.dropPuyos()
      } else if (this.gameState === 'chainStopped') {
        this.chainAutoPlay = false
        this.dropPuyos()
      }
    },
    playChain: function () {
      if (this.gameState === 'idle') {
        this.fieldHistory.push(JSON.parse(JSON.stringify(this.fieldData)))
        this.chainAutoPlay = true
        this.dropPuyos()
      } else if (this.gameState === 'chainStopped') {
        this.chainAutoPlay = true
        this.dropPuyos()
      }
    }
  },
  computed: {
    Field: function () {
      return new Chainsim.Field(this.fieldSettings, this.fieldData)
    },
    coordArray: function () {
      // Used to correctly place a sprite on the field matrix.
      // Anchor points are set to the middle of the Puyo.
      let coord = []
      for (let y = 0; y < this.Field.totalRows; y++) {
        coord[y] = []
        for (let x = 0; x < this.Field.columns; x++) {
          coord[y][x] = {
            x: (x * this.Field.cellWidth) + (this.Field.cellWidth / 2) + 25,
            y: (y * this.Field.cellHeight) + (this.Field.cellHeight / 2) + 4
          }
        }
      }
      return coord
    },
    Simulator: function () { // Contains simulator state data to pass on to child components
      return {
        gameState: this.gameState,
        Field: this.Field,
        poppingCells: this.poppingCells,
        droppingCells: this.droppingCells,
        dropDistances: this.dropDistances
      }
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
      if (this.droppingCells.length === this.Field.totalRows) {
        if (this.droppingCells[0].length === this.Field.columns) {
          for (let y = 0; y < this.Field.totalRows; y++) {
            for (let x = 0; x < this.Field.columns; x++) {
              if (this.droppingCells[y][x] === true) {
                return true // If just one cell is still dropping, return true. Animations are ongoing.
              }
            }
          }
        }
      }
      return false // If none of the cells are dropping, return false. Animations complete.
    }
  },
  watch: {
    gameState: function (newVal, oldVal) {
      this.frame = 0
      if (newVal !== 'dropping' && oldVal === 'dropping') {
        console.log('Resetting drop distances to 0')
        for (let y = 0; y < this.dropDistances.length; y++) {
          for (let x = 0; x < this.dropDistances[0].length; x++) {
            this.dropDistances[y].splice(x, 1, 0)
          }
        }
      }
    },
    isPopping: function (newVal, oldVal) {
      if (newVal === false && oldVal === true) {
        if (this.needToReset === true) {
          console.log('Resetting field to prior state.')
          this.resetField()
          this.needToReset = false
        } else {
          this.fieldData = this.clearPuyosResult
          console.log('set cleared puyo field')
          this.dropPuyos()
        }
      }
    },
    isDropping: function (newVal, oldVal) {
      if (newVal === false && oldVal === true) {
        if (this.needToReset === true) {
          console.log('Resetting field to prior state.')
          this.resetField()
          this.needToReset = false
        } else {
          this.fieldData = this.dropPuyosResult
          console.log('Dropped the new puyo field')
          if (this.chainAutoPlay === true) {
            this.clearPuyos()
          } else {
            this.gameState = 'chainStopped'
          }
        }
      }
    }
  }
}
</script>

<style>
#chainsim {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
</style>
