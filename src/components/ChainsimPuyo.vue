<script>
import * as PIXI from 'pixi.js' // eslint-disable-line no-unused-vars
import { TweenMax, Ease, Linear } from 'gsap/all' // eslint-disable-line no-unused-vars
import PixiPlugin from 'gsap/PixiPlugin' // eslint-disable-line no-unused-vars
import ModifiersPlugin from 'gsap/ModifiersPlugin' // eslint-disable-line no-unused-vars
import Chainsim from '@/assets/js/chainsim'

export default {
  name: 'ChainsimPuyo',
  props: ['index', 'Simulator', 'gameState', 'fieldData', 'sprite', 'puyoSprites',
    'gameLoaded', 'simulationSpeed', 'coordArray', 'needToReset', 'isMouseDown', 'frame',
    'delta'],
  render: function (h) {
    return h() // Render nothing, avoid error output.
  },
  data () {
    return {
      puyoState: 'idle', // idle, freefall, bouncing, popping
      vy: 0, // velocity
      bounceFrame: 0,
      poppingFrame: 0,
      poppingVisible: false
    }
  },
  methods: {
    endOfPopAnimation: function () {
      this.$emit('end-popping', { x: this.indexCol, y: this.indexRow, bool: false })
      this.Simulator.Field.map[this.indexRow][this.indexCol].toPop = false
    },
    endOfDropAnimation: function () {
      this.$emit('end-dropping', { x: this.indexCol, y: this.indexRow, bool: false })
    },
    setNewPuyoOnMouseDown: function () {
      // this.$emit('edit-puyo-field', { x: this.indexCol, y: this.indexRow, puyo: this.currentTool })
    },
    setNewPuyoOnMove: function () {
      if (this.isMouseDown === true) {
        // this.$emit('edit-puyo-field', { x: this.indexCol, y: this.indexRow, puyo: this.currentTool })
      }
    },
    freeFall: function () {
      this.sprite.y += this.vy
      for (let i = 0; i < Math.round(this.delta); i++) {
        this.vy += this.animationParams.acceleration * this.frame
      }
    },
    bounce: function () {
      this.bounceFrame += this.delta
      if (this.bounceFrame <= 8) {
        this.sprite.scale.x += 0.025 * this.simulationSpeed
        this.sprite.scale.y -= 0.025 * this.simulationSpeed
        this.sprite.y += 0.75 * this.simulationSpeed
      } else if (this.bounceFrame <= 16) {
        this.sprite.scale.x -= 0.025 * this.simulationSpeed
        this.sprite.scale.y += 0.025 * this.simulationSpeed
        this.sprite.y -= 0.75 * this.simulationSpeed
      } else {
        this.sprite.scale.x = 1
        this.sprite.scale.y = 1
        this.puyoState = 'idle'
        this.endOfDropAnimation()
      }
    },
    popping: function () {
      this.poppingFrame += this.delta

      if (this.poppingFrame <= 20) {
        if ((this.poppingFrame >= 1 && this.poppingFrame < 2) ||
            (this.poppingFrame >= 4 && this.poppingFrame < 6) ||
            (this.poppingFrame >= 8 && this.poppingFrame < 10) ||
            (this.poppingFrame >= 12 && this.poppingFrame < 14) ||
            (this.poppingFrame >= 16 && this.poppingFrame < 18) ||
            (this.poppingFrame >= 20 && this.poppingFrame < 22) ||
            (this.poppingFrame >= 24 && this.poppingFrame < 26) ||
            (this.poppingFrame >= 28 && this.poppingFrame <= 30)) {
          this.poppingVisible = false
        } else if ((this.poppingFrame >= 2 && this.poppingFrame < 4) ||
                   (this.poppingFrame >= 6 && this.poppingFrame < 8) ||
                   (this.poppingFrame >= 10 && this.poppingFrame < 12) ||
                   (this.poppingFrame >= 14 && this.poppingFrame < 16) ||
                   (this.poppingFrame >= 18 && this.poppingFrame < 20) ||
                   (this.poppingFrame >= 22 && this.poppingFrame < 24) ||
                   (this.poppingFrame >= 26 && this.poppingFrame < 28)) {
          this.poppingVisible = true
        }

        if (this.poppingVisible === true) {
          this.sprite.alpha = 1
        } else {
          this.sprite.alpha = 0
        }
      } else {
        this.puyoState = 'idle'
        this.endOfPopAnimation()
      }
    }
  },
  computed: {
    indexRow: function () {
      return Math.floor(this.index / this.Simulator.Field.columns)
    },
    indexCol: function () {
      return this.index % this.Simulator.Field.columns
    },
    origPos: function () {
      // Original x, y coordinates of Puyo
      return {
        x: this.coordArray[this.indexRow][this.indexCol].x,
        y: this.coordArray[this.indexRow][this.indexCol].y
      }
    },
    PuyoType: function () {
      switch (this.Simulator.Field.map[this.indexRow][this.indexCol].puyo) {
        case Chainsim.Constants.Puyo.Red: return 'red'
        case Chainsim.Constants.Puyo.Green: return 'green'
        case Chainsim.Constants.Puyo.Blue: return 'blue'
        case Chainsim.Constants.Puyo.Yellow: return 'yellow'
        case Chainsim.Constants.Puyo.Purple: return 'purple'
        case Chainsim.Constants.Puyo.Nuisance: return 'garbage' // Garbage (oJama)
        case Chainsim.Constants.Puyo.None: return 'spacer' // Spacer/Nothing
        case undefined: return 'spacer'
      }
    },
    Connections: function () {
      if (this.Simulator.Field.map[this.indexRow][this.indexCol].puyo === Chainsim.Constants.Puyo.Red || this.Simulator.Field.map[this.indexRow][this.indexCol].puyo === Chainsim.Constants.Puyo.Green || this.Simulator.Field.map[this.indexRow][this.indexCol].puyo === Chainsim.Constants.Puyo.Blue || this.Simulator.Field.map[this.indexRow][this.indexCol].puyo === Chainsim.Constants.Puyo.Yellow || this.Simulator.Field.map[this.indexRow][this.indexCol].puyo === Chainsim.Constants.Puyo.Purple) {
        // If this Puyo is in the hidden rows, don't give it a connection
        if (this.indexRow < this.Simulator.Field.hiddenRows) {
          return 'n'
        }

        // If this Puyo has to drop, then don't give it connections
        if (this.Simulator.dropDistances[this.indexRow][this.indexCol] > 0) {
          return 'n'
        }

        let check = {}
        // check up
        if (this.indexRow <= this.Simulator.Field.hiddenRows) { // Don't look into the hidden row
          check.up = false
        } else if (this.Simulator.Field.map[this.indexRow][this.indexCol].puyo === this.Simulator.Field.map[this.indexRow - 1][this.indexCol].puyo) {
          // Don't connect to Puyos that are dropping.
          if (this.Simulator.dropDistances[this.indexRow - 1][this.indexCol] > 0) {
            check.up = false
          } else {
            check.up = true
          }
        } else {
          check.up = false
        }

        // check left
        if (this.indexCol === 0) { // Don't look into the wall
          check.left = false
        } else if (this.Simulator.Field.map[this.indexRow][this.indexCol].puyo === this.Simulator.Field.map[this.indexRow][this.indexCol - 1].puyo) {
          // Don't connect to Puyos that are dropping.
          if (this.Simulator.dropDistances[this.indexRow][this.indexCol - 1] > 0) {
            check.left = false
          } else {
            check.left = true
          }
        } else {
          check.left = false
        }

        // check right
        if (this.indexCol === (this.Simulator.Field.columns - 1)) { // Don't look into the wall
          check.right = false
        } else if (this.Simulator.Field.map[this.indexRow][this.indexCol].puyo === this.Simulator.Field.map[this.indexRow][this.indexCol + 1].puyo) {
          // Don't connect to Puyos that are dropping.
          if (this.Simulator.dropDistances[this.indexRow][this.indexCol + 1] > 0) {
            check.right = false
          } else {
            check.right = true
          }
        } else {
          check.right = false
        }

        // check down
        if (this.indexRow === (this.Simulator.Field.visibleRows + this.Simulator.Field.hiddenRows - 1)) { // Don't look into the floor
          check.down = false
        } else if (this.Simulator.Field.map[this.indexRow][this.indexCol].puyo === this.Simulator.Field.map[this.indexRow + 1][this.indexCol].puyo) {
          if (this.Simulator.dropDistances[this.indexRow + 1][this.indexCol] > 0) {
            check.down = false
          } else {
            check.down = true
          }
        } else {
          check.down = false
        }

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

        return connection
      } else {
        return 'n'
      }
    },
    spriteToLoad: function () {
      return `${this.PuyoType}_${this.Connections}.png`
    },
    needsPopping: function () {
      return this.Simulator.poppingCells[this.indexRow][this.indexCol]
    },
    cellsToDrop: function () {
      return this.Simulator.dropDistances[this.indexRow][this.indexCol]
    },
    needsDropping: function () {
      return this.Simulator.droppingCells[this.indexRow][this.indexCol]
    },
    animationParams: function () {
      let d = this.cellsToDrop * this.Simulator.Field.cellHeight // Distance to drop, pixels
      let a = 0.1875 / 16 * this.Simulator.Field.cellHeight // acceleration pixels/frames^2
      let vi = 1 / 16 * this.Simulator.Field.cellHeight // Initial speed, in pixel
      let tf = (Math.sqrt(2 * a * d + vi ** 2) - vi) / a // Duration of animation

      return {
        distance: d,
        acceleration: a,
        initialVelocity: vi,
        duration: tf
      }
    }
  },
  mounted () {
    this.sprite.texture = this.puyoSprites[this.spriteToLoad]
    this.sprite.interactive = true
    this.sprite
      .on('pointerdown', this.setNewPuyoOnMouseDown)
      .on('pointerover', this.setNewPuyoOnMove)
    this.vy = this.animationParams.initialVelocity
  },
  watch: {
    gameLoaded: function () {
      this.sprite.texture = this.puyoSprites[this.spriteToLoad]
      this.sprite.interactive = true
      this.sprite
        .on('pointerdown', this.setNewPuyoOnMouseDown)
        .on('pointerover', this.setNewPuyoOnMove)
    },
    spriteToLoad: function () {
      this.sprite.texture = this.puyoSprites[this.spriteToLoad]
    },
    frame: function () {
      if (this.gameState === 'dropping' &&
          this.needsDropping === true &&
          this.puyoState === 'freefall') {
        if (this.sprite.y + this.vy < this.origPos.y + this.animationParams.distance) {
          this.freeFall()
        } else {
          this.sprite.y = this.origPos.y + this.animationParams.distance
          this.puyoState = 'bouncing'
        }
      } else if (this.gameState === 'dropping' &&
                 this.needsDropping === true &&
                 this.puyoState === 'bouncing') {
        console.log(this.frame)
        console.log(this.cellsToDrop)
        this.bounce()
      } else if (this.gameState === 'popping' &&
                 this.needsPopping === true &&
                 this.puyoState === 'popping') {
        this.popping()
      }
    },
    gameState: function (newVal, oldVal) {
      this.sprite.y = this.origPos.y
      this.sprite.alpha = 1
      this.vy = this.animationParams.initialVelocity
      this.bounceFrame = 0
      this.poppingFrame = 0
      if (newVal === 'dropping' && this.needsDropping === true) {
        this.puyoState = 'freefall'
      } else if (newVal === 'popping' && this.needsPopping === true) {
        this.puyoState = 'popping'
      }
    }
  }
}
</script>
