<script>
// import * as BezierEasing from 'bezier-easing'
export default {
  name: 'ChainsimArrow',
  props: ['index', 'Simulator', 'arrowData', 'sprite', 'frame', 'delta', 'gameLoaded'],
  render: function (h) {
    return h() // Render nothing, avoid error output.
  },
  data () {
    return {
      timer: 0
    }
  },
  methods: {
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
    arrowVisible: function () {
      return this.arrowData[this.indexRow][this.indexCol] !== '0'
    },
    arrowDirection: function () {
      if (this.arrowData[this.indexRow][this.indexCol] === 'U') {
        return 'U'
      } else if (this.arrowData[this.indexRow][this.indexCol] === 'L') {
        return 'L'
      } else if (this.arrowData[this.indexRow][this.indexCol] === 'R') {
        return 'R'
      } else if (this.arrowData[this.indexRow][this.indexCol] === 'D') {
        return 'D'
      } else {
        return null
      }
    },
    arrowRotation: function () {
      switch (this.arrowDirection) {
        case 'R': return Math.PI * (3 / 2)
        case 'U': return Math.PI
        case 'L': return Math.PI * (1 / 2)
        case 'D': return 0
        case null: return 0
      }
    }
  },
  mounted () {
    if (this.gameLoaded === true) {
      if (this.arrowVisible === true) {
        this.sprite.alpha = 1
      } else {
        this.sprite.alpha = 0
      }
      this.sprite.rotation = this.arrowRotation
    }
  },
  watch: {
    gameLoaded: function () {
      if (this.arrowVisible === true) {
        this.sprite.alpha = 1
      } else {
        this.sprite.alpha = 0
      }
      this.sprite.rotation = this.arrowRotation
    },
    arrowVisible: function () {
      if (this.arrowVisible === true) {
        this.sprite.alpha = 1
      } else {
        this.sprite.alpha = 0
      }
    }
    // frame: function () {
    //   this.timer += this.delta
    //   if (this.timer > 30) {
    //     this.fullSize = !this.fullSize
    //     this.timer = 0
    //   }
    // },
    // fullSize: function () {
    //   if (this.fullSize === true) {
    //     this.sprite.scale.set(1, 1)
    //   } else {
    //     this.sprite.scale.set(0.9, 0.9)
    //   }
    // }
  }
}
</script>
