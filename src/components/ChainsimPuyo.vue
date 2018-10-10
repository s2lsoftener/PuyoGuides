<script>
import * as PIXI from 'pixi.js'
import { TweenMax } from 'gsap' // eslint-disable-line no-unused-vars
import PixiPlugin from 'gsap/PixiPlugin' // eslint-disable-line no-unused-vars
import Chainsim from '@/assets/js/chainsim'

let Sprite = PIXI.Sprite

export default {
  name: 'ChainsimPuyo',
  props: ['index', 'Simulator', 'fieldState', 'fieldData', 'app', 'pixiLoader', 'pixiResources', 'canvasLoaded'],
  render: function (h) {
    return h() // Render nothing, avoid error output.
  },
  data () {
    return {
      check: {},
      puyoLoaded: false,
      puyo: new Sprite()
    }
  },
  methods: {
    // endOfPopAnimation: function () {
    //   this.$emit('end-popping', { x: this.indexCol, y: this.indexRow, bool: false })
    //   this.Simulator.Field.map[this.indexRow][this.indexCol].toPop = false
    //   console.log('emitted animation end')
    // },
    // endOfDropAnimation: function () {
    //   this.$emit('end-dropping', { x: this.indexCol, y: this.indexRow, bool: false })
    //   console.log('emitted drop animation end')
    // },
    // setNewPuyoOnMouseDown: function () {
    //   this.$emit('edit-puyo-field', { x: this.indexCol, y: this.indexRow, puyo: this.currentTool })
    // },
    // setNewPuyoOnMove: function () {
    //   if (this.isMouseDown === true) {
    //     this.$emit('edit-puyo-field', { x: this.indexCol, y: this.indexRow, puyo: this.currentTool })
    //   }
    // }
  },
  computed: {
    indexRow: function () {
      return Math.floor(this.index / this.Simulator.Field.columns)
    },
    indexCol: function () {
      return this.index % this.Simulator.Field.columns
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
        // Decide connection
        if (check.up === false && check.left === false && check.right === false && check.down === false) {
          return 'n'
        }

        if (check.up === true) {
          connection += 'u'
        }
        if (check.right === true) {
          connection += 'r'
        }
        if (check.down === true) {
          connection += 'd'
        }
        if (check.down === true) {
          connection += 'l'
        }

        return connection
      } else {
        return 'Not a Puyo'
      }
    },
    sprites: function () {
      return this.pixiResources['/img/spritesheet.json'].textures
    },
    spriteToLoad: function () {
      return `${this.PuyoType}_${this.Connections}.png`
    },
    xPos: function () {
      return Math.floor(Math.random() * 500)
    },
    yPos: function () {
      return Math.floor(Math.random() * 600)
    }
  },
  mounted () {
    this.puyoLoaded = true
    this.puyo = new Sprite(this.sprites[this.spriteToLoad])
  }
}
</script>
