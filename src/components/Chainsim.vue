<template>
  <div id="chainsim" @mousedown="setMouseDown(true)" @mouseup="setMouseDown(false)">
    <div class="game-container">
      <div id="game" ref="game"></div> <!-- PIXI.js app stage goes in here -->
    </div>
    <div v-if="gameLoaded"> <!-- ensures that the v-for loops execute -->
      <chainsim-control-button v-for="(sprite, index) in fieldControls" :key="`Control_${index}`"
      :gameLoaded="gameLoaded" :fieldSprites="fieldSprites" :button="sprite" :buttonName="index"
      v-on:controlField="controlField" />
    </div>
    <!-- <button @click="prevSlide">Prev</button><button @click="nextSlide">Next</button><br> -->
    <button @click="slideActivePair('left')">Left</button><button @click="slideActivePair('right')">Right</button><br>
    <button @click="rotateActivePair('ccw')">CCW</button><button @click="dropActivePair">Draw/Place Puyo</button><button @click="rotateActivePair('cw')">CW</button><br>
    <textarea rows="5" cols="40" v-model="copyPaster"></textarea>
    <p>In bounds?: {{ checkDropInBounds }}</p>
    <p>Game State: {{ gameState }} || stopGame: {{ stopGame }}</p>
    <p>isDropping: {{ isDropping }} || isPopping: {{ isPopping }}</p>
    <p>fieldData: '{{ fieldDataString }}',
    <br>shadowData: '{{ shadowDataString }}',
    <br>cursorData: '{{ cursorDataString }}',
    <br>arrowData: '{{ arrowDataString }}'</p>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'
import Chainsim from '../assets/js/chainsim.js'
import ChainsimControlButton from './ChainsimControlButton'
import * as BezierEasing from 'bezier-easing'

const uniformMatrix = Chainsim.uniformMatrix // Generates a 2D matrix all filled with one value
const stringTo2dArray = Chainsim.stringTo2dArray // Converts 1D string to 2D matrix
const flatten2dTo1d = Chainsim.flatten2dTo1d // Converts 2D array to 1D array

