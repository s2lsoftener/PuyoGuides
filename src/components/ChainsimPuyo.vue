<script>
import * as PIXI from 'pixi.js' // eslint-disable-line no-unused-vars
import { TweenMax } from 'gsap' // eslint-disable-line no-unused-vars
import PixiPlugin from 'gsap/PixiPlugin' // eslint-disable-line no-unused-vars
import Chainsim from '@/assets/js/chainsim'

export default {
  name: 'ChainsimPuyo',
  props: ['index', 'Simulator', 'fieldState', 'fieldData', 'sprite', 'spritesheet', 'resources', 'spritesheetLoaded'],
  render: function (h) {
    return h() // Render nothing, avoid error output.
  },
  data () {
    return {
      check: {}
    }
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
        case Chainsim.Constants.Puyo.Nuisance: return 'spacer' // Garbage (oJama)
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

        this.check = {}
        // this.check up
        if (this.indexRow <= this.Simulator.Field.hiddenRows) { // Don't look into the hidden row
          this.check.up = false
        } else if (this.Simulator.Field.map[this.indexRow][this.indexCol].puyo === this.Simulator.Field.map[this.indexRow - 1][this.indexCol].puyo) {
          // Don't connect to Puyos that are dropping.
          if (this.Simulator.droppingCells[this.indexRow - 1][this.indexCol] === true) {
            this.check.up = false
          } else {
            this.check.up = true
          }
        } else {
          this.check.up = false
        }

        // this.check left
        if (this.indexCol === 0) { // Don't look into the wall
          this.check.left = false
        } else if (this.Simulator.Field.map[this.indexRow][this.indexCol].puyo === this.Simulator.Field.map[this.indexRow][this.indexCol - 1].puyo) {
          // Don't connect to Puyos that are dropping.
          if (this.Simulator.droppingCells[this.indexRow][this.indexCol - 1] === true) {
            this.check.left = false
          } else {
            this.check.left = true
          }
        } else {
          this.check.left = false
        }

        // this.check right
        if (this.indexCol === (this.Simulator.Field.columns - 1)) { // Don't look into the wall
          this.check.right = false
        } else if (this.Simulator.Field.map[this.indexRow][this.indexCol].puyo === this.Simulator.Field.map[this.indexRow][this.indexCol + 1].puyo) {
          // Don't connect to Puyos that are dropping.
          if (this.Simulator.droppingCells[this.indexRow][this.indexCol + 1] === true) {
            this.check.right = false
          } else {
            this.check.right = true
          }
        } else {
          this.check.right = false
        }

        // this.check down
        if (this.indexRow === (this.Simulator.Field.visibleRows + this.Simulator.Field.hiddenRows - 1)) { // Don't look into the floor
          this.check.down = false
        } else if (this.Simulator.Field.map[this.indexRow][this.indexCol].puyo === this.Simulator.Field.map[this.indexRow + 1][this.indexCol].puyo) {
          if (this.Simulator.droppingCells[this.indexRow + 1][this.indexCol] === true) {
            this.check.down = false
          } else {
            this.check.down = true
          }
        } else {
          this.check.down = false
        }

        // Decide connection
        // if (this.check.up === false && this.check.left === false && this.check.right === false && this.check.down === false) {
        //   return 0
        // } else if (this.check.up === false && this.check.left === false && this.check.right === false && this.check.down === true) {
        //   return -72
        // } else if (this.check.up === true && this.check.left === false && this.check.right === false && this.check.down === false) {
        //   return -144
        // } else if (this.check.up === true && this.check.left === false && this.check.right === false && this.check.down === true) {
        //   return -216
        // } else if (this.check.up === false && this.check.left === false && this.check.right === true && this.check.down === false) {
        //   return -288
        // } else if (this.check.up === false && this.check.left === false && this.check.right === true && this.check.down === true) {
        //   return -360
        // } else if (this.check.up === true && this.check.left === false && this.check.right === true && this.check.down === false) {
        //   return -432
        // } else if (this.check.up === true && this.check.left === false && this.check.right === true && this.check.down === true) {
        //   return -504
        // } else if (this.check.up === false && this.check.left === true && this.check.right === false && this.check.down === false) {
        //   return -576
        // } else if (this.check.up === false && this.check.left === true && this.check.right === false && this.check.down === true) {
        //   return -648
        // } else if (this.check.up === true && this.check.left === true && this.check.right === false && this.check.down === false) {
        //   return -720
        // } else if (this.check.up === true && this.check.left === true && this.check.right === false && this.check.down === true) {
        //   return -792
        // } else if (this.check.up === false && this.check.left === true && this.check.right === true && this.check.down === false) {
        //   return -864
        // } else if (this.check.up === false && this.check.left === true && this.check.right === true && this.check.down === true) {
        //   return -936
        // } else if (this.check.up === true && this.check.left === true && this.check.right === true && this.check.down === false) {
        //   return -1008
        // } else if (this.check.up === true && this.check.left === true && this.check.right === true && this.check.down === true) {
        //   return -1080
        // } else {
        //   return 32 // Error...
        // }

        let connection = ''
        if (this.check.up === true) {
          connection += 'u'
        }
        if (this.check.right === true) {
          connection += 'r'
        }
        if (this.check.down === true) {
          connection += 'd'
        }
        if (this.check.left === true) {
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
    }
  },
  mounted () {
    this.sprite.texture = this.spritesheet[this.spriteToLoad]
  }
}
</script>
