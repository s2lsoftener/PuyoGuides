<script>
import * as PIXI from 'pixi.js' // eslint-disable-line no-unused-vars
import Chainsim from '@/assets/js/chainsim'

export default {
  name: 'ChainsimShadowPuyo',
  props: ['index', 'Simulator', 'fieldState', 'shadowData', 'sprite', 'puyoSprites', 'gameLoaded'],
  render: function (h) {
    return h() // Render nothing, avoid error output.
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
    PuyoType: function () {
      switch (this.shadowData[this.indexRow][this.indexCol]) {
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
    spriteToLoad: function () {
      return `${this.PuyoType}_n.png`
    }
  },
  mounted () {
    this.sprite.texture = this.puyoSprites[this.spriteToLoad]
  },
  watch: {
    gameLoaded: function () {
      this.sprite.texture = this.puyoSprites[this.spriteToLoad]
    }
  }
}
</script>