const loader = PIXI.loader // eslint-disable-line no-unused-vars
const resources = PIXI.loader.resources // eslint-disable-line no-unused-vars
const Sprite = PIXI.Sprite // eslint-disable-line no-unused-vars

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
  name: 'Chainsim',
  props: ['importedData', 'nextQueue', 'item'],
  components: {
    ChainsimControlButton
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
        targetPoint: 70
      },
      currentSlide: 0,

      /* Chainsim logic */
      // Game states
      gameMode: 'editor', // editor, playable
      gameState: 'idle', // idle/playing -> dropping -> popping -> dropping/chainEnded || editor
      gameData: undefined,
      gamePlayable: true,

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
      garbageIcons: ['spacer_n', 'spacer_n', 'spacer_n', 'spacer_n', 'spacer_n', 'spacer_n'],

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
          height: 974, // 854
          antialias: true,
          transparent: true,
          resolution: 1
        },
        full: {
          width: 872,
          height: 854,
          antialias: true,
          transparent: false,
          resolution: 1
        }
      },
      app: undefined, // PIXI.js Application
      stage: undefined,
      renderer: undefined,
      ticker: undefined,
      interaction: undefined,
      scaleFactor: 0.45,

      // Texture data
      texturesToLoad: [
        '/img/arle_bg.png',
        '/img/field.json',
        '/img/puyo.json',
        '/img/arrow.png',
        '/img/arrow_x.png',
        '/img/cursor.png',
        '/img/cursor_x.png',
        '/img/chain_font.json',
        '/img/edit_bubble.png',
        '/img/touch_disabler.png',
        '/img/picker_arrow_left.png',
        '/img/picker_arrow_right.png',
        '/img/editor_x.png',
        '/img/current_tool.png',
        '/img/next_background_1p_mask.png',
        '/img/rotate_container.png'
      ],
      puyoSprites: {},
      fieldSprites: {},
      scoreSprites: {},
      chainCountSprites: {},

      // Displayed objects
      puyoDisplay: [[]],
      dumpDisplay: [[]],
      shadowDisplay: [],
      scoreDisplay: [],
      garbageDisplay: [],
      cursorDisplay: [],
      arrowDisplay: [],
      chainCountDisplay: {},
      fieldDisplay: {},
      cellTimer: [[]],
      puyoStates: [[]],
      editorTools: [],
      editorSelectors: [],
      editorWindow: {},
      playCtrlDisplay: {},

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
        toolIntroFade: 0,
        chainLength: 0,
        garbageTray: 0,
        cursor: 0,
        arrow: 0,
        next: 0
      },
      needToChangeSlides: false,
      slideChange: 1,

      // Editor
      editorCurrentTool: {
        page: 0,
        item: 6,
        puyo: '0',
        layer: 'main',
        x: 520,
        y: 820
      },
      toolCursor: undefined,
      toolPage: 0,

      // NEXT
      nextPuyoData: 'RRBGYYPP',
      nextPuyoPairs: [], // PIXI.Containers
      nextQueuePosition: 0,
      nextCoord: [
        { x: 510, y: 256 },
        { x: 556, y: 376 },
        { x: 556, y: 536 }
      ],

      // Controlled Puyos
      controlPuyoData: [[]],
      controlPuyoSprites: [[]],
      activePair: {
        data: '00',
        axisPuyo: {
          x: 2,
          y: 13
        },
        freePuyo: {
          x: 2,
          y: 14
        }
      },
      activeMatrix: [['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0']],

      // Dump Matrix
      dumpCellContainer: undefined,
      droppingDumpCells: [[]],
      dropDumpDistances: [[]],
      mergedDump: false, // Set to true once the dropped field has been merged
      dumpVelocity: [[]],
      dumpPuyoStates: [[]],
      dumpCellTimer: [[]]
    }
  },
  mounted () {
    this.initData()
    this.initGame()
  },
  methods: {
    log: function (input) {
      console.log(input)
    },
    initData: function () {
      this.gameData = JSON.parse(JSON.stringify(this.importedData))
      this.fieldData = stringTo2dArray(this.gameData[this.currentSlide].fieldData, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.fieldOriginal = stringTo2dArray(this.gameData[this.currentSlide].fieldData, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.shadowData = stringTo2dArray(this.gameData[this.currentSlide].shadowData, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.cursorData = stringTo2dArray(this.gameData[this.currentSlide].cursorData, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.arrowData = stringTo2dArray(this.gameData[this.currentSlide].arrowData, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.controlPuyoData = uniformMatrix('0', 6, this.fieldSettings.columns)
      this.controlPuyoData = [['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0'],
        ['0', '0', 'B', '0', '0', '0'],
        ['0', '0', 'R', '0', '0', '0'],
        ['0', '0', '0', '0', '0', '0']]
      this.connectionData = uniformMatrix('n', this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.colorNameData = uniformMatrix('spacer', this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.poppingCells = uniformMatrix(false, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.droppingCells = uniformMatrix(false, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.dropDistances = uniformMatrix(0, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.clearPuyosResult = uniformMatrix('0', this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.dropPuyosResult = uniformMatrix('0', this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.cellTimer = uniformMatrix(0, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.puyoStates = uniformMatrix('idle', this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.dumpPuyoStates = uniformMatrix('idle', this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.dumpCellTimer = uniformMatrix(0, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.dumpVelocity = uniformMatrix(3.75, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.nextPuyoData = this.nextQueue
    },
    initGame: function () {
      // eslint-disable-next-line
      this.renderer = new PIXI.autoDetectRenderer(this.modeSettings.simple.width, this.modeSettings.simple.height, {
        antialias: true,
        transparent: true,
        resolution: 1
      })
      this.renderer.view.style.width = `${this.modeSettings.simple.width * this.scaleFactor}px`
      this.renderer.view.style.height = `${this.modeSettings.simple.height * this.scaleFactor}px`
      this.$refs.game.appendChild(this.renderer.view)
      this.stage = new PIXI.Container()

      this.ticker = new PIXI.ticker.Ticker()
      this.ticker.add(() => {
        this.renderer.render(this.stage)
      })
      this.ticker.start()

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
        this.initDumpDisplay()
        this.initControlledPuyos()
        this.initActivePair()
        this.initShadowDisplay()
        this.initCursorDisplay()
        this.initArrowDisplay()
        this.initGarbageDisplay()
        this.initNextPuyos()
        if (this.gamePlayable === false) {
          this.initFieldControls()
        } else {
          this.initPlayControls()
        }
        this.initChainCounter()
        this.initToolDisplay()

        // Marked game as loaded
        this.gameLoaded = true

        // Run the game loop
        this.ticker.add(delta => this.gameLoop(delta))

        // Draw the first puyo
        this.dropActivePair()
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
      this.fieldDisplay.charBG.y = 183
      this.stage.addChild(this.fieldDisplay.charBG)

      // Top Border
      this.fieldDisplay.borderTop = new Sprite(this.fieldSprites['field_border_top.png'])
      this.fieldDisplay.borderTop.y = 132
      this.stage.addChild(this.fieldDisplay.borderTop)

      // Left border, top half
      this.fieldDisplay.borderLeftTop = new Sprite(this.fieldSprites['field_border_left_tophalf.png'])
      this.fieldDisplay.borderLeftTop.y = 184
      this.stage.addChild(this.fieldDisplay.borderLeftTop)

      // Left border, bottom half
      this.fieldDisplay.borderLeftBottom = new Sprite(this.fieldSprites['field_border_left_bottomhalf.png'])
      this.fieldDisplay.borderLeftBottom.y = 536
      this.stage.addChild(this.fieldDisplay.borderLeftBottom)

      // Right border, top half
      this.fieldDisplay.borderRightTop = new Sprite(this.fieldSprites['field_border_right_tophalf.png'])
      this.fieldDisplay.borderRightTop.x = 417
      this.fieldDisplay.borderRightTop.y = 184
      this.stage.addChild(this.fieldDisplay.borderRightTop)

      // Right border, bottom half
      this.fieldDisplay.borderRightBottom = new Sprite(this.fieldSprites['field_border_right_bottomhalf.png'])
      this.fieldDisplay.borderRightBottom.x = 417
      this.fieldDisplay.borderRightBottom.y = 536
      this.stage.addChild(this.fieldDisplay.borderRightBottom)

      // Bottom border
      this.fieldDisplay.borderBottom = new Sprite(this.fieldSprites['field_border_bottom.png'])
      this.fieldDisplay.borderBottom.y = 902
      this.stage.addChild(this.fieldDisplay.borderBottom)

      // Next Window Border
      this.fieldDisplay.nextWindowBorder = new Sprite(this.fieldSprites['next_border_1p.png'])
      this.fieldDisplay.nextWindowBorder.x = 456
      this.fieldDisplay.nextWindowBorder.y = 160
      this.stage.addChild(this.fieldDisplay.nextWindowBorder)

      // Next Window Inner
      this.fieldDisplay.nextWindowInner = new Sprite(this.fieldSprites['next_background_1p.png'])
      this.fieldDisplay.nextWindowInner.x = 456
      this.fieldDisplay.nextWindowInner.y = 160
      this.stage.addChild(this.fieldDisplay.nextWindowInner)

      // NEXT Puyo Mask
      this.fieldDisplay.nextWindowMask = new Sprite(resources['/img/next_background_1p_mask.png'].texture)
      this.fieldDisplay.nextWindowMask.position.set(456, 160)
      this.stage.addChild(this.fieldDisplay.nextWindowMask)
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
        spriteArray[i].y = 935
        this.stage.addChild(spriteArray[i])
      }

      // Set scoreDisplay array
      this.scoreDisplay = spriteArray
    },
    initGameOverX: function () {
      this.fieldDisplay.redX = new Sprite(this.puyoSprites['death_X.png'])
      this.fieldDisplay.redX.anchor.set(0.5)
      this.fieldDisplay.redX.x = this.coordArray[1][2].x
      this.fieldDisplay.redX.y = this.coordArray[1][2].y
      this.stage.addChild(this.fieldDisplay.redX)
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
          this.stage.addChild(spriteArray[y][x])
        }
      }
      this.puyoDisplay = spriteArray

      let me = this
      for (let y = 0; y < this.Field.totalRows; y++) {
        for (let x = 0; x < this.Field.columns; x++) {
          this.puyoDisplay[y][x].interactive = true
          this.puyoDisplay[y][x].editPuyo = function () {
            me.isMouseDown = true
            if (me.editorCurrentTool.layer === 'main' && me.gameState === 'idle') {
              me.fieldData[y].splice(x, 1, me.editorCurrentTool.puyo)
              if (me.shadowData[y][x] !== '0') {
                me.shadowData[y].splice(x, 1, '0') // Remove shadow puyo at this position
                me.updateShadowSprite(x, y)
              }
              me.updatePuyoSprites()
            }
          }
          this.puyoDisplay[y][x].mouseOver = function () {
            if (me.isMouseDown === true && me.editorCurrentTool.layer === 'main' && me.gameState === 'idle') {
              me.fieldData[y].splice(x, 1, me.editorCurrentTool.puyo)
              if (me.shadowData[y][x] !== '0') {
                me.shadowData[y].splice(x, 1, '0') // Remove shadow puyo at this position
                me.updateShadowSprite(x, y)
              }
              me.updatePuyoSprites()
            }
          }
          this.puyoDisplay[y][x].mouseUp = function () {
            me.isMouseDown = false
          }
          this.puyoDisplay[y][x].on('pointerdown', this.puyoDisplay[y][x].editPuyo)
          this.puyoDisplay[y][x].on('pointerover', this.puyoDisplay[y][x].mouseOver)
          this.puyoDisplay[y][x].on('pointerupoutside', this.puyoDisplay[y][x].mouseUp)
          this.puyoDisplay[y][x].on('pointerup', this.puyoDisplay[y][x].mouseUp)
        }
      }
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
          this.puyoDisplay[y][x].scale.set(1, 1)
        }
      }
      console.log('updated sprites')
    },
    updateShadowSprite: function (x, y) {
      let color = ''
      if (this.shadowData[y][x] === Puyo.Red) {
        color = 'red'
      } else if (this.shadowData[y][x] === Puyo.Green) {
        color = 'green'
      } else if (this.shadowData[y][x] === Puyo.Blue) {
        color = 'blue'
      } else if (this.shadowData[y][x] === Puyo.Yellow) {
        color = 'yellow'
      } else if (this.shadowData[y][x] === Puyo.Purple) {
        color = 'purple'
      } else if (this.shadowData[y][x] === Puyo.Garbage) {
        color = 'garbage'
      } else {
        color = 'spacer'
      }
      this.shadowDisplay[y][x].texture = this.puyoSprites[`${color}_n.png`]
      console.log('Updated the shadow sprite.')
    },
    updateCursorSprite: function (x, y) {
      if (this.cursorData[y][x] === '1') {
        this.cursorDisplay[y][x].alpha = 1
      } else {
        this.cursorDisplay[y][x].alpha = 0
      }
    },
    updateArrowSprite: function (x, y) {
      if (this.arrowData[y][x] === '0') {
        this.arrowDisplay[y][x].alpha = 0
      } else if (this.arrowData[y][x] === 'L') {
        this.arrowDisplay[y][x].alpha = 1
        this.arrowDisplay[y][x].rotation = (3 / 2) * Math.PI
      } else if (this.arrowData[y][x] === 'R') {
        this.arrowDisplay[y][x].alpha = 1
        this.arrowDisplay[y][x].rotation = (1 / 2) * Math.PI
      } else if (this.arrowData[y][x] === 'D') {
        this.arrowDisplay[y][x].alpha = 1
        this.arrowDisplay[y][x].rotation = Math.PI
      } else if (this.arrowData[y][x] === 'U') {
        this.arrowDisplay[y][x].alpha = 1
        this.arrowDisplay[y][x].rotation = 0
      }
    },
    updateNextPuyoSprites: function () {
      // Get the colors from the input string
      let colors = []
      for (let i = this.nextQueuePosition; i < this.nextQueuePosition + 6; i++) {
        switch (this.nextPuyoData[i]) {
          case 'R': colors.push('red'); break
          case 'G': colors.push('green'); break
          case 'B': colors.push('blue'); break
          case 'Y': colors.push('yellow'); break
          case 'P': colors.push('purple'); break
          default: colors.push('spacer')
        }
      }

      for (let i = 0; i < 3; i++) {
        // Make Puyos
        let color1 = colors[i * 2 + 0]
        let color2 = colors[i * 2 + 1]

        // Fall back in case there's not enough nextPuyoData
        if (color1 === undefined) {
          color1 = 'spacer'
        }
        if (color2 === undefined) {
          color2 = 'spacer'
        }
        this.nextPuyoPairs[i].children[0].texture = this.puyoSprites[`${color1}_n.png`]
        this.nextPuyoPairs[i].children[1].texture = this.puyoSprites[`${color2}_n.png`]
      }

      this.nextPuyoPairs[0].scale.set(1, 1)
      this.nextPuyoPairs[0].position.set(this.nextCoord[0].x, this.nextCoord[0].y)
      this.nextPuyoPairs[1].scale.set(0.8, 0.8)
      this.nextPuyoPairs[1].position.set(this.nextCoord[1].x, this.nextCoord[1].y)
      this.nextPuyoPairs[2].scale.set(0.8, 0.8)
      this.nextPuyoPairs[2].position.set(this.nextCoord[2].x, this.nextCoord[2].y)
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
          } else if (this.fieldData[y][x] === Puyo.None || this.fieldData[y][x] === Puyo.Garbage) {
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
    initNextPuyos: function () {
      // Get the colors from the input string
      let colors = []
      for (let i = this.nextQueuePosition; i < this.nextQueuePosition + 6; i++) {
        switch (this.nextPuyoData[i]) {
          case 'R': colors.push('red'); break
          case 'G': colors.push('green'); break
          case 'B': colors.push('blue'); break
          case 'Y': colors.push('yellow'); break
          case 'P': colors.push('purple'); break
          default: colors.push('spacer')
        }
      }

      for (let i = 0; i < 3; i++) {
        // Make Puyos
        let color1 = colors[i * 2 + 0]
        let color2 = colors[i * 2 + 1]

        // Fall back in case there's not enough nextPuyoData
        if (color1 === undefined) {
          color1 = 'spacer'
        }
        if (color2 === undefined) {
          color2 = 'spacer'
        }
        let axisPuyo = new Sprite(this.puyoSprites[`${color1}_n.png`])
        let freePuyo = new Sprite(this.puyoSprites[`${color2}_n.png`])
        axisPuyo.y += 60

        this.nextPuyoPairs[i] = new PIXI.Container()
        this.nextPuyoPairs[i].addChild(axisPuyo)
        this.nextPuyoPairs[i].addChild(freePuyo)

        this.nextPuyoPairs[i].pivot.set(this.nextPuyoPairs[i].width / 2, this.nextPuyoPairs[i].height / 2)

        this.nextPuyoPairs[i].mask = this.fieldDisplay.nextWindowMask
      }

      this.nextPuyoPairs[0].scale.set(1, 1)
      this.nextPuyoPairs[0].position.set(this.nextCoord[0].x, this.nextCoord[0].y)
      this.nextPuyoPairs[1].scale.set(0.8, 0.8)
      this.nextPuyoPairs[1].position.set(this.nextCoord[1].x, this.nextCoord[1].y)
      this.nextPuyoPairs[2].scale.set(0.8, 0.8)
      this.nextPuyoPairs[2].position.set(this.nextCoord[2].x, this.nextCoord[2].y)

      this.stage.addChild(this.nextPuyoPairs[0])
      this.stage.addChild(this.nextPuyoPairs[1])
      this.stage.addChild(this.nextPuyoPairs[2])
    },
    initGarbageDisplay: function () {
      if (this.displayMode === 'full') { // Display mode: full
        this.fieldDisplay.garbageTray = new Sprite(this.fieldSprites['garbage_tray.png'])
        this.fieldDisplay.garbageTray.x = 456
        this.fieldDisplay.garbageTray.y = 480
        this.stage.addChild(this.fieldDisplay.garbageTray)
      } else if (this.displayMode === 'simple') {
        this.fieldDisplay.garbageTray = new Sprite(this.fieldSprites['garbage_tray.png'])
        this.fieldDisplay.garbageTray.x = 316
        this.fieldDisplay.garbageTray.y = 915
        this.fieldDisplay.garbageTray.scale.set(0.7, 0.7)
        this.stage.addChild(this.fieldDisplay.garbageTray)
      }

      if (this.displayMode === 'full') {
        let spriteArray = []
        let startX = 468
        for (let i = 0; i < this.Field.columns; i++) {
          spriteArray[i] = new Sprite(this.puyoSprites['spacer_n.png'])
          spriteArray[i].x = startX + spriteArray[i].width * i
          spriteArray[i].origX = startX + spriteArray[i].width * i
          spriteArray[i].y = 470
          this.stage.addChild(spriteArray[i])
        }
        this.garbageDisplay = spriteArray
      } else if (this.displayMode === 'simple') {
        let spriteArray = []
        let startX = 324
        for (let i = 0; i < this.Field.columns; i++) {
          spriteArray[i] = new Sprite(this.puyoSprites['spacer_n.png'])
          spriteArray[i].scale.set(0.7, 0.7)
          spriteArray[i].x = startX + spriteArray[i].width * i
          spriteArray[i].origX = startX + spriteArray[i].width * i
          spriteArray[i].y = 910
          this.stage.addChild(spriteArray[i])
        }
        this.garbageDisplay = spriteArray
      }
    },
    initFieldControls: function () {
      let startY = 480
      let height
      let i = 0

      this.fieldControls.reset = new Sprite(this.fieldSprites['btn_reset.png'])
      this.fieldControls.reset.x = 452
      this.fieldControls.reset.y = startY
      this.fieldControls.reset.interactive = true
      this.fieldControls.reset.buttonMode = true
      this.stage.addChild(this.fieldControls.reset)
      height = this.fieldControls.reset.height

      this.fieldControls.pause = new Sprite(this.fieldSprites['btn_pause.png'])
      this.fieldControls.pause.x = 528
      this.fieldControls.pause.y = startY + height * i
      this.fieldControls.pause.interactive = true
      this.fieldControls.pause.buttonMode = true
      this.stage.addChild(this.fieldControls.pause)
      i += 1

      this.fieldControls.play = new Sprite(this.fieldSprites['btn_play.png'])
      this.fieldControls.play.x = 452
      this.fieldControls.play.y = startY + height * i
      this.fieldControls.play.interactive = true
      this.fieldControls.play.buttonMode = true
      this.stage.addChild(this.fieldControls.play)

      this.fieldControls.auto = new Sprite(this.fieldSprites['btn_auto.png'])
      this.fieldControls.auto.x = 528
      this.fieldControls.auto.y = startY + height * i
      this.fieldControls.auto.interactive = true
      this.fieldControls.auto.buttonMode = true
      this.stage.addChild(this.fieldControls.auto)
      i += 1

      this.fieldDisplay.disableTouchBehind = new Sprite(resources['/img/touch_disabler.png'].texture)
      this.fieldDisplay.disableTouchBehind.x = 0
      this.fieldDisplay.disableTouchBehind.y = 0
      this.fieldDisplay.disableTouchBehind.width = this.modeSettings.simple.width
      this.fieldDisplay.disableTouchBehind.height = this.modeSettings.simple.height
      this.stage.addChild(this.fieldDisplay.disableTouchBehind)
      this.fieldDisplay.disableTouchBehind.interactive = false
      this.fieldDisplay.disableTouchBehind.on('pointerdown', () => {
        this.controlField('edit')
      })

      this.fieldControls.edit = new Sprite(this.fieldSprites['btn_edit.png'])
      this.fieldControls.edit.x = 490
      this.fieldControls.edit.y = startY + i * this.fieldControls.edit.height /* + this.fieldControls.edit.height / 3 */
      this.fieldControls.edit.interactive = true
      this.fieldControls.edit.buttonMode = true
      this.stage.addChild(this.fieldControls.edit)
    },
    initChainCounter: function () {
      let startX = 412
      let startY = 732

      this.chainCountSprites.firstDigit = new Sprite(this.chainCountSprites['spacer.png'])
      this.chainCountSprites.firstDigit.x = startX
      this.chainCountSprites.firstDigit.y = startY
      this.chainCountSprites.firstDigit.scale.set(0.85, 0.85)

      this.chainCountSprites.secondDigit = new Sprite(this.chainCountSprites['spacer.png'])
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
      this.chainCountDisplay.origY = this.chainCountDisplay.y
      this.chainCountSprites.firstDigit.alpha = 0
      this.chainCountSprites.secondDigit.alpha = 0
      this.chainCountSprites.chainText.alpha = 0
      this.stage.addChild(this.chainCountDisplay)
    },
    initShadowDisplay: function () {
      let spriteArray = []
      let color = ''
      for (let y = 0; y < this.fieldData.length; y++) {
        spriteArray[y] = []
        for (let x = 0; x < this.fieldData[0].length; x++) {
          if (this.shadowData[y][x] === Puyo.Red) {
            color = 'red'
          } else if (this.shadowData[y][x] === Puyo.Green) {
            color = 'green'
          } else if (this.shadowData[y][x] === Puyo.Blue) {
            color = 'blue'
          } else if (this.shadowData[y][x] === Puyo.Yellow) {
            color = 'yellow'
          } else if (this.shadowData[y][x] === Puyo.Purple) {
            color = 'purple'
          } else if (this.shadowData[y][x] === Puyo.Garbage) {
            color = 'garbage'
          } else {
            color = 'spacer'
          }
          spriteArray[y][x] = new Sprite(this.puyoSprites[`${color}_n.png`])
          spriteArray[y][x].anchor.set(0.5)
          spriteArray[y][x].alpha = 0.4
          spriteArray[y][x].x = this.coordArray[y][x].x
          spriteArray[y][x].y = this.coordArray[y][x].y
          this.stage.addChild(spriteArray[y][x])
        }
      }
      this.shadowDisplay = spriteArray

      let me = this
      for (let y = 0; y < this.Field.totalRows; y++) {
        for (let x = 0; x < this.Field.columns; x++) {
          // Update shadow sprites with their imported colors
          this.updateShadowSprite(x, y)

          this.shadowDisplay[y][x].interactive = false
          this.shadowDisplay[y][x].editPuyo = function () {
            me.isMouseDown = true
            if (me.editorCurrentTool.layer === 'shadow' && me.gameState === 'idle') {
              me.shadowData[y].splice(x, 1, me.editorCurrentTool.puyo)
              me.fieldData[y].splice(x, 1, '0') // Remove main puyo at this position
              me.updateShadowSprite(x, y)
              me.updatePuyoSprites()
            }
          }
          this.shadowDisplay[y][x].mouseOver = function () {
            if (me.isMouseDown === true && me.editorCurrentTool.layer === 'shadow' && me.gameState === 'idle') {
              me.shadowData[y].splice(x, 1, me.editorCurrentTool.puyo)
              me.fieldData[y].splice(x, 1, '0') // Remove main puyo at this position
              me.updateShadowSprite(x, y)
              me.updatePuyoSprites()
            }
          }
          this.shadowDisplay[y][x].mouseUp = function () {
            me.isMouseDown = false
          }
          this.shadowDisplay[y][x].on('pointerdown', this.shadowDisplay[y][x].editPuyo)
          this.shadowDisplay[y][x].on('pointerover', this.shadowDisplay[y][x].mouseOver)
          this.shadowDisplay[y][x].on('pointerupoutside', this.shadowDisplay[y][x].mouseUp)
          this.shadowDisplay[y][x].on('pointerup', this.shadowDisplay[y][x].mouseUp)
        }
      }
    },
    initControlledPuyos: function () {
      let spriteArray = []
      let nameArray = []

      for (let y = 0; y < this.controlPuyoData.length; y++) {
        nameArray[y] = []
        for (let x = 0; x < this.controlPuyoData[0].length; x++) {
          switch (this.controlPuyoData[y][x]) {
            case 'R': nameArray[y][x] = 'red'; break
            case 'G': nameArray[y][x] = 'green'; break
            case 'B': nameArray[y][x] = 'blue'; break
            case 'Y': nameArray[y][x] = 'yellow'; break
            case 'P': nameArray[y][x] = 'purple'; break
            default: nameArray[y][x] = 'spacer'
          }
        }
      }

      for (let y = 0; y < this.controlPuyoData.length; y++) {
        spriteArray[y] = []
        for (let x = 0; x < this.controlPuyoData[0].length; x++) {
          spriteArray[y][x] = new Sprite(this.puyoSprites[`${nameArray[y][x]}_n.png`])
          spriteArray[y][x].anchor.set(0.5)
          spriteArray[y][x].x = this.coordArray[y][x].x
          spriteArray[y][x].y = this.coordArray[y][x].y - spriteArray[y][x].height * 5
          spriteArray[y][x].visible = false
          this.stage.addChild(spriteArray[y][x])
        }
      }
      this.controlPuyoSprites = spriteArray
    },
    initActivePair: function () { // One-letter strings
      // Get the colors from the input string
      let colors = []
      for (let i = 0; i < 2; i++) {
        switch (this.activePair.data[i]) {
          case 'R': colors.push('red'); break
          case 'G': colors.push('green'); break
          case 'B': colors.push('blue'); break
          case 'Y': colors.push('yellow'); break
          case 'P': colors.push('purple'); break
          default: colors.push('spacer')
        }
      }

      // Fall back in case the puyos are undefined
      if (colors[0] === undefined) {
        colors[0] = 'spacer'
      }
      if (colors[1] === undefined) {
        colors[0] = 'spacer'
      }

      let axisPuyo = new Sprite(this.puyoSprites[`${colors[0]}_n.png`])
      let freePuyo = new Sprite(this.puyoSprites[`${colors[1]}_n.png`])
      axisPuyo.anchor.set(0.5, 0.5)
      freePuyo.anchor.set(0.5, 0.5)
      axisPuyo.position.set(this.activeCoordArray[1][2].x, this.activeCoordArray[1][2].y)
      freePuyo.position.set(this.activeCoordArray[0][2].x, this.activeCoordArray[0][2].y)
      axisPuyo.cellPos = { x: 2, y: 1 }
      freePuyo.cellPos = { x: 2, y: 0 }
      this.stage.addChild(axisPuyo)
      this.stage.addChild(freePuyo)
      this.activePair.axisPuyo = axisPuyo
      this.activePair.freePuyo = freePuyo

      // this.ticker.add(() => {
      //   this.activePair.sprites.rotation += 2 * Math.PI / 180
      //   this.activePair.sprites.children[0].rotation -= 2 * Math.PI / 180
      //   this.activePair.sprites.children[1].rotation -= 2 * Math.PI / 180
      // })
    },
    updateActivePair: function () {
      this.activePair.data = `${this.nextPuyoData[this.nextQueuePosition - 2]}${this.nextPuyoData[this.nextQueuePosition - 1]}`

      let axisPuyo = this.activePair.axisPuyo
      let freePuyo = this.activePair.freePuyo
      let colors = []
      for (let i = 0; i < 2; i++) {
        switch (this.activePair.data[i]) {
          case 'R': colors.push('red'); break
          case 'G': colors.push('green'); break
          case 'B': colors.push('blue'); break
          case 'Y': colors.push('yellow'); break
          case 'P': colors.push('purple'); break
          default: colors.push('spacer')
        }
      }

      // Fall back in case the puyos are undefined
      if (colors[0] === undefined) {
        colors[0] = 'spacer'
      }
      if (colors[1] === undefined) {
        colors[0] = 'spacer'
      }

      axisPuyo.visible = true
      freePuyo.visible = true
      axisPuyo.cellPos = { x: 2, y: 1 }
      freePuyo.cellPos = { x: 2, y: 0 }
      axisPuyo.position.set(this.activeCoordArray[1][2].x, this.activeCoordArray[1][2].y)
      freePuyo.position.set(this.activeCoordArray[0][2].x, this.activeCoordArray[0][2].y)
      axisPuyo.texture = this.puyoSprites[`${colors[0]}_n.png`]
      freePuyo.texture = this.puyoSprites[`${colors[1]}_n.png`]
    },
    slideActivePair: function (d) {
      let axisPuyo = this.activePair.axisPuyo
      let freePuyo = this.activePair.freePuyo
      if (d === 'left' && axisPuyo.cellPos.x > 0 && freePuyo.cellPos.x > 0) {
        axisPuyo.cellPos.x -= 1
        freePuyo.cellPos.x -= 1
        axisPuyo.x = this.activeCoordArray[axisPuyo.cellPos.y][axisPuyo.cellPos.x].x
        freePuyo.x = this.activeCoordArray[freePuyo.cellPos.y][freePuyo.cellPos.x].x
      } else if (d === 'right' && axisPuyo.cellPos.x < this.Field.columns - 1 && freePuyo.cellPos.x < this.Field.columns - 1) {
        axisPuyo.cellPos.x += 1
        freePuyo.cellPos.x += 1
        axisPuyo.x = this.activeCoordArray[axisPuyo.cellPos.y][axisPuyo.cellPos.x].x
        freePuyo.x = this.activeCoordArray[freePuyo.cellPos.y][freePuyo.cellPos.x].x
      }
    },
    rotateActivePair: function (c) {
      let axisPuyo = this.activePair.axisPuyo
      let freePuyo = this.activePair.freePuyo
      if (c === 'ccw' && axisPuyo.cellPos.x === 0 && freePuyo.cellPos.x === 0 && freePuyo.cellPos.y === 0) {
        axisPuyo.cellPos.x += 1
        freePuyo.cellPos.y += 1
        axisPuyo.x = this.activeCoordArray[axisPuyo.cellPos.y][axisPuyo.cellPos.x].x
        freePuyo.y = this.activeCoordArray[freePuyo.cellPos.y][freePuyo.cellPos.x].y
      } else if (c === 'ccw' && axisPuyo.cellPos.x === this.Field.columns - 1 && freePuyo.cellPos.x === this.Field.columns - 1 && freePuyo.cellPos.y === 2) {
        axisPuyo.cellPos.x -= 1
        freePuyo.cellPos.y -= 1
        axisPuyo.x = this.activeCoordArray[axisPuyo.cellPos.y][axisPuyo.cellPos.x].x
        freePuyo.y = this.activeCoordArray[freePuyo.cellPos.y][freePuyo.cellPos.x].y
      } else if (c === 'cw' && axisPuyo.cellPos.x === 0 && freePuyo.cellPos.x === 0 && freePuyo.cellPos.y === 2) {
        axisPuyo.cellPos.x += 1
        freePuyo.cellPos.y -= 1
        axisPuyo.x = this.activeCoordArray[axisPuyo.cellPos.y][axisPuyo.cellPos.x].x
        freePuyo.y = this.activeCoordArray[freePuyo.cellPos.y][freePuyo.cellPos.x].y
      } else if (c === 'cw' && axisPuyo.cellPos.x === this.Field.columns - 1 && freePuyo.cellPos.x === this.Field.columns - 1 && freePuyo.cellPos.y === 0) {
        axisPuyo.cellPos.x -= 1
        freePuyo.cellPos.y += 1
        axisPuyo.x = this.activeCoordArray[axisPuyo.cellPos.y][axisPuyo.cellPos.x].x
        freePuyo.y = this.activeCoordArray[freePuyo.cellPos.y][freePuyo.cellPos.x].y
      } else if (freePuyo.cellPos.y < axisPuyo.cellPos.y) {
        if (c === 'ccw') {
          freePuyo.cellPos.y += 1
          freePuyo.cellPos.x -= 1
        } else if (c === 'cw') {
          freePuyo.cellPos.y += 1
          freePuyo.cellPos.x += 1
        }
        freePuyo.x = this.activeCoordArray[freePuyo.cellPos.y][freePuyo.cellPos.x].x
        freePuyo.y = this.activeCoordArray[freePuyo.cellPos.y][freePuyo.cellPos.x].y
      } else if (freePuyo.cellPos.y === axisPuyo.cellPos.y && freePuyo.cellPos.x < axisPuyo.cellPos.x) {
        if (c === 'ccw') {
          freePuyo.cellPos.y += 1
          freePuyo.cellPos.x += 1
        } else if (c === 'cw') {
          freePuyo.cellPos.y -= 1
          freePuyo.cellPos.x += 1
        }
        freePuyo.x = this.activeCoordArray[freePuyo.cellPos.y][freePuyo.cellPos.x].x
        freePuyo.y = this.activeCoordArray[freePuyo.cellPos.y][freePuyo.cellPos.x].y
      } else if (freePuyo.cellPos.y === axisPuyo.cellPos.y && freePuyo.cellPos.x > axisPuyo.cellPos.x) {
        if (c === 'ccw') {
          freePuyo.cellPos.y -= 1
          freePuyo.cellPos.x -= 1
        } else if (c === 'cw') {
          freePuyo.cellPos.y += 1
          freePuyo.cellPos.x -= 1
        }
        freePuyo.x = this.activeCoordArray[freePuyo.cellPos.y][freePuyo.cellPos.x].x
        freePuyo.y = this.activeCoordArray[freePuyo.cellPos.y][freePuyo.cellPos.x].y
      } else if (freePuyo.cellPos.y > axisPuyo.cellPos.y) {
        if (c === 'ccw') {
          freePuyo.cellPos.y -= 1
          freePuyo.cellPos.x += 1
        } else if (c === 'cw') {
          freePuyo.cellPos.y -= 1
          freePuyo.cellPos.x -= 1
        }
        freePuyo.x = this.activeCoordArray[freePuyo.cellPos.y][freePuyo.cellPos.x].x
        freePuyo.y = this.activeCoordArray[freePuyo.cellPos.y][freePuyo.cellPos.x].y
      }
    },
    dropActivePair: function () {
      if (this.gameState === 'idle') {
        console.log(this.gameData)
        if (this.currentSlide === this.gameData.length - 1) {
          this.gameData.push({
            fieldData: flatten2dTo1d(this.createNextFieldData()),
            fieldOriginal: flatten2dTo1d(this.createNextFieldData()),
            shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
            cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
            arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
            autoDrop: true
          })
        } else if (this.currentSlide < this.gameData.length - 1) {
          this.gameData[this.currentSlide + 1] = {
            fieldData: flatten2dTo1d(this.createNextFieldData()),
            fieldOriginal: flatten2dTo1d(this.createNextFieldData()),
            shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
            cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
            arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
            autoDrop: true
          }
        }
        this.playToNextSlide()
      } else {
        console.log('You can only place Puyos while the board is in an idle state.')
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
          this.stage.addChild(spriteArray[y][x])
        }
      }
      this.cursorDisplay = spriteArray

      let me = this
      for (let y = 0; y < this.fieldData.length; y++) {
        for (let x = 0; x < this.fieldData[0].length; x++) {
          this.updateCursorSprite(x, y)

          this.cursorDisplay[y][x].interactive = false
          this.cursorDisplay[y][x].editPuyo = function () {
            me.isMouseDown = true
            if (me.editorCurrentTool.layer === 'cursor' && me.gameState === 'idle') {
              me.cursorData[y].splice(x, 1, me.editorCurrentTool.puyo)
              me.updateCursorSprite(x, y)
              me.arrowData[y].splice(x, 1, '0')
              me.updateArrowSprite(x, y)
            }
          }
          this.cursorDisplay[y][x].mouseOver = function () {
            if (me.isMouseDown === true && me.editorCurrentTool.layer === 'cursor' && me.gameState === 'idle') {
              me.cursorData[y].splice(x, 1, me.editorCurrentTool.puyo)
              me.updateCursorSprite(x, y)
              me.arrowData[y].splice(x, 1, '0')
              me.updateArrowSprite(x, y)
            }
          }
          this.cursorDisplay[y][x].mouseUp = function () {
            me.isMouseDown = false
          }
          this.cursorDisplay[y][x].on('pointerdown', this.cursorDisplay[y][x].editPuyo)
          this.cursorDisplay[y][x].on('pointerover', this.cursorDisplay[y][x].mouseOver)
          this.cursorDisplay[y][x].on('pointerupoutside', this.cursorDisplay[y][x].mouseUp)
          this.cursorDisplay[y][x].on('pointerup', this.cursorDisplay[y][x].mouseUp)
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
          this.stage.addChild(spriteArray[y][x])
        }
      }
      this.arrowDisplay = spriteArray

      let me = this
      for (let y = 0; y < this.fieldData.length; y++) {
        for (let x = 0; x < this.fieldData[0].length; x++) {
          this.updateArrowSprite(x, y)

          this.arrowDisplay[y][x].interactive = false
          this.arrowDisplay[y][x].editPuyo = function () {
            me.isMouseDown = true
            if (me.editorCurrentTool.layer === 'arrow' && me.gameState === 'idle') {
              me.arrowData[y].splice(x, 1, me.editorCurrentTool.puyo)
              me.updateArrowSprite(x, y)
              me.cursorData[y].splice(x, 1, '0')
              me.updateCursorSprite(x, y)
            }
          }
          this.arrowDisplay[y][x].mouseOver = function () {
            if (me.isMouseDown === true && me.editorCurrentTool.layer === 'arrow' && me.gameState === 'idle') {
              me.arrowData[y].splice(x, 1, me.editorCurrentTool.puyo)
              me.updateArrowSprite(x, y)
              me.cursorData[y].splice(x, 1, '0')
              me.updateCursorSprite(x, y)
            }
          }
          this.arrowDisplay[y][x].mouseUp = function () {
            me.isMouseDown = false
          }
          this.arrowDisplay[y][x].on('pointerdown', this.arrowDisplay[y][x].editPuyo)
          this.arrowDisplay[y][x].on('pointerover', this.arrowDisplay[y][x].mouseOver)
          this.arrowDisplay[y][x].on('pointerupoutside', this.arrowDisplay[y][x].mouseUp)
          this.arrowDisplay[y][x].on('pointerup', this.arrowDisplay[y][x].mouseUp)
        }
      }
    },
    initDumpDisplay: function () {
      // this.setDumpMatrixDropData()
      let spriteArray = []
      for (let y = 0; y < this.Field.totalRows; y++) {
        spriteArray[y] = []
        for (let x = 0; x < this.Field.columns; x++) {
          spriteArray[y][x] = new Sprite(this.puyoSprites[`spacer_n.png`])
          spriteArray[y][x].anchor.set(0.5)
          spriteArray[y][x].x = this.coordArray[y][x].x
          spriteArray[y][x].y = this.coordArray[y][x].y - 60 * 13
          this.stage.addChild(spriteArray[y][x])
        }
      }
      this.dumpDisplay = spriteArray
      for (let y = 0; y < this.Field.totalRows; y++) {
        for (let x = 0; x < this.Field.columns; x++) {
          this.dumpDisplay[y][x].visible = false
        }
      }
    },
    updateDumpDisplay: function () {
      let color = ''
      for (let y = 0; y < this.Field.totalRows; y++) {
        for (let x = 0; x < this.Field.columns; x++) {
          switch (this.chainDiff[y][x]) {
            case 'R': color = 'red'; break
            case 'G': color = 'green'; break
            case 'B': color = 'blue'; break
            case 'Y': color = 'yellow'; break
            case 'P': color = 'purple'; break
            case 'J': color = 'garbage'; break
            default: color = 'spacer'
          }
          console.log(color)
          this.dumpDisplay[y][x].texture = this.puyoSprites[`${color}_n.png`]
          this.dumpDisplay[y][x].anchor.set(0.5)
          this.dumpDisplay[y][x].x = this.coordArray[y][x].x
          this.dumpDisplay[y][x].y = this.coordArray[y][x].y - 60 * 13
        }
      }

      for (let y = 0; y < this.Field.totalRows; y++) {
        for (let x = 0; x < this.Field.columns; x++) {
          this.dumpDisplay[y][x].visible = true
        }
      }
    },
    initPlayControls: function () {
      let startY = 480
      let height
      let i = 0

      this.playCtrlDisplay.rotateLeft = new Sprite(this.fieldSprites['btn_rotateleft.png'])
      this.playCtrlDisplay.rotateLeft.x = 452
      this.playCtrlDisplay.rotateLeft.y = startY
      this.playCtrlDisplay.rotateLeft.interactive = true
      this.playCtrlDisplay.rotateLeft.buttonMode = true
      this.playCtrlDisplay.rotateLeft
        .on('pointerdown', () => {
          this.playCtrlDisplay.rotateLeft.texture = this.fieldSprites[`btn_rotateleft_pressed.png`]
        })
        .on('pointerup', () => {
          this.playCtrlDisplay.rotateLeft.texture = this.fieldSprites[`btn_rotateleft.png`]
          this.rotateActivePair('ccw')
        })
        .on('pointerup', () => {
          this.playCtrlDisplay.rotateLeft.texture = this.fieldSprites[`btn_rotateleft.png`]
        })
      this.stage.addChild(this.playCtrlDisplay.rotateLeft)
      height = this.playCtrlDisplay.rotateLeft.height

      this.playCtrlDisplay.rotateRight = new Sprite(this.fieldSprites['btn_rotateright.png'])
      this.playCtrlDisplay.rotateRight.x = 528
      this.playCtrlDisplay.rotateRight.y = startY + height * i
      this.playCtrlDisplay.rotateRight.interactive = true
      this.playCtrlDisplay.rotateRight.buttonMode = true
      this.playCtrlDisplay.rotateRight
        .on('pointerdown', () => {
          this.playCtrlDisplay.rotateRight.texture = this.fieldSprites[`btn_rotateright_pressed.png`]
        })
        .on('pointerup', () => {
          this.playCtrlDisplay.rotateRight.texture = this.fieldSprites[`btn_rotateright.png`]
          this.rotateActivePair('cw')
        })
        .on('pointerup', () => {
          this.playCtrlDisplay.rotateRight.texture = this.fieldSprites[`btn_rotateright.png`]
        })
      this.stage.addChild(this.playCtrlDisplay.rotateRight)
      i += 1

      this.playCtrlDisplay.moveLeft = new Sprite(this.fieldSprites['btn_left.png'])
      this.playCtrlDisplay.moveLeft.x = 452
      this.playCtrlDisplay.moveLeft.y = startY + height * i
      this.playCtrlDisplay.moveLeft.interactive = true
      this.playCtrlDisplay.moveLeft.buttonMode = true
      this.playCtrlDisplay.moveLeft
        .on('pointerdown', () => {
          this.playCtrlDisplay.moveLeft.texture = this.fieldSprites[`btn_left_pressed.png`]
        })
        .on('pointerup', () => {
          this.playCtrlDisplay.moveLeft.texture = this.fieldSprites[`btn_left.png`]
          this.slideActivePair('left')
        })
        .on('pointerup', () => {
          this.playCtrlDisplay.moveLeft.texture = this.fieldSprites[`btn_left.png`]
        })
      this.stage.addChild(this.playCtrlDisplay.moveLeft)

      this.playCtrlDisplay.moveRight = new Sprite(this.fieldSprites['btn_right.png'])
      this.playCtrlDisplay.moveRight.x = 528
      this.playCtrlDisplay.moveRight.y = startY + height * i
      this.playCtrlDisplay.moveRight.interactive = true
      this.playCtrlDisplay.moveRight.buttonMode = true
      this.playCtrlDisplay.moveRight
        .on('pointerdown', () => {
          this.playCtrlDisplay.moveRight.texture = this.fieldSprites[`btn_right_pressed.png`]
        })
        .on('pointerup', () => {
          this.playCtrlDisplay.moveRight.texture = this.fieldSprites[`btn_right.png`]
          this.slideActivePair('right')
        })
        .on('pointerup', () => {
          this.playCtrlDisplay.moveRight.texture = this.fieldSprites[`btn_right.png`]
        })
      this.stage.addChild(this.playCtrlDisplay.moveRight)
      i += 1

      this.playCtrlDisplay.moveDown = new Sprite(this.fieldSprites['btn_down.png'])
      this.playCtrlDisplay.moveDown.x = 490
      this.playCtrlDisplay.moveDown.y = startY + height * i
      this.playCtrlDisplay.moveDown.interactive = true
      this.playCtrlDisplay.moveDown.buttonMode = true
      this.playCtrlDisplay.moveDown
        .on('pointerdown', () => {
          this.playCtrlDisplay.moveDown.texture = this.fieldSprites[`btn_down_pressed.png`]
        })
        .on('pointerup', () => {
          this.playCtrlDisplay.moveDown.texture = this.fieldSprites[`btn_down.png`]
          this.dropActivePair()
        })
        .on('pointerup', () => {
          this.playCtrlDisplay.moveDown.texture = this.fieldSprites[`btn_down.png`]
        })
      this.stage.addChild(this.playCtrlDisplay.moveDown)
    },
    initToolDisplay: function () {
      let me = this

      // "Speech bubble"
      this.fieldDisplay.editBubble = new Sprite(resources['/img/edit_bubble.png'].texture)
      this.fieldDisplay.editBubble.x = 520
      this.fieldDisplay.editBubble.y = 704
      this.fieldDisplay.editBubble.anchor.set(0.87, 0)
      this.fieldDisplay.editBubble.scale.set(0, 0)
      this.fieldDisplay.editBubble.interactive = true
      this.fieldDisplay.editBubble.visible = false
      this.stage.addChild(this.fieldDisplay.editBubble)

      // Current tool cursor
      this.toolCursor = new Sprite(resources['/img/current_tool.png'].texture)
      this.toolCursor.anchor.set(0.5, 0.5)
      this.toolCursor.visible = false
      this.stage.addChild(this.toolCursor)

      // Initialize PIXI Containers
      this.editorTools[0] = new PIXI.Container()
      this.editorTools[1] = new PIXI.Container()

      // Set up page 1
      let nameToolsPage0 = [[this.puyoSprites['red_n.png'], this.puyoSprites['green_n.png'], this.puyoSprites['blue_n.png'], this.puyoSprites['yellow_n.png'], this.puyoSprites['purple_n.png'], this.puyoSprites['garbage_n.png'], resources['/img/editor_x.png'].texture],
        [this.puyoSprites['red_n.png'], this.puyoSprites['green_n.png'], this.puyoSprites['blue_n.png'], this.puyoSprites['yellow_n.png'], this.puyoSprites['purple_n.png'], this.puyoSprites['garbage_n.png'], resources['/img/editor_x.png'].texture]]
      let spritesToolsPage0 = []
      let colorsPage0 = ['R', 'G', 'B', 'Y', 'P', 'J', '0', 'R', 'G', 'B', 'Y', 'P', 'J', '0']
      let startX = 56 + 32
      let startY = 788 + 32

      for (let y = 0; y < nameToolsPage0.length; y++) {
        spritesToolsPage0[y] = []
        for (let x = 0; x < nameToolsPage0[y].length; x++) {
          // Placement variables
          let horizontalPadding = 0
          let verticalPadding = 0
          if (x > 0) {
            horizontalPadding = 8
          }
          if (y > 0) {
            verticalPadding = 8
          }

          // Init sprite
          spritesToolsPage0[y][x] = new Sprite(nameToolsPage0[y][x])
          spritesToolsPage0[y][x].interactive = true
          spritesToolsPage0[y][x].buttonMode = true
          spritesToolsPage0[y][x].puyoIndex = y * 7 + x
          spritesToolsPage0[y][x].puyoColor = colorsPage0[y * 7 + x]
          if (y * 7 + x < 7) {
            spritesToolsPage0[y][x].targetLayer = 'main'
          } else {
            spritesToolsPage0[y][x].targetLayer = 'shadow'
          }
          spritesToolsPage0[y][x].anchor.set(0.5, 0.5)

          // Define interactions
          spritesToolsPage0[y][x].on('pointerdown', function () {
            me.editorCurrentTool.page = 0
            me.editorCurrentTool.item = this.puyoIndex
            me.editorCurrentTool.puyo = this.puyoColor
            me.editorCurrentTool.layer = this.targetLayer
            me.targetLayer(this.targetLayer) // Sets the field's target layer
            me.editorCurrentTool.x = this.x
            me.editorCurrentTool.y = this.y
            me.updateToolboxSelection()
            console.log(me.editorCurrentTool)
          })

          // Place sprite
          if (y === 0) {
            spritesToolsPage0[y][x].x = startX + (spritesToolsPage0[y][x].width + horizontalPadding) * x
            spritesToolsPage0[y][x].y = startY + (spritesToolsPage0[y][x].height + verticalPadding) * y
          } else {
            spritesToolsPage0[y][x].x = startX + (spritesToolsPage0[y][x].width + horizontalPadding) * x
            spritesToolsPage0[y][x].y = startY + (spritesToolsPage0[y][x].height + verticalPadding) * y
          }

          // Add sprite to PIXI containers
          this.editorTools[0].addChild(spritesToolsPage0[y][x])
        }
      }

      let nameToolsPage1 = [[resources['/img/arrow.png'].texture, resources['/img/arrow.png'].texture, resources['/img/arrow.png'].texture, resources['/img/arrow.png'].texture, resources['/img/arrow_x.png'].texture, resources['/img/cursor.png'].texture, resources['/img/cursor_x.png'].texture]]
      let spritesToolsPage1 = []
      let fieldCodesPage1 = ['L', 'U', 'R', 'D', '0', '1', '0']
      for (let y = 0; y < nameToolsPage1.length; y++) {
        spritesToolsPage1[y] = []
        for (let x = 0; x < nameToolsPage1[y].length; x++) {
          // Placement variables
          let horizontalPadding = 0
          let verticalPadding = 0
          if (x > 0) {
            horizontalPadding = 8
          }
          if (y > 0) {
            verticalPadding = 8
          }

          // Init sprite. 7 = numPerRow - 1
          spritesToolsPage1[y][x] = new Sprite(nameToolsPage1[y][x])
          spritesToolsPage1[y][x].interactive = true
          spritesToolsPage1[y][x].buttonMode = true
          spritesToolsPage1[y][x].puyoIndex = y * 7 + x
          spritesToolsPage1[y][x].puyoColor = fieldCodesPage1[y * 7 + x]

          if (fieldCodesPage1[y * 7 + x] === 'L') {
            spritesToolsPage1[y][x].rotation = (3 / 2) * Math.PI
          } else if (fieldCodesPage1[y * 7 + x] === 'R') {
            spritesToolsPage1[y][x].rotation = (1 / 2) * Math.PI
          } else if (fieldCodesPage1[y * 7 + x] === 'D') {
            spritesToolsPage1[y][x].rotation = Math.PI
          }

          if (y * 7 + x < 5) {
            spritesToolsPage1[y][x].targetLayer = 'arrow'
          } else {
            spritesToolsPage1[y][x].targetLayer = 'cursor'
          }
          spritesToolsPage1[y][x].anchor.set(0.5, 0.5)

          // Define interactions
          spritesToolsPage1[y][x].on('pointerdown', function () {
            me.editorCurrentTool.page = 1
            me.editorCurrentTool.item = this.puyoIndex
            me.editorCurrentTool.puyo = this.puyoColor
            me.editorCurrentTool.layer = this.targetLayer
            me.targetLayer(this.targetLayer) // Sets the field's target layer
            me.editorCurrentTool.x = this.x
            me.editorCurrentTool.y = this.y
            me.updateToolboxSelection()
            console.log(me.editorCurrentTool)
          })

          // Place sprite
          if (y === 0) {
            spritesToolsPage1[y][x].x = startX + (64 + horizontalPadding) * x
            spritesToolsPage1[y][x].y = startY + (60 + verticalPadding) * y
          } else {
            spritesToolsPage1[y][x].x = startX + (64 + horizontalPadding) * x
            spritesToolsPage1[y][x].y = startY + (60 + verticalPadding) * y
          }

          // Add sprite to PIXI containers
          this.editorTools[1].addChild(spritesToolsPage1[y][x])
        }
      }

      // Place the stuff on the stage
      this.editorWindow.left = new Sprite(resources['/img/picker_arrow_left.png'].texture)
      this.editorWindow.left.x = 0
      this.editorWindow.left.y = 720
      this.editorWindow.left.interactive = true
      this.editorWindow.left.buttonMode = true
      this.editorWindow.left.visible = false
      this.editorWindow.left.on('pointerdown', function () {
        if (me.toolPage === 0) {
          me.toolPage = 1
          me.editorTools[0].visible = false
          me.editorTools[1].visible = true
          me.updateToolboxSelection()
        } else if (me.toolPage === 1) {
          me.toolPage = 0
          me.editorTools[0].visible = true
          me.editorTools[1].visible = false
          me.updateToolboxSelection()
        }
      })
      this.stage.addChild(this.editorWindow.left)

      this.editorWindow.right = new Sprite(resources['/img/picker_arrow_right.png'].texture)
      this.editorWindow.right.x = 552
      this.editorWindow.right.y = 720
      this.editorWindow.right.interactive = true
      this.editorWindow.right.buttonMode = true
      this.editorWindow.right.visible = false
      this.editorWindow.right.on('pointerdown', function () {
        if (me.toolPage === 0) {
          me.toolPage = 1
          me.editorTools[0].visible = false
          me.editorTools[1].visible = true
          me.updateToolboxSelection()
        } else if (me.toolPage === 1) {
          me.toolPage = 0
          me.editorTools[0].visible = true
          me.editorTools[1].visible = false
          me.updateToolboxSelection()
        }
      })
      this.stage.addChild(this.editorWindow.right)

      this.editorTools[0].visible = false
      this.stage.addChild(this.editorTools[0])
      this.editorTools[1].visible = false
      this.stage.addChild(this.editorTools[1])
    },
    openToolbox: function (delta) {
      let duration = 15 // frames
      this.timers.editBubble += delta
      let t = this.timers.editBubble
      this.fieldDisplay.disableTouchBehind.interactive = true

      if (this.timers.editBubble <= duration) {
        this.fieldDisplay.editBubble.scale.set(this.Easers.editBubble(t / duration), this.Easers.editBubble(t / duration))
      } else {
        this.ticker.remove(this.openToolbox)
        this.ticker.add(this.displayTools)
        this.editorWindow.left.visible = true
        this.editorWindow.right.visible = true
        this.timers.toolIntroFade = 0
      }
    },
    displayTools: function (delta) {
      let fadeSpeed = 12
      this.timers.toolIntroFade += delta
      let t = this.timers.toolIntroFade
      let delay = 2
      let delayArray = []
      let alphaArray = []
      this.editorTools[this.toolPage].visible = true
      this.updateToolboxSelection()

      if (t <= delay * this.editorTools[this.toolPage].children.length + fadeSpeed) {
        for (let i = 0; i < this.editorTools[this.toolPage].children.length; i++) {
          delayArray.push(0 - i * delay)
        }
        for (let i = 0; i < this.editorTools[this.toolPage].children.length; i++) {
          alphaArray.push((delayArray[i] + t) / fadeSpeed)

          // Fade in the Puyos.
          if (i < 7) {
            this.editorTools[this.toolPage].children[i].alpha = alphaArray[i]
          } else {
            this.editorTools[this.toolPage].children[i].alpha = alphaArray[i] * 0.17
          }

          // Fade in the selector
          if (i === this.editorCurrentTool.item) {
            this.toolCursor.alpha = alphaArray[i]
          }
        }
      } else {
        this.ticker.remove(this.displayTools)
        this.updateToolboxSelection()
        console.log('removed tool ticker')
      }
    },
    updateToolboxSelection: function () {
      if (this.editorCurrentTool.page === this.toolPage) {
        this.toolCursor.visible = true
        this.toolCursor.position.set(this.editorCurrentTool.x, this.editorCurrentTool.y)
      } else {
        this.toolCursor.visible = false
      }
    },
    targetLayer: function (layer) {
      // Disable interactions for Puyos that aren't on the targetted layer.
      if (layer === 'main') {
        for (let y = 0; y < this.Field.totalRows; y++) {
          for (let x = 0; x < this.Field.columns; x++) {
            this.puyoDisplay[y][x].interactive = true
            this.shadowDisplay[y][x].interactive = false
            this.cursorDisplay[y][x].interactive = false
            this.arrowDisplay[y][x].interactive = false
          }
        }
      } else if (layer === 'shadow') {
        for (let y = 0; y < this.Field.totalRows; y++) {
          for (let x = 0; x < this.Field.columns; x++) {
            this.puyoDisplay[y][x].interactive = false
            this.shadowDisplay[y][x].interactive = true
            this.cursorDisplay[y][x].interactive = false
            this.arrowDisplay[y][x].interactive = false
          }
        }
      } else if (layer === 'cursor') {
        for (let y = 0; y < this.Field.totalRows; y++) {
          for (let x = 0; x < this.Field.columns; x++) {
            this.puyoDisplay[y][x].interactive = false
            this.shadowDisplay[y][x].interactive = false
            this.cursorDisplay[y][x].interactive = true
            this.arrowDisplay[y][x].interactive = false
          }
        }
      } else if (layer === 'arrow') {
        for (let y = 0; y < this.Field.totalRows; y++) {
          for (let x = 0; x < this.Field.columns; x++) {
            this.puyoDisplay[y][x].interactive = false
            this.shadowDisplay[y][x].interactive = false
            this.cursorDisplay[y][x].interactive = false
            this.arrowDisplay[y][x].interactive = true
          }
        }
      }
    },
    closeToolbox: function (delta) {
      let duration = 15 // frames
      this.timers.editBubble -= delta
      let t = this.timers.editBubble
      this.editorTools[this.toolPage].visible = false
      this.editorWindow.left.visible = false
      this.editorWindow.right.visible = false
      this.toolCursor.visible = false
      this.ticker.remove(this.displayTools)

      if (this.timers.editBubble >= 0) {
        this.fieldDisplay.editBubble.scale.set(this.Easers.editBubble(t / duration), this.Easers.editBubble(t / duration))
      } else {
        this.ticker.remove(this.closeToolbox)
        this.gameState = 'idle'
        this.timers.editBubble = 0
        this.fieldDisplay.editBubble.visible = false
        this.fieldDisplay.disableTouchBehind.interactive = false
      }
    },
    gameLoop: function (delta) {
      if (this.gameState === 'idle') {
        this.stateEditField(delta)
      } else if (this.gameState === 'dropping' && this.needToReset === false) {
        this.animateDropPuyos(delta)
        if (this.needToChangeSlides === true) {
          this.animateDropDumpPuyos(delta)
        }
      } else if (this.gameState === 'popping' && this.needToReset === false) {
        this.animatePopPuyos(delta)
      }
      // this.animateCursors(delta)
      // this.animateArrows(delta)

      // this.nextPuyoPairs.forEach((pair) => {
      //   pair.rotation += 2 * Math.PI / 60
      // })

      this.renderer.render(this.stage)
    },
    stateEditField: function (delta) {
      //
    },
    animateDropPuyos: function (delta) {
      let t = this.frame
      if (this.stopGame === true) {
        delta = 0
      }
      let speed = delta * this.simulationSpeed
      for (let i = 0; i < Math.round(speed); i++) { // Repeat the logic based on skipped frames
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
    animateDropDumpPuyos: function (delta) {
      if (this.stopGame === true) {
        delta = 0
      }
      let speed = delta * this.simulationSpeed
      console.log(speed)
      for (let i = 0; i < Math.round(speed); i++) { // Repeat the logic based on skipped frames
        for (let y = 0; y < this.Field.totalRows; y++) {
          for (let x = 0; x < this.Field.columns; x++) {
            if (this.dropDumpDistances[y][x] > 0) {
              console.log('Detected cells with distance needed greater than 0')
              if (this.dumpPuyoStates[y][x] === 'idle' || this.dumpPuyoStates[y][x] === 'checkDrops') {
                this.dumpPuyoStates[y].splice(x, 1, 'dropping')
              } else if (this.dumpPuyoStates[y][x] === 'dropping') {
                if (this.dumpDisplay[y][x].y + this.dumpVelocity[y][x] < this.dumpCoordArray[y][x].y + this.dropDumpDistances[y][x] * this.Field.cellHeight) {
                  console.log('dropping dumps')
                  this.dumpDisplay[y][x].y += this.dumpVelocity[y][x]
                  this.dumpVelocity[y][x] += 0.1875 / 16 * 60 * this.frame
                } else {
                  console.log('dump bounce state')
                  this.dumpPuyoStates[y].splice(x, 1, 'bouncing')
                  this.dumpDisplay[y][x].y = this.dumpCoordArray[y][x].y + this.dropDumpDistances[y][x] * this.Field.cellHeight + this.Field.cellHeight / 2
                  this.dumpDisplay[y][x].anchor.set(0.5, 1)
                }
              } else if (this.dumpPuyoStates[y][x] === 'bouncing') {
                this.dumpCellTimer[y][x] += 1
                if (this.dumpCellTimer[y][x] <= 8) {
                  this.dumpDisplay[y][x].scale.y -= 0.2 / 8
                  this.dumpDisplay[y][x].scale.x += 0.2 / 8
                } else if (this.dumpCellTimer[y][x] <= 16) {
                  this.dumpDisplay[y][x].scale.y += 0.2 / 8
                  this.dumpDisplay[y][x].scale.x -= 0.2 / 8
                } else {
                  console.log('it is no more.')
                  this.dumpDisplay[y][x].anchor.set(0.5, 0.5)
                  this.dumpDisplay[y][x].y = this.dumpCoordArray[y][x].y + this.dropDumpDistances[y][x] * this.Field.cellHeight
                  this.dumpPuyoStates[y].splice(x, 1, 'checkPops')
                  this.droppingDumpCells[y].splice(x, 1, false)
                  this.dropDumpDistances[y].splice(x, 1, 0)
                  this.dumpCellTimer[y].splice(x, 1, 0)
                  this.dumpVelocity[y].splice(x, 1, 3.75)
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
    animatePopPuyos: function (delta) {
      let t = this.frame
      if (this.stopGame === true) {
        delta = 0
      }
      let speed = delta * this.simulationSpeed
      for (let i = 0; i < Math.round(speed); i++) { // Repeat the logic if frames were skipped
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
    animateCursors: function (delta) {
      let t = this.timers.cursor

      for (let y = 0; y < this.Field.totalRows; y++) {
        for (let x = 0; x < this.Field.columns; x++) {
          Math.cos(t / 30 * Math.PI) >= 0
            ? this.cursorDisplay[y][x].scale.set(0.9, 0.9)
            : this.cursorDisplay[y][x].scale.set(1, 1)
        }
      }

      this.timers.cursor += delta
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
      } else {
        this.gameState = this.gamePlayable ? 'idle' : 'chainStopped'
      }
    },
    mergeInShadowLayer: function (replace) {
      for (let y = 0; y < this.Field.totalRows; y++) {
        for (let x = 0; x < this.Field.columns; x++) {
          if (this.shadowData[y][x] !== '0' && this.shadowData[y][x] !== this.fieldData[y][x]) {
            this.fieldData[y].splice(x, 1, this.shadowData[y][x])
            if (replace === true) {
              console.log('Replacing old shadow puyo forever...')
              this.shadowData[y].splice(x, 1, '0')
              this.updateShadowSprite(x, y)
            }
          }
        }
      }

      this.updatePuyoSprites()
      console.log('merged shadow layer')
    },
    setMouseDown: function (bool) {
      this.isMouseDown = bool // true, false
    },
    // Simulation controls
    controlField: function (control) { // expects a string
      if (control === 'reset') {
        // Stop all tickers, reset timers, and reset the field.
        this.needToReset = true
        this.ticker.remove(this.animateChainCounter)
        this.ticker.remove(this.animateDropPuyos)
        this.ticker.remove(this.animatePopPuyos)
        this.ticker.remove(this.animateGarbageTray)
        this.cellTimer = uniformMatrix(0, this.fieldSettings.totalRows, this.fieldSettings.columns)
        for (let key in this.timers) {
          this.timers[key] = 0
        }
        this.resetField()
      } else if (control === 'back') {
        console.log(`I didn't make a function for back yet.`)
      } else if (control === 'pause') {
        this.chainAutoPlay = false
      } else if (control === 'play') {
        if (this.gameState === 'idle') {
          this.fieldOriginal = JSON.parse(JSON.stringify(this.fieldData))
          if (this.needToChangeSlides === false) {
            this.mergeInShadowLayer(true)
          }
          this.simulationSpeed = 1
        } else if (this.gameState === 'popping' || this.gameState === 'dropping') {
          this.simulationSpeed = 24
        }
        this.playStep()
      } else if (control === 'auto') {
        if (this.gameState === 'idle') {
          this.fieldOriginal = JSON.parse(JSON.stringify(this.fieldData))
          if (this.needToChangeSlides === false) {
            this.mergeInShadowLayer(true)
          }
          this.simulationSpeed = 1
        } else if ((this.gameState === 'popping' || this.gameState === 'dropping') && this.simulationSpeed === 8) {
          this.simulationSpeed = 24
        } else if (this.gameState === 'popping' || this.gameState === 'dropping') {
          this.simulationSpeed = 8
        } else if (this.gameState === 'chainStopped') {
          this.simulationSpeed = 1
        }
        this.playChain()
      } else if (control === 'edit') {
        if (this.gameState !== 'editor') {
          this.ticker.add(this.openToolbox)
          this.ticker.remove(this.closeToolbox)
          this.gameState = 'editor'
          this.fieldDisplay.editBubble.visible = true
        } else if (this.gameState === 'editor') {
          this.gameState = 'idle'
          this.ticker.remove(this.openToolbox)
          this.ticker.add(this.closeToolbox)
        }
      } else if (control === 'empty') {
        this.needToReset = true
        this.ticker.remove(this.animateChainCounter)
        this.ticker.remove(this.animateDropPuyos)
        this.ticker.remove(this.animatePopPuyos)
        this.ticker.remove(this.animateGarbageTray)
        this.cellTimer = uniformMatrix(0, this.fieldSettings.totalRows, this.fieldSettings.columns)
        for (let key in this.timers) {
          this.timers[key] = 0
        }
        this.emptyField()
      }
    },
    resetField: function () {
      this.poppingCells = uniformMatrix(false, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.droppingCells = uniformMatrix(false, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.dropDistances = uniformMatrix(0, this.fieldSettings.totalRows, this.fieldSettings.columns)
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
    emptyField: function () {
      this.poppingCells = uniformMatrix(false, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.droppingCells = uniformMatrix(false, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.dropDistances = uniformMatrix(0, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.gameState = 'idle'
      this.score = 0
      this.stepScore = 0
      this.garbage = 0
      this.stepGarbage = 0
      this.garbagePoints = 0
      this.leftoverGarbagePoints = 0
      this.chainLength = 0
      this.$nextTick(() => {
        this.fieldData = uniformMatrix('0', this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.updatePuyoSprites()
        this.shadowData = uniformMatrix('0', this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.cursorData = uniformMatrix('0', this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.arrowData = uniformMatrix('0', this.fieldSettings.totalRows, this.fieldSettings.columns)
        for (let y = 0; y < this.Field.totalRows; y++) {
          for (let x = 0; x < this.Field.columns; x++) {
            this.updateShadowSprite(x, y)
            this.updateCursorSprite(x, y)
            this.updateArrowSprite(x, y)
          }
        }
        this.needToReset = false
      })
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
    animateChainCounter: function (delta) {
      let t = this.timers.chainLength
      this.timers.chainLength += delta
      if (this.timers.chainLength <= 30) {
        this.chainCountDisplay.y = this.chainCountDisplay.origY - 16 * ((-1 / 225) * (t - 15) ** 2 + 1) // parabola
      } else {
        this.chainCountDisplay.y = this.chainCountDisplay.origY
        this.ticker.remove(this.animateChainCounter)
        console.log('counter bounce over')
      }
    },
    animateGarbageTray: function (delta) {
      let t = this.timers.garbageTray
      let centerX = (this.garbageDisplay[2].origX + this.garbageDisplay[3].origX) / 2
      let duration = 8
      if (t < 8) {
        for (let i = 0; i < 6; i++) {
          this.garbageDisplay[i].x = this.garbageDisplay[i].x + ((this.garbageDisplay[i].origX - centerX) / duration)
        }

        // Fallback in case it goes too far
        for (let i = 0; i < 3; i++) {
          if (this.garbageDisplay[i].x < this.garbageDisplay.origX) {
            this.garbageDisplay[i].x = this.garbageDisplay.origX
          }
        }
        for (let i = 3; i < 6; i++) {
          if (this.garbageDisplay[i].x > this.garbageDisplay.origX) {
            this.garbageDisplay[i].x = this.garbageDisplay.origX
          }
        }
        this.timers.garbageTray += 1
      } else {
        this.ticker.remove(this.animateGarbageTray)
        console.log('removed garbage tray animation')
      }
    },
    animateArrows: function (delta) {
      let t = this.timers.arrow

      for (let y = 0; y < this.Field.totalRows; y++) {
        for (let x = 0; x < this.Field.columns; x++) {
          if (this.arrowData[y][x] === 'R') {
            this.arrowDisplay[y][x].x = this.coordArray[y][x].x + 8 * Math.cos(t / 30 * Math.PI)
          }
          if (this.arrowData[y][x] === 'L') {
            this.arrowDisplay[y][x].x = this.coordArray[y][x].x - 8 * Math.cos(t / 30 * Math.PI)
          }
          if (this.arrowData[y][x] === 'U') {
            this.arrowDisplay[y][x].y = this.coordArray[y][x].y - 8 * Math.cos(t / 30 * Math.PI)
          }
          if (this.arrowData[y][x] === 'D') {
            this.arrowDisplay[y][x].y = this.coordArray[y][x].y + 8 * Math.cos(t / 30 * Math.PI)
          }
        }
      }
      this.timers.arrow += delta
    },
    animateNextPuyos: function (delta) {
      let t = this.timers.next
      let duration = 12

      this.nextPuyoPairs[0].y = this.nextCoord[0].y - ((this.nextCoord[0].y - 106) / duration) * t

      this.nextPuyoPairs[1].x = this.nextCoord[1].x - ((this.nextCoord[1].x - this.nextCoord[0].x) / duration) * t
      this.nextPuyoPairs[1].y = this.nextCoord[1].y - ((this.nextCoord[1].y - this.nextCoord[0].y) / duration) * t
      this.nextPuyoPairs[1].scale.set(0.8 + (0.2 / duration * t), 0.8 + (0.2 / duration * t))

      this.nextPuyoPairs[2].y = this.nextCoord[2].y - ((this.nextCoord[2].y - this.nextCoord[1].y) / duration) * t

      if (t >= duration) {
        this.ticker.remove(this.animateNextPuyos)
        this.nextQueuePosition += 2
        this.timers.next = 0
        this.updateNextPuyoSprites()
        this.updateActivePair()
        return
      }
      this.timers.next += 1
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
    },
    setDumpMatrixDropData: function () {
      let settings = {
        columns: 6,
        visibleRows: 12,
        hiddenRows: 14,
        totalRows: 26,
        puyoToClear: 4
      }
      let field = new Chainsim.Field(settings, this.combinedMatrix)
      let dropResult = Chainsim.Simulate.dropPuyos(field)

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

      let dropDistanceArray = []
      for (let y = 0; y < this.Field.totalRows; y++) {
        dropDistanceArray[y] = []
        for (let x = 0; x < this.Field.columns; x++) {
          dropDistanceArray[y][x] = dropResult.dropDistances[y][x]
        }
      }

      this.droppingDumpCells = dropAnimationArray
      this.dropDumpDistances = dropDistanceArray
    },
    updateWithNextSlide: function () {
      console.log('Updating with next slide')
      this.activePair.axisPuyo.visible = false
      this.activePair.freePuyo.visible = false
      this.poppingCells = uniformMatrix(false, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.droppingCells = uniformMatrix(false, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.dropDistances = uniformMatrix(0, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.dropDumpDistances = uniformMatrix(0, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.droppingDumpCells = uniformMatrix(false, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.score = 0
      this.stepScore = 0
      this.garbage = 0
      this.stepGarbage = 0
      this.garbagePoints = 0
      this.leftoverGarbagePoints = 0
      this.chainLength = 0
      this.fieldData = stringTo2dArray(this.gameData[this.currentSlide + 1].fieldData, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.needToReset = false
      this.needToChangeSlides = false
      this.gameState = 'idle'
      this.shadowData = stringTo2dArray(this.gameData[this.currentSlide + 1].shadowData, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.cursorData = stringTo2dArray(this.gameData[this.currentSlide + 1].cursorData, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.arrowData = stringTo2dArray(this.gameData[this.currentSlide + 1].arrowData, this.fieldSettings.totalRows, this.fieldSettings.columns)
      this.currentSlide += 1
      for (let y = 0; y < this.Field.totalRows; y++) {
        for (let x = 0; x < this.Field.columns; x++) {
          this.updateShadowSprite(x, y)
          this.updateCursorSprite(x, y)
          this.updateArrowSprite(x, y)
        }
      }

      this.ticker.addOnce(() => {
        this.updatePuyoSprites()
        for (let y = 0; y < this.Field.totalRows; y++) {
          for (let x = 0; x < this.Field.columns; x++) {
            this.dumpDisplay[y][x].visible = false
          }
        }
        this.controlField('auto')
      })
    },
    prevSlide: function () {
      if (this.currentSlide > 0 && this.gameState === 'idle') {
        // Reset to the original field in case the user made some edits.
        this.poppingCells = uniformMatrix(false, this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.droppingCells = uniformMatrix(false, this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.dropDistances = uniformMatrix(0, this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.score = 0
        this.stepScore = 0
        this.garbage = 0
        this.stepGarbage = 0
        this.garbagePoints = 0
        this.leftoverGarbagePoints = 0
        this.chainLength = 0
        this.fieldData = stringTo2dArray(this.gameData[this.currentSlide - 1].fieldData, this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.needToReset = false
        this.needToChangeSlides = false
        this.nextQueuePosition -= 2 // Next Queue Position
        for (let y = 0; y < this.Field.totalRows; y++) {
          for (let x = 0; x < this.Field.columns; x++) {
            this.dumpDisplay[y][x].visible = false
          }
        }
        this.shadowData = stringTo2dArray(this.gameData[this.currentSlide - 1].shadowData, this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.cursorData = stringTo2dArray(this.gameData[this.currentSlide - 1].cursorData, this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.arrowData = stringTo2dArray(this.gameData[this.currentSlide - 1].arrowData, this.fieldSettings.totalRows, this.fieldSettings.columns)

        this.currentSlide -= 1
        this.updatePuyoSprites()
        this.updateNextPuyoSprites()
        for (let y = 0; y < this.Field.totalRows; y++) {
          for (let x = 0; x < this.Field.columns; x++) {
            this.updateShadowSprite(x, y)
            this.updateCursorSprite(x, y)
            this.updateArrowSprite(x, y)
          }
        }
      }
    },
    nextSlide: function () {
      if (this.currentSlide < this.gameData.length - 1 && this.gameState === 'idle') {
        // Reset to the original field in case the user made some edits.
        this.fieldData = this.gamePlayable ? this.fieldData : stringTo2dArray(this.gameData[this.currentSlide].fieldData, this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.updatePuyoSprites()
        this.ticker.add(this.animateNextPuyos)
        // this.updateDumpDisplay()
        // this.setDumpMatrixDropData()
        // this.needToChangeSlides = true
        // this.controlField('play')
      } else {
        console.log('No more slides')
      }
    },
    playToNextSlide: function () {
      // For the playable version.
      if (this.currentSlide < this.gameData.length - 1 && this.gameState === 'idle') {
        // Reset to the original field in case the user made some edits.
        this.fieldData = this.gamePlayable ? this.fieldData : stringTo2dArray(this.gameData[this.currentSlide].fieldData, this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.updatePuyoSprites()
        this.setDumpMatrixDropData()
        this.updateDumpDisplay()
        this.needToChangeSlides = true
        this.controlField('play')
      } else {
        console.log('No more slides')
      }
    },
    createNextFieldData: function () {
      let axisPuyo = this.activePair.axisPuyo
      let freePuyo = this.activePair.freePuyo
      let nextFieldData = JSON.parse(JSON.stringify(this.fieldData))
      if (this.checkDropInBounds === true) {
        if (axisPuyo.cellPos.x === freePuyo.cellPos.x) {
          let nonEmpty = [] // Cells of a column that aren't empty
          for (let y = 0; y < this.Field.totalRows; y++) {
            if (this.fieldData[y][axisPuyo.cellPos.x] !== '0') {
              nonEmpty.push(this.fieldData[y][axisPuyo.cellPos.x])
            }
          }

          // Use unshift to add Puyos to the beginning of the array
          if (axisPuyo.cellPos.y < freePuyo.cellPos.y) {
            nonEmpty.unshift(this.activePair.data[1])
            nonEmpty.unshift(this.activePair.data[0])
          } else {
            nonEmpty.unshift(this.activePair.data[0])
            nonEmpty.unshift(this.activePair.data[1])
          }

          let nonEmptyFiller = []
          // fill up the column with '0' until it's back to totalRow
          for (let y = 0; y < this.Field.totalRows - nonEmpty.length; y++) {
            nonEmptyFiller.push('0')
          }
          nonEmptyFiller.forEach((element) => {
            nonEmpty.unshift(element)
          })

          // Replace the column in the next field data
          for (let y = 0; y < this.Field.totalRows; y++) {
            nextFieldData[y].splice([axisPuyo.cellPos.x], 1, nonEmpty[y])
          }

          // Create next slide object
          return nextFieldData
        } else if (axisPuyo.cellPos.x !== freePuyo.cellPos.x) {
          let axisEmpty = [] // Cells of a column that aren't empty
          for (let y = 0; y < this.Field.totalRows; y++) {
            if (this.fieldData[y][axisPuyo.cellPos.x] !== '0') {
              axisEmpty.push(this.fieldData[y][axisPuyo.cellPos.x])
            }
          }
          // Use unshift to add Puyos to the beginning of the array
          axisEmpty.unshift(this.activePair.data[0])

          // fill up the column with '0' until it's back to totalRow
          let axisFiller = []
          for (let y = 0; y < this.Field.totalRows - axisEmpty.length; y++) {
            axisFiller.push('0')
          }
          axisFiller.forEach((element) => {
            axisEmpty.unshift(element)
          })

          // Replace the column in the next field data
          for (let y = 0; y < this.Field.totalRows; y++) {
            nextFieldData[y].splice([axisPuyo.cellPos.x], 1, axisEmpty[y])
          }

          let freeEmpty = [] // Cells of a column that aren't empty
          for (let y = 0; y < this.Field.totalRows; y++) {
            if (this.fieldData[y][freePuyo.cellPos.x] !== '0') {
              freeEmpty.push(this.fieldData[y][freePuyo.cellPos.x])
            }
          }
          // Use unshift to add Puyos to the beginning of the array

          freeEmpty.unshift(this.activePair.data[1])

          // fill up the column with '0' until it's back to totalRow
          let freeFiller = []
          for (let y = 0; y < this.Field.totalRows - freeEmpty.length; y++) {
            freeFiller.push('0')
          }
          freeFiller.forEach((element) => {
            freeEmpty.unshift(element)
          })

          // Replace the column in the next field data
          for (let y = 0; y < this.Field.totalRows; y++) {
            nextFieldData[y].splice([freePuyo.cellPos.x], 1, freeEmpty[y])
          }

          return nextFieldData
        }
      }
    },
    countGarbage: function (g, i) {
      this.checkCrown(g, i)
    },
    checkCrown: function (g, i) {
      if (i < 6) {
        if (g - 720 >= 0) {
          this.garbageIcons.splice(i, 1, 'crown')
          this.checkCrown(g - 720, i + 1)
        } else {
          this.checkMoon(g, i)
        }
      }
    },
    checkMoon: function (g, i) {
      if (i < 6) {
        if (g - 360 >= 0) {
          this.garbageIcons.splice(i, 1, 'moon')
          this.checkStar(g - 360, i + 1)
        } else {
          this.checkStar(g, i)
        }
      }
    },
    checkStar: function (g, i) {
      if (i < 6) {
        if (g - 180 >= 0) {
          this.garbageIcons.splice(i, 1, 'star')
          this.checkRock(g - 180, i + 1)
        } else {
          this.checkRock(g, i)
        }
      }
    },
    checkRock: function (g, i) {
      if (i < 6) {
        if (g - 30 >= 0) {
          this.garbageIcons.splice(i, 1, 'rock')
          this.checkRock(g - 30, i + 1)
        } else {
          this.checkLine(g, i)
        }
      }
    },
    checkLine: function (g, i) {
      if (i < 6) {
        if (g - 6 >= 0) {
          this.garbageIcons.splice(i, 1, 'line')
          this.checkLine(g - 6, i + 1)
        } else {
          this.checkUnit(g, i)
        }
      }
    },
    checkUnit: function (g, i) {
      if (i < 6) {
        if (g - 1 >= 0) {
          this.garbageIcons.splice(i, 1, 'unit')
          this.checkUnit(g - 1, i + 1)
        }
      }
    }
  },
  computed: {
    chainDiff: function () {
      // let oldField = stringTo2dArray(this.gameData[this.currentSlide].fieldData, this.fieldSettings.totalRows, this.fieldSettings.columns)
      let oldField = this.fieldData
      let newField = stringTo2dArray(this.gameData[this.currentSlide + 1].fieldData, this.fieldSettings.totalRows, this.fieldSettings.columns)

      let diff = []
      for (let y = 0; y < this.fieldSettings.totalRows; y++) {
        diff[y] = []
        for (let x = 0; x < this.fieldSettings.columns; x++) {
          if (oldField[y][x] === '0' && newField[y][x] !== '0') {
            diff[y][x] = newField[y][x]
          } else {
            diff[y][x] = '0'
          }
        }
      }

      // Compute drop
      let diffField = new Chainsim.Field(this.fieldSettings, diff)
      let diffDropped = Chainsim.mapToStringArray(Chainsim.Simulate.dropPuyos(diffField).dropResult)
      return diffDropped
    },
    combinedMatrix: function () {
      let combinedMatrix = JSON.parse(JSON.stringify(this.chainDiff))
      // let oldField = stringTo2dArray(this.gameData[this.currentSlide].fieldData, this.fieldSettings.totalRows, this.fieldSettings.columns)
      let oldField = this.fieldData

      for (let y = 0; y < this.Field.totalRows; y++) {
        combinedMatrix.push(oldField[y])
      }
      return combinedMatrix
    },
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
            y: (y * this.Field.cellHeight) + (this.Field.cellHeight / 2) + 124
          }
        }
      }
      return coord
    },
    activeCoordArray: function () {
      let coord = []
      for (let y = 0; y < 3; y++) {
        coord[y] = []
        for (let x = 0; x < this.Field.columns; x++) {
          coord[y][x] = {
            x: (x * this.Field.cellWidth) + (this.Field.cellWidth / 2) + 25,
            y: ((y * this.Field.cellHeight) + (this.Field.cellHeight / 2) + 124) - (60 * 2)
          }
        }
      }
      return coord
    },
    dumpCoordArray: function () {
      let coord = []
      for (let y = 0; y < this.Field.totalRows; y++) {
        coord[y] = []
        for (let x = 0; x < this.Field.columns; x++) {
          coord[y][x] = {
            x: (x * this.Field.cellWidth) + (this.Field.cellWidth / 2) + 25,
            y: ((y * this.Field.cellHeight) + (this.Field.cellHeight / 2) + 124) - (60 * this.Field.totalRows)
          }
        }
      }
      return coord
    },
    checkDropInBounds: function () {
      if (this.gameLoaded === true) {
        let axisPuyo = this.activePair.axisPuyo
        let freePuyo = this.activePair.freePuyo
        if (axisPuyo.cellPos.x === freePuyo.cellPos.x) {
          // If the puyos are in the same column, then make sure the current column has 2 cells open.
          let nonEmpty = [] // Cells of a column that aren't empty
          for (let y = 0; y < this.Field.totalRows; y++) {
            if (this.fieldData[y][axisPuyo.cellPos.x] !== '0') {
              nonEmpty.push(this.fieldData[y][axisPuyo.cellPos.x])
            }
          }
          if (nonEmpty.length <= this.Field.totalRows - 2) {
            return true
          } else {
            return false
          }
        } else if (axisPuyo.cellPos.x !== freePuyo.cellPos.x) {
          // Since the Puyos are in different columns, check two columns for validity
          let axisCol
          let freeCol

          let axisNonEmpty = []
          for (let y = 0; y < this.Field.totalRows; y++) {
            if (this.fieldData[y][axisPuyo.cellPos.x] !== '0') {
              axisNonEmpty.push(this.fieldData[y][axisPuyo.cellPos.x])
            }
          }
          if (axisNonEmpty.length <= this.Field.totalRows - 1) {
            axisCol = true
          } else {
            axisCol = false
          }

          let freeNonEmpty = []
          for (let y = 0; y < this.Field.totalRows; y++) {
            if (this.fieldData[y][freePuyo.cellPos.x] !== '0') {
              freeNonEmpty.push(this.fieldData[y][freePuyo.cellPos.x])
            }
          }
          if (freeNonEmpty.length <= this.Field.totalRows - 1) {
            freeCol = true
          } else {
            freeCol = false
          }

          if (axisCol === true && freeCol === true) {
            return true
          } else {
            return false
          }
        }
      } else {
        return false
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
      if (this.needToChangeSlides === true) {
        if (this.droppingDumpCells.length === this.Field.totalRows) {
          if (this.droppingDumpCells[0].length === this.Field.columns) {
            for (let y = 0; y < this.Field.totalRows; y++) {
              for (let x = 0; x < this.Field.columns; x++) {
                if (this.droppingDumpCells[y][x] === true) {
                  return true // If just one cell is still dropping, return true. Animations are ongoing.
                }
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
    },
    fieldDataString: function () {
      return flatten2dTo1d(this.fieldData).join('')
    },
    shadowDataString: function () {
      return flatten2dTo1d(this.shadowData).join('')
    },
    cursorDataString: function () {
      return flatten2dTo1d(this.cursorData).join('')
    },
    arrowDataString: function () {
      return flatten2dTo1d(this.arrowData).join('')
    },
    scoreString: function () {
      let string = this.score.toString()
      let zeroesToAdd = 8 - string.length

      if (string.length > 8) {
        return '99999999'
      } else {
        for (let i = 0; i < zeroesToAdd; i++) {
          string = '0' + string
        }
        return string
      }
    },
    chainLengthString: function () {
      let string = this.chainLength.toString()
      if (string.length < 2) {
        string = '0' + string
      }
      return string
    },
    copyPaster: function () {
      return JSON.stringify(this.gameData)
    }
  },
  watch: {
    gameState: function (newVal, oldVal) {
      this.frame = 0
      if (newVal === 'dropping') {
        this.ticker.remove(this.animateNextPuyos)
        this.activePair.freePuyo.visible = false
        this.activePair.axisPuyo.visible = false
        console.log('Checking drops')
        this.setDropData()
        this.puyoStates = uniformMatrix('idle', this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.dumpPuyoStates = uniformMatrix('idle', this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.updatePuyoSprites()
        if (this.isDropping === false) {
          if (this.needToChangeSlides === true) {
            this.updateWithNextSlide()
          } else {
            this.gameState = 'popping'
          }
        }
      } else if (newVal === 'popping') {
        this.ticker.remove(this.animateNextPuyos)
        this.activePair.axisPuyo.visible = false
        this.activePair.freePuyo.visible = false
        console.log('Checking pops')
        this.setPopData()
        this.puyoStates = uniformMatrix('idle', this.fieldSettings.totalRows, this.fieldSettings.columns)
        this.updatePuyoSprites()
      } else if (newVal === 'idle') {
        this.ticker.addOnce(() => {
          console.log('resetting field')
          this.updatePuyoSprites()
          for (let y = 0; y < this.Field.totalRows; y++) {
            for (let x = 0; x < this.Field.columns; x++) {
              this.dumpDisplay[y][x].visible = false
            }
          }
          this.ticker.add(this.animateNextPuyos)
        })
      }

      // Hide helper layers if a chain is playing.
      if (newVal === 'idle' || newVal === 'editor') {
        for (let y = 0; y < this.Field.totalRows; y++) {
          for (let x = 0; x < this.Field.columns; x++) {
            this.shadowDisplay[y][x].visible = true
            this.cursorDisplay[y][x].visible = true
            this.arrowDisplay[y][x].visible = true
          }
        }
      } else {
        for (let y = 0; y < this.Field.totalRows; y++) {
          for (let x = 0; x < this.Field.columns; x++) {
            this.shadowDisplay[y][x].visible = false
            this.cursorDisplay[y][x].visible = false
            this.arrowDisplay[y][x].visible = false
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
          if (this.currentSlide < this.gameData.length - 1 && this.needToChangeSlides === true) {
            if (this.gameData[this.currentSlide + this.slideChange].autoDrop === true) {
              this.updateWithNextSlide()
            }
          } else {
            this.fieldData = this.dropPuyosResult
            console.log('Dropped the new puyo field')
            this.updatePuyoSprites()
            if (this.chainAutoPlay === true) {
              this.gameState = 'popping'
            } else {
              this.simulationSpeed = 1
              this.gameState = this.gamePlayable ? 'idle' : 'chainStopped'
            }
          }
        }
      }
    },
    // gameData: {
    //   handler: function () {
    //     this.fieldData = stringTo2dArray(this.gameData[this.currentSlide].fieldData, this.fieldSettings.totalRows, this.fieldSettings.columns)
    //     this.fieldOriginal = stringTo2dArray(this.gameData[this.currentSlide].fieldData, this.fieldSettings.totalRows, this.fieldSettings.columns)
    //     this.shadowData = stringTo2dArray(this.gameData[this.currentSlide].shadowData, this.fieldSettings.totalRows, this.fieldSettings.columns)
    //     this.cursorData = stringTo2dArray(this.gameData[this.currentSlide].cursorData, this.fieldSettings.totalRows, this.fieldSettings.columns)
    //     this.arrowData = stringTo2dArray(this.gameData[this.currentSlide].arrowData, this.fieldSettings.totalRows, this.fieldSettings.columns)
    //     this.resetField()
    //   },
    //   deep: true
    // },
    needToChangeSlides: function (newVal, oldVal) {
      if (newVal === true) {
        for (let y = 0; y < this.Field.totalRows; y++) {
          for (let x = 0; x < this.Field.columns; x++) {
            this.shadowDisplay[y][x].visible = false
            this.cursorDisplay[y][x].visible = false
            this.arrowDisplay[y][x].visible = false
          }
        }
      }
    },
    chainLength: function () {
      this.ticker.remove(this.animateChainCounter)
      this.timers.chainLength = 0
      this.chainCountDisplay.y = this.chainCountDisplay.origY
      this.ticker.add(this.animateChainCounter)
    },
    garbage: function () {
      this.ticker.remove(this.animateGarbageTray)
      this.timers.garbageTray = 0
      for (let i = 0; i < 6; i++) {
        this.garbageDisplay[i].x = (this.garbageDisplay[2].origX + this.garbageDisplay[3].origX) / 2
      }

      this.garbageIcons = ['spacer_n', 'spacer_n', 'spacer_n', 'spacer_n', 'spacer_n', 'spacer_n']
      this.countGarbage(this.garbage, 0) // second parameter is i, the index for garbageIcons (array)
      console.log(this.garbageDisplay)
      for (let i = 0; i < 6; i++) {
        this.garbageDisplay[i].texture = this.puyoSprites[`${this.garbageIcons[i]}.png`]
      }
      this.ticker.add(this.animateGarbageTray)
    },
    scoreString: function () {
      if (this.gameLoaded === true) {
        for (let i = 0; i < 8; i++) {
          this.scoreDisplay[i].texture = this.fieldSprites[`score_${this.scoreString[i]}.png`]
        }
      }
    },
    chainLengthString: function () {
      this.chainCountSprites.firstDigit.alpha = 0
      this.chainCountSprites.secondDigit.alpha = 0
      this.chainCountSprites.chainText.alpha = 0

      if (this.chainLengthString[0] !== '0') {
        this.chainCountSprites.firstDigit.alpha = 1
        this.chainCountSprites.firstDigit.texture = this.chainCountSprites[`chain_${this.chainLengthString[0]}.png`]
      } else {
        this.chainCountSprites.firstDigit.texture = this.chainCountSprites[`spacer.png`]
      }

      if (this.chainLength > 0) {
        this.chainCountSprites.secondDigit.alpha = 1
        this.chainCountSprites.secondDigit.texture = this.chainCountSprites[`chain_${this.chainLengthString[1]}.png`]
        this.chainCountSprites.chainText.alpha = 1
      } else {
        this.chainCountSprites.secondDigit.texture = this.chainCountSprites[`spacer.png`]
      }
    }
  }
}
</script>

<style scoped>
#game {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
</style>
