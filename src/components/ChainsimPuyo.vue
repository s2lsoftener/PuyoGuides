<script>
import * as PIXI from 'pixi.js' // eslint-disable-line no-unused-vars
import { TweenMax } from 'gsap' // eslint-disable-line no-unused-vars
import PixiPlugin from 'gsap/PixiPlugin' // eslint-disable-line no-unused-vars
import Chainsim from '@/assets/js/chainsim'

export default {
  name: 'ChainsimPuyo',
  props: ['index', 'Simulator', 'fieldState', 'fieldData', 'sprite', 'spritesheet', 'resources',
    'spritesheetLoaded', 'simulationSpeed', 'coordArray'],
  render: function (h) {
    return h() // Render nothing, avoid error output.
  },
  data () {
    return {
      asdf: 'test'
    }
  },
  methods: {
    endOfPopAnimation: function () {
      this.$emit('end-popping', { x: this.indexCol, y: this.indexRow, bool: false })
      this.Simulator.Field.map[this.indexRow][this.indexCol].toPop = false
      console.log('emitted animation end')
    },
    endOfDropAnimation: function () {
      this.$emit('end-dropping', { x: this.indexCol, y: this.indexRow, bool: false })
      console.log('emitted drop animation end')
    },
    setNewPuyoOnMouseDown: function () {
      this.$emit('edit-puyo-field', { x: this.indexCol, y: this.indexRow, puyo: this.currentTool })
    },
    setNewPuyoOnMove: function () {
      if (this.isMouseDown === true) {
        this.$emit('edit-puyo-field', { x: this.indexCol, y: this.indexRow, puyo: this.currentTool })
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

        // If this Puyo is in the middle of a dropping animation, then don't give it connections
        if (this.Simulator.droppingCells[this.indexRow][this.indexCol] === true) {
          return 'n'
        }

        let check = {}
        // check up
        if (this.indexRow <= this.Simulator.Field.hiddenRows) { // Don't look into the hidden row
          check.up = false
        } else if (this.Simulator.Field.map[this.indexRow][this.indexCol].puyo === this.Simulator.Field.map[this.indexRow - 1][this.indexCol].puyo) {
          // Don't connect to Puyos that are dropping.
          if (this.Simulator.droppingCells[this.indexRow - 1][this.indexCol] === true) {
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
          if (this.Simulator.droppingCells[this.indexRow][this.indexCol - 1] === true) {
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
          if (this.Simulator.droppingCells[this.indexRow][this.indexCol + 1] === true) {
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
          if (this.Simulator.droppingCells[this.indexRow + 1][this.indexCol] === true) {
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
    }
  },
  mounted () {
    this.sprite.texture = this.spritesheet[this.spriteToLoad]
  },
  watch: {
    spriteToLoad: function () {
      this.sprite.texture = this.spritesheet[this.spriteToLoad]
    },
    fieldState: function () {
      if (this.fieldState === 'idle') {
        TweenMax.to(this.sprite, 0, { useFrames: true, overwrite: 'concurrent', pixi: { y: this.origPos.y, alpha: 1, scaleX: 1, scaleY: 1 } })
      } else if (this.fieldState === 'popping' && this.needsPopping === true) {
        let flashRate = Math.round(2 / this.simulationSpeed)
        let flashSpeed = (this.simulationSpeed > 4 ? 0 : 1)

        // Escape function in case the animation needs to end.
        let checkForFieldStateChange = () => {
          if (this.fieldState === 'idle') {
            TweenMax.to(this.sprite, 0, { useFrames: true, overwrite: 'concurrent', pixi: { y: this.origPos.y, alpha: 1, scaleX: 1, scaleY: 1 }, onOverwrite: this.endOfPopAnimation })
          }
        }

        // Define popping animation
        let popPuyos = () => {
          TweenMax.to(this.sprite, flashSpeed, { pixi: { alpha: 0 }, useFrames: true, yoyo: true, repeat: 10, repeatDelay: flashRate, onOverwrite: this.endOfPopAnimation, onUpdate: checkForFieldStateChange, onComplete: this.endOfPopAnimation })
        }

        // Reset transforms, then pop
        TweenMax.to(this.sprite, 0, { useFrames: true, overwrite: 'concurrent', pixi: { y: this.origPos.y, alpha: 1, scaleX: 1, scaleY: 1 }, onComplete: popPuyos })
      } else if (this.fieldState === 'dropping' && this.needsDropping === true) {
        let maxDistance = (this.cellsToDrop) * this.Simulator.Field.cellHeight // cellHeight = 60
        let frame = 0
        let speed = this.simulationSpeed
        let accelConst = 0.1875 / 16 * this.Simulator.Field.cellHeight
        let distance = 0
        let speedString = ''
        let checkForFieldStateChange = () => {
          if (this.fieldState === 'idle') {
            TweenMax.to(this.sprite, 0, { useFrames: true, overwrite: 'concurrent', pixi: { y: this.origPos.y, alpha: 1, scaleX: 1, scaleY: 1 }, onOverwrite: this.endOfDropAnimation })
          }
        }
        let accelerate = () => {
          if (distance < maxDistance) {
            frame += 1
            speed += accelConst * frame * (this.simulationSpeed ** 2)
            distance += speed
            speedString += `+=${speed}px`
            TweenMax.to(this.sprite, 1, {
              useFrames: true,
              pixi: {
                y: speedString
              },
              onOverwrite: this.endOfDropAnimation,
              onUpdate: checkForFieldStateChange,
              onComplete: accelerate
            })
          } else {
            TweenMax.to(this.sprite, 0, {
              useFrames: true,
              pixi: {
                y: maxDistance + this.origPos.y
              },
              onOverwrite: this.endOfDropAnimation,
              onUpdate: checkForFieldStateChange,
              onComplete: bounce
            })
          }
        }
        let bounce = () => {
          let yChange = '+=' + (0.1 * this.Simulator.Field.cellHeight) + 'px'
          let bounceSpeed = Math.round(8 / this.simulationSpeed)
          TweenMax.to(this.sprite, bounceSpeed, {
            useFrames: true,
            pixi: {
              scaleX: '1.2',
              scaleY: '0.8',
              y: yChange
            },
            yoyo: true,
            repeat: 1,
            onUpdate: checkForFieldStateChange,
            onOverwrite: this.endOfDropAnimation,
            onComplete: this.endOfDropAnimation
          })
        }
        let puyoFall = () => {
          TweenMax.to(this.sprite, 1, {
            useFrames: true,
            pixi: {
              y: `+=${speed}px`
            },
            onOverwrite: this.endOfDropAnimation,
            onUpdate: this.checkForFieldStateChange,
            onComplete: accelerate
          })
        }

        // Reset transforms, then drop.
        TweenMax.to(this.sprite, 0, {
          useFrames: true,
          overwrite: 'concurrent',
          pixi: {
            y: this.origPos.y,
            alpha: 1,
            scaleX: 1,
            scaleY: 1
          },
          onUpdate: checkForFieldStateChange,
          onComplete: puyoFall
        })
      }
    },
    fieldData: {
      handler: function () {
        TweenMax.to(this.sprite, 0, {
          useFrames: true,
          overwrite: 'concurrent',
          pixi: {
            y: this.origPos.y,
            alpha: 1,
            scaleX: 1,
            scaleY: 1
          }
        })
      },
      deep: true
    }
  }
}
</script>
