<template>
  <div id="chainsim" @mousedown="setMouseDown(true)" @mouseup="setMouseDown(false)">
    <p>ugh...</p>
    <div class="game-container">
      <div id="game" ref="game"></div> <!-- PIXI.js app stage goes in here -->
    </div>
    <div v-if="gameLoaded"> <!-- ensures that the v-for loops execute -->
      <!-- <chainsim-puyo v-for="(sprite, index) in puyoDisplay" :key="`Puyo_${index}`" :index="index"
      :Simulator="Simulator" :gameState="gameState" :fieldData="fieldData" :sprite="puyoDisplay[index]"
      :puyoSprites="puyoSprites" :gameLoaded="gameLoaded"
      :simulationSpeed="simulationSpeed" :coordArray="coordArray" :needToReset="needToReset"
      :isMouseDown="isMouseDown" :frame="frame" :delta="delta"
      v-on:end-popping="togglePoppingCell" v-on:end-dropping="toggleDroppingCell" v-on:edit-puyo-field="editFieldData" /> -->

      <chainsim-control-button v-for="(sprite, index) in fieldControls" :key="`Control_${index}`"
      :gameLoaded="gameLoaded" :fieldSprites="fieldSprites" :button="sprite" :buttonName="index"
      v-on:controlField="controlField" />

      <chainsim-garbagetray :garbage="garbage" :puyoSprites="puyoSprites" :gameLoaded="gameLoaded" :garbageDisplay="garbageDisplay"
      :frame="frame" :delta="delta" />

      <chainsim-scoredisplay :scoreDisplay="scoreDisplay" :score="score" :gameLoaded="gameLoaded" :fieldSprites="fieldSprites" />

      <chainsim-chain-count :chainLength="chainLength" :chainCountSprites="chainCountSprites" :gameLoaded="gameLoaded"
      :chainCountDisplay="chainCountDisplay" :frame="frame" :delta="delta" />
    </div>
    <br><p>{{ gameState }}</p>
    <p>Current frame: {{ frame }}, stopGame: {{ stopGame }}</p>
    <p>isDropping: {{ isDropping }}</p>
    <p>isPopping: {{ isPopping }}</p><br><br>
    <button @click="stopGame = !stopGame">Pause</button><br><br>
    <button @click="setDropData">Set drop data</button>
    <button @click="gameState = 'dropping'">DropPuyos?</button> <br> <br>
    <button @click="setPopData">Set Pop data</button>
    <button @click="gameState = 'popping'">Pop Puyos</button>
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
import * as BezierEasing from 'bezier-easing'

const uniformMatrix = Chainsim.uniformMatrix // Generates a 2D matrix all filled with one value
const stringTo2dArray = Chainsim.stringTo2dArray // Converts 1D string to 2D matrix

const loader = PIXI.loader
const resources = PIXI.loader.resources
const Sprite = PIXI.Sprite

const Puyo = {
  Red: Chainsim.Constants.Puyo.Red, // R
  Green: Chainsim.Constants.Puyo.Green, // G
  Blue: Chainsim.Constants.Puyo.Blue, // B
  Yellow: Chainsim.Constants.Puyo.Yellow, // Y
  Purple: Chainsim.Constants.Puyo.Purple, // P
  Garbage: Chainsim.Constants.Puyo.Nuisance, // J
  None: Chainsim.Constants.Puyo.None // '0'
}

