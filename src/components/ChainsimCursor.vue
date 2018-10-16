<script>
export default {
  name: 'ChainsimCursor',
  props: ['index', 'Simulator', 'cursorData', 'sprite', 'puyoSprites',
    'cursorTexture', 'frame', 'delta', 'gameLoaded'],
  render: function (h) {
    return h() // Render nothing, avoid error output.
  },
  data () {
    return {
      timer: 0,
      fullSize: true
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
    cursorVisible: function () {
      return this.cursorData[this.indexRow][this.indexCol] === '1'
    }
  },
  mounted () {
    if (this.gameLoaded === true) {
      if (this.cursorVisible === true) {
        this.sprite.alpha = 1
      } else {
        this.sprite.alpha = 0
      }
    }
  },
  watch: {
    gameLoaded: function () {
      if (this.cursorVisible === true) {
        this.sprite.alpha = 1
      } else {
        this.sprite.alpha = 0
      }
    },
    cursorVisible: function () {
      if (this.cursorVisible === true) {
        this.sprite.alpha = 1
      } else {
        this.sprite.alpha = 0
      }
    },
    frame: function () {
      this.timer += this.delta
      if (this.timer > 30) {
        this.fullSize = !this.fullSize
        this.timer = 0
      }
    },
    fullSize: function () {
      if (this.fullSize === true) {
        this.sprite.scale.set(1, 1)
      } else {
        this.sprite.scale.set(0.9, 0.9)
      }
    }
  }
}
</script>
