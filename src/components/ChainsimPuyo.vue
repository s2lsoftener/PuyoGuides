<script>
import * as PIXI from 'pixi.js' // eslint-disable-line no-unused-vars
import { TweenMax, Ease, Linear } from 'gsap/all' // eslint-disable-line no-unused-vars
import PixiPlugin from 'gsap/PixiPlugin' // eslint-disable-line no-unused-vars
import ModifiersPlugin from 'gsap/ModifiersPlugin' // eslint-disable-line no-unused-vars
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
      dropDistTiming: [10, 15, 19, 22, 25, 28, 31, 33, 35, 37, 39, 41, 43] // https://puyonexus.com/wiki/Puyo_Puyo_Tsu/Frame_Data_Tables#Free_falling_puyo_after_pair_split
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
      let tf = (Math.sqrt(2 * a * d + vi ** 2) - vi) / a // Duration of animation, in seconds (seconds!)

      return {
        distance: d,
        acceleration: a,
        initialVelocity: vi,
        duration: tf
      }
    }
  },
  mounted () {
    this.sprite.texture = this.spritesheet[this.spriteToLoad]
  },
  watch: {
    spriteToLoad: function () {
      this.sprite.texture = this.spritesheet[this.spriteToLoad]
    },
    fieldState: {
      handler: function () {
        if (this.fieldState === 'idle') {
          TweenMax.to(this.sprite, 0, { useFrames: false, overwrite: 'concurrent', pixi: { y: this.origPos.y, alpha: 1, scaleX: 1, scaleY: 1 } })
        } else if (this.fieldState === 'popping' && this.needsPopping === true) {
          if (this.simulationSpeed <= 4) {
            console.log(`${this.indexRow}, ${this.indexCol}: Setting flash rate`)
            let flashRate = Math.round(2 / this.simulationSpeed)
            let flashSpeed = (this.simulationSpeed > 4 ? 0 : 1)

            // Define popping animation
            console.log(`${this.indexRow}, ${this.indexCol}: Setting popping animation`)
            let popPuyos = () => {
              TweenMax.to(this.sprite, (flashSpeed / 60), { pixi: { alpha: 0 }, useFrames: false, yoyo: true, repeat: 10, repeatDelay: (flashRate / 60), onOverwrite: this.endOfPopAnimation, onComplete: this.endOfPopAnimation })
            }

            // Reset transforms, then pop
            console.log(`${this.indexRow}, ${this.indexCol}: Starting popping animation`)
            TweenMax.to(this.sprite, 0, { useFrames: false, overwrite: 'concurrent', pixi: { y: this.origPos.y, alpha: 1, scaleX: 1, scaleY: 1 }, onComplete: popPuyos })
          } else {
            this.endOfPopAnimation()
          }
        } else if (this.fieldState === 'dropping' && this.needsDropping === true) {
          if (this.simulationSpeed <= 4) {
            let duration = Math.floor(this.animationParams.duration)
            let speed = Math.round(this.animationParams.initialVelocity)
            let acceleration = this.animationParams.acceleration
            let time = 0

            let puyoFall = () => {
              TweenMax.to(this.sprite, duration, {
                useFrames: true,
                onUpdate: () => {
                  if (this.sprite.y + speed < this.origPos.y + this.animationParams.distance) {
                    this.sprite.y += speed
                    speed += Math.round(acceleration * time)
                    time += 1
                  } else {
                    this.sprite.y = this.origPos.y + this.animationParams.distance
                  }
                },
                onOverwrite: this.endOfDropAnimation,
                onComplete: bounce
              })
            }

            let bounce = () => { // eslint-disable-line no-unused-vars
              let yChange = '+=' + (0.1 * this.Simulator.Field.cellHeight) + 'px'
              let bounceSpeed = Math.round(8 / this.simulationSpeed)
              TweenMax.to(this.sprite, (bounceSpeed / 60), {
                useFrames: false,
                pixi: {
                  scaleX: '1.2',
                  scaleY: '0.8',
                  y: yChange
                },
                yoyo: true,
                repeat: 1,
                onOverwrite: this.endOfDropAnimation,
                onComplete: this.endOfDropAnimation
              })
            }

            // Reset transforms, then drop.
            if (this.simulationSpeed <= 4) {
              TweenMax.to(this.sprite, 0, {
                useFrames: false,
                overwrite: 'concurrent',
                pixi: {
                  y: this.origPos.y,
                  alpha: 1,
                  scaleX: 1,
                  scaleY: 1
                },
                onComplete: puyoFall
              })
            } else {
              TweenMax.to(this.sprite, 0, {
                useFrames: false,
                overwrite: 'concurrent',
                pixi: {
                  y: this.origPos.y + this.cellsToDrop * this.Simulator.Field.cellHeight,
                  alpha: 1,
                  scaleX: 1,
                  scaleY: 1
                },
                onComplete: this.endOfDropAnimation
              })
            }
          } else {
            this.endOfDropAnimation()
          }
        }
      },
      deep: true
    },
    fieldData: {
      handler: function () {
        TweenMax.to(this.sprite, 0, {
          useFrames: false,
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