export default {
  name: 'Chainsim3',
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
      connectionData: [[]],
      colorNameData: [[]],
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
      dropTimings: [[]],

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
      scaleFactor: 0.45,

      // Texture data
      texturesToLoad: [
        '/img/arle_bg.png',
        '/img/field.json',
        '/img/puyo.json',
        '/img/arrow.png',
        '/img/cursor.png',
        '/img/chain_font.json',
        '/img/edit_bubble.png',
        '/img/touch_disabler.png'
      ],
      puyoSprites: {},
      fieldSprites: {},
      scoreSprites: {},
      chainCountSprites: {},

      // Displayed objects
      puyoDisplay: [[]],
      shadowDisplay: [],
      scoreDisplay: [],
      garbageDisplay: [],
      cursorDisplay: [],
      arrowDisplay: [],
      chainCountDisplay: {},
      fieldDisplay: {},
      cellTimer: [[]],
      puyoStates: [[]],
      editorTools: {},

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
      stopGame: false,
      chainAutoPlay: false,
      timers: {
        editBubble: 0,
        toolIntroFade: 0
      }
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
      this.connectionData = uniformMatrix('n', this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.colorNameData = uniformMatrix('spacer', this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.poppingCells = uniformMatrix(false, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.droppingCells = uniformMatrix(false, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.dropDistances = uniformMatrix(0, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.clearPuyosResult = uniformMatrix('0', this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.dropPuyosResult = uniformMatrix('0', this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.cellTimer = uniformMatrix(0, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.puyoStates = uniformMatrix('idle', this.fieldSettings.totalRows, this.fieldSettings.columns)
    },
    initGame: function () {
      this.app = new PIXI.Application(this.modeSettings[this.displayMode])
      this.$refs.game.appendChild(this.app.view)
      this.$refs.game.childNodes[0].style.width = `${this.modeSettings.simple.width * this.scaleFactor}px`
      this.$refs.game.childNodes[0].style.height = `${this.modeSettings.simple.height * this.scaleFactor}px`

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
        // this.initShadowDisplay()
        // this.initCursorDisplay()
        // this.initArrowDisplay()
        this.initGarbageDisplay()
        this.initFieldControls()
        this.initChainCounter()
        this.initToolDisplay()
        this.boardInteractivity()

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
      let spriteArray = []
      for (let y = 0; y < this.Field.totalRows; y++) {
        spriteArray[y] = []
        for (let x = 0; x < this.Field.columns; x++) {
          spriteArray[y][x] = new Sprite(this.puyoSprites['red_urdl.png'])
          spriteArray[y][x].anchor.set(0.5)
          spriteArray[y][x].x = this.coordArray[y][x].x
          spriteArray[y][x].y = this.coordArray[y][x].y
          this.app.stage.addChild(spriteArray[y][x])
        }
      }
      this.puyoDisplay = spriteArray
      this.updatePuyoSprites()
    },
    updatePuyoSprites: function () {
      this.determineConnections()
      this.determineColorNames()
      for (let y = 0; y < this.Field.totalRows; y++) {
        for (let x = 0; x < this.Field.columns; x++) {
          this.puyoDisplay[y][x].x = this.coordArray[y][x].x
          this.puyoDisplay[y][x].y = this.coordArray[y][x].y
          this.puyoDisplay[y][x].spritename = `${this.colorNameData[y][x]}_${this.connectionData[y][x]}.png`
          this.puyoDisplay[y][x].texture = this.puyoSprites[`${this.colorNameData[y][x]}_${this.connectionData[y][x]}.png`]
          this.puyoDisplay[y][x].anchor.set(0.5, 0.5)
        }
      }
    },
    determineConnections: function () {
      let array = []
      for (let y = 0; y < this.Field.totalRows; y++) {
        array[y] = []
        for (let x = 0; x < this.Field.columns; x++) {
          if (y < this.Field.hiddenRows) {
            array[y][x] = 'n'
          } else if (this.dropDistances[y][x] > 0) {
            array[y][x] = 'n'
          } else if (this.fieldData[y][x] === Puyo.None) {
            array[y][x] = 'n'
          } else {
            let check = {}
            check.up = (y <= this.Field.hiddenRows)
              ? false // Don't look into the hidden row
              : (this.fieldData[y][x] === this.fieldData[y - 1][x])
                ? (this.dropDistances[y - 1][x] === 0)
                : false
            check.left = (x === 0)
              ? false // Don't look into the left wall.
              : (this.fieldData[y][x] === this.fieldData[y][x - 1])
                ? (this.dropDistances[y][x - 1] === 0)
                : false
            check.right = (x === this.Field.columns - 1)
              ? false // Don't look into the right wall.
              : (this.fieldData[y][x] === this.fieldData[y][x + 1])
                ? (this.dropDistances[y][x + 1] === 0)
                : false
            check.down = (y === this.Field.totalRows - 1)
              ? false // Don't look into the ground
              : (this.fieldData[y][x] === this.fieldData[y + 1][x])
                ? (this.dropDistances[y + 1][x] === 0)
                : false

            let connection = ''
            if (check.up === true) {
              connection += 'u'
            }
            if (check.right === true) {
              connection += 'r'
            }
            if (check.down === true) {
              connection += 'd'
            }
            if (check.left === true) {
              connection += 'l'
            }
            if (connection === '') {
              connection = 'n'
            }

            array[y][x] = connection
          }
        }
      }
      this.connectionData = array
      return array
    },
    determineColorNames: function () {
      let array = []
      for (let y = 0; y < this.Field.totalRows; y++) {
        array[y] = []
        for (let x = 0; x < this.Field.columns; x++) {
          if (this.fieldData[y][x] === Puyo.Red) {
            array[y][x] = 'red'
          } else if (this.fieldData[y][x] === Puyo.Green) {
            array[y][x] = 'green'
          } else if (this.fieldData[y][x] === Puyo.Blue) {
            array[y][x] = 'blue'
          } else if (this.fieldData[y][x] === Puyo.Yellow) {
            array[y][x] = 'yellow'
          } else if (this.fieldData[y][x] === Puyo.Purple) {
            array[y][x] = 'purple'
          } else if (this.fieldData[y][x] === Puyo.Garbage) {
            array[y][x] = 'garbage'
          } else {
            array[y][x] = 'spacer'
          }
        }
      }
      this.colorNameData = array
      return array
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

      this.fieldDisplay.disableTouchBehind = new Sprite(resources['/img/touch_disabler.png'].texture)
      this.fieldDisplay.disableTouchBehind.x = 0
      this.fieldDisplay.disableTouchBehind.y = 0
      this.fieldDisplay.disableTouchBehind.width = this.modeSettings.simple.width
      this.fieldDisplay.disableTouchBehind.height = this.modeSettings.simple.height
      this.app.stage.addChild(this.fieldDisplay.disableTouchBehind)
      this.fieldDisplay.disableTouchBehind.interactive = false
      this.fieldDisplay.disableTouchBehind.on('pointerdown', () => {
        this.controlField('edit')
      })

      this.fieldControls.edit = new Sprite(this.fieldSprites['btn_edit.png'])
      this.fieldControls.edit.x = 490
      this.fieldControls.edit.y = startY + i * this.fieldControls.edit.height /* + this.fieldControls.edit.height / 3 */
      this.fieldControls.edit.interactive = true
      this.fieldControls.edit.buttonMode = true
      this.app.stage.addChild(this.fieldControls.edit)
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
    initToolDisplay: function () {
      this.fieldDisplay.editBubble = new Sprite(resources['/img/edit_bubble.png'].texture)
      this.fieldDisplay.editBubble.x = 520
      this.fieldDisplay.editBubble.y = 584
      this.fieldDisplay.editBubble.anchor.set(0.87, 0)
      this.fieldDisplay.editBubble.interactive = true
      this.fieldDisplay.editBubble.visible = false
      this.app.stage.addChild(this.fieldDisplay.editBubble)

      let nameToolsPage1 = [[this.puyoSprites['red_n.png'], this.puyoSprites['green_n.png'], this.puyoSprites['blue_n.png'], this.puyoSprites['yellow_n.png'], this.puyoSprites['purple_n.png'], this.puyoSprites['garbage_n.png'], this.puyoSprites['purple_n.png']],
        [this.puyoSprites['red_n.png'], this.puyoSprites['green_n.png'], this.puyoSprites['blue_n.png'], this.puyoSprites['yellow_n.png'], this.puyoSprites['purple_n.png'], this.puyoSprites['garbage_n.png'], this.puyoSprites['purple_n.png']]]
      let spritesToolsPage1 = []
      let startX = 56
      let startY = 668

      this.editorTools.page1 = new PIXI.Container()
      this.editorTools.page2 = new PIXI.Container()

      for (let y = 0; y < nameToolsPage1.length; y++) {
        spritesToolsPage1[y] = []
        for (let x = 0; x < nameToolsPage1[0].length; x++) {
          let horizontalPadding = 0
          let verticalPadding = 0
          if (x > 0) {
            horizontalPadding = 8
          }
          if (y > 0) {
            verticalPadding = 8
          }
          spritesToolsPage1[y][x] = new Sprite(nameToolsPage1[y][x])
          spritesToolsPage1[y][x].x = startX + (spritesToolsPage1[y][x].width + horizontalPadding) * x
          spritesToolsPage1[y][x].y = startY + (spritesToolsPage1[y][x].height + verticalPadding) * y
          this.editorTools.page1.addChild(spritesToolsPage1[y][x])
        }
      }

      this.app.stage.addChild(this.editorTools.page1)
      this.editorTools.page1.visible = false
    },
    boardInteractivity: function () {
      let me = this
      for (let y = 0; y < this.Field.totalRows; y++) {
        for (let x = 0; x < this.Field.columns; x++) {
          this.puyoDisplay[y][x].interactive = true
          this.puyoDisplay[y][x].editPuyo = function () {
            me.fieldData[y].splice(x, 1, 'R')
            me.updatePuyoSprites()
          }
          this.puyoDisplay[y][x].on('pointerdown', this.puyoDisplay[y][x].editPuyo)
        }
      }
    },
    openToolbox: function (delta) {
      let duration = 15 // frames
      this.timers.editBubble += delta
      let t = this.timers.editBubble
      this.fieldDisplay.disableTouchBehind.interactive = true

      if (this.timers.editBubble <= duration) {
        this.fieldDisplay.editBubble.scale.set(this.Easers.editBubble(t / duration), this.Easers.editBubble(t / duration))
      } else {
        this.app.ticker.remove(this.openToolbox)
        this.app.ticker.add(this.displayTools)
        this.timers.toolIntroFade = 0
        console.log(t)
      }
    },
    displayTools: function (delta) {
      let fadeSpeed = 12
      this.timers.toolIntroFade += delta
      let t = this.timers.toolIntroFade
      let delay = 2
      let delayArray = []
      let alphaArray = []
      this.editorTools.page1.visible = true

      if (t <= delay * this.editorTools.page1.children.length + fadeSpeed) {
        for (let i in this.editorTools.page1.children) {
          delayArray.push(0 - i * delay)
        }

        for (let i in this.editorTools.page1.children) {
          alphaArray.push((delayArray[i] + t) / fadeSpeed)
          if (i < 6) {
            this.editorTools.page1.children[i].alpha = alphaArray[i]
          } else {
            this.editorTools.page1.children[i].alpha = alphaArray[i] * 0.17
          }
        }
      } else {
        this.app.ticker.remove(this.displayTools)
        console.log('removed tool ticker')
      }
    },
    closeToolbox: function (delta) {
      let duration = 15 // frames
      this.timers.editBubble -= delta
      let t = this.timers.editBubble
      this.editorTools.page1.visible = false
      this.app.ticker.remove(this.displayTools)

      if (this.timers.editBubble >= 0) {
        this.fieldDisplay.editBubble.scale.set(this.Easers.editBubble(t / duration), this.Easers.editBubble(t / duration))
      } else {
        this.app.ticker.remove(this.closeToolbox)
        console.log(t)
        this.gameState = 'idle'
        this.timers.editBubble = 0
        this.fieldDisplay.editBubble.visible = false
        this.fieldDisplay.disableTouchBehind.interactive = false
      }
    },
    gameLoop: function (delta) {
      if (this.gameState === 'idle') {
        this.stateEditField(delta)
      } else if (this.gameState === 'dropping') {
        this.stateDropPuyos(delta)
      } else if (this.gameState === 'popping') {
        this.statePopPuyos(delta)
      }
    },
    stateEditField: function (delta) {
      // Nothing
    },
    stateDropPuyos: function (delta) {
      let t = this.frame
      if (this.stopGame === true) {
        delta = 0
      }
      for (let i = 0; i < Math.round(delta); i++) { // Repeat the logic based on skipped frames
        for (let y = 0; y < this.Field.totalRows; y++) {
          for (let x = 0; x < this.Field.columns; x++) {
            if (this.dropDistances[y][x] > 0) {
              if (this.puyoStates[y][x] === 'idle' || this.puyoStates[y][x] === 'checkDrops') {
                this.puyoStates[y].splice(x, 1, 'dropping')
              } else if (this.puyoStates[y][x] === 'dropping') {
                if (this.puyoDisplay[y][x].y + this.Field.map[y][x].vy < this.coordArray[y][x].y + this.dropDistances[y][x] * this.Field.cellHeight) {
                  this.puyoDisplay[y][x].y += this.Field.map[y][x].vy
                  this.Field.map[y][x].vy += 0.1875 / 16 * 60 * t
                } else {
                  this.puyoStates[y].splice(x, 1, 'bouncing')
                  this.puyoDisplay[y][x].y = this.coordArray[y][x].y + this.dropDistances[y][x] * this.Field.cellHeight + this.Field.cellHeight / 2
                  this.puyoDisplay[y][x].anchor.set(0.5, 1)
                }
              } else if (this.puyoStates[y][x] === 'bouncing') {
                this.cellTimer[y][x] += 1
                if (this.cellTimer[y][x] <= 8) {
                  this.puyoDisplay[y][x].scale.y -= 0.2 / 8
                  this.puyoDisplay[y][x].scale.x += 0.2 / 8
                } else if (this.cellTimer[y][x] <= 16) {
                  this.puyoDisplay[y][x].scale.y += 0.2 / 8
                  this.puyoDisplay[y][x].scale.x -= 0.2 / 8
                } else {
                  this.puyoDisplay[y][x].anchor.set(0.5, 0.5)
                  this.puyoDisplay[y][x].y = this.coordArray[y][x].y + this.dropDistances[y][x] * this.Field.cellHeight
                  this.puyoStates[y].splice(x, 1, 'checkPops')
                  this.droppingCells[y].splice(x, 1, false)
                  this.dropDistances[y].splice(x, 1, 0)
                  this.cellTimer[y].splice(x, 1, 0)
                  // when I write the watcher, make it reset all the Puyo states to idle before shfiting to popPuyos
                }
              }
            }
          }
        }
      }

      // Advance frame
      if (this.stopGame === false) {
        this.frame += 1
      }
    },
    statePopPuyos: function (delta) {
      let t = this.frame
      if (this.stopGame === true) {
        delta = 0
      }
      for (let i = 0; i < Math.round(delta); i++) { // Repeat the logic if frames were skipped
        for (let y = 0; y < this.Field.totalRows; y++) {
          for (let x = 0; x < this.Field.columns; x++) {
            if (this.poppingCells[y][x] === true) {
              this.puyoStates[y].splice(x, 1, 'popping')

              Math.cos(t / 3 * Math.PI) >= 0
                ? this.puyoDisplay[y][x].alpha = 1
                : this.puyoDisplay[y][x].alpha = 0

              this.cellTimer[y][x] += 1
              if (this.cellTimer[y][x] >= 24) {
                console.log('need to finish popping')
                this.puyoStates[y].splice(x, 1, 'checkDrops')
                this.poppingCells[y].splice(x, 1, false)
                this.puyoDisplay[y][x].alpha = 1
                this.cellTimer[y].splice(x, 1, 0)
              }
            } else {
              this.puyoStates[y].splice(x, 1, 'checkDrops')
              this.poppingCells[y].splice(x, 1, false)
              this.puyoDisplay[y][x].alpha = 1
              this.cellTimer[y].splice(x, 1, 0)
            }
          }
        }
      }

      // Advance frame
      if (this.stopGame === false) {
        this.frame += 1
      }
    },
    setDropData: function () {
      let dropResult = Chainsim.Simulate.dropPuyos(this.Field)

      // Create an array that tracks which cells are in their drop animations.
      let dropAnimationArray = []
      for (let y = 0; y < this.Field.totalRows; y++) {
        dropAnimationArray[y] = []
        for (let x = 0; x < this.Field.columns; x++) {
          if (dropResult.dropDistances[y][x] > 0) {
            dropAnimationArray[y][x] = true
          } else {
            dropAnimationArray[y][x] = false
          }
        }
      }

      this.droppingCells = dropAnimationArray
      this.dropDistances = dropResult.dropDistances
      this.dropPuyosResult = Chainsim.mapToStringArray(dropResult.dropResult)
    },
    setPopData: function () {
      let clearResult = Chainsim.Simulate.clearPuyos(this.Field)
      this.poppingCells = clearResult.animationMatrix // Watcher will react by setting isPopping to true or false
      this.clearPuyosResult = Chainsim.mapToStringArray(clearResult.newField.map)

      if (clearResult.popData.poppingGroups.length !== 0) {
        this.calculateScore(clearResult.popData)
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
      } else if (control === 'edit') {
        if (this.gameState !== 'editing') {
          this.app.ticker.add(this.openToolbox)
          this.app.ticker.remove(this.closeToolbox)
          this.gameState = 'editing'
          this.fieldDisplay.editBubble.visible = true
        } else if (this.gameState === 'editing') {
          this.gameState = 'idle'
          this.app.ticker.remove(this.openToolbox)
          this.app.ticker.add(this.closeToolbox)
        }
      }
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

      // If there's no pops to do, set gameState to 'idle'. Otherwise, set 'popping'
      if (clearResult.popData.poppingGroups.length === 0) {
        this.gameState = 'chainStopped'
      } else {
        this.calculateScore(clearResult.popData)
        this.gameState = 'popping'
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
        this.chainAutoPlay = false
        this.gameState = 'dropping'
      } else if (this.gameState === 'chainStopped') {
        this.chainAutoPlay = false
        this.gameState = 'dropping'
      }
    },
    playChain: function () {
      if (this.gameState === 'idle') {
        this.chainAutoPlay = true
        this.gameState = 'dropping'
      } else if (this.gameState === 'chainStopped') {
        this.chainAutoPlay = true
        this.gameState = 'dropping'
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
    },
    Easers: function () {
      return {
        editBubble: BezierEasing(0.14, 0.18, 0, 1.16)
      }
    }
  },
  watch: {
    gameState: function (newVal, oldVal) {
      this.frame = 0
      if (newVal === 'dropping') {
        this.setDropData()
        this.puyoStates = uniformMatrix('idle', this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.updatePuyoSprites()
        if (this.isDropping === false) {
          this.gameState = 'popping'
        }
      } else if (newVal === 'popping') {
        this.setPopData()
        this.puyoStates = uniformMatrix('idle', this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.updatePuyoSprites()
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
          this.gameState = 'dropping'
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
          this.updatePuyoSprites()
          if (this.chainAutoPlay === true) {
            this.gameState = 'popping'
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
