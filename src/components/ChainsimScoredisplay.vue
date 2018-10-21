<script>
import * as PIXI from 'pixi.js' // eslint-disable-line no-unused-vars

export default {
  name: 'ChainsimScoredisplay',
  props: ['scoreDisplay', 'score', 'fieldSprites', 'gameLoaded', 'item'],
  render: function (h) {
    return h() // Render nothing, avoid error output.
  },
  computed: {
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
    }
  },
  mounted () {
    if (this.gameLoaded === true) {
      for (let i = 0; i < 8; i++) {
        this.scoreDisplay[i].texture = this.fieldSprites[`score_${this.scoreString[i]}.png`]
      }
    }
  },
  watch: {
    gameLoaded: function () {
      for (let i = 0; i < 8; i++) {
        this.scoreDisplay[i].texture = this.fieldSprites[`score_${this.scoreString[i]}.png`]
      }
    },
    scoreString: function () {
      if (this.gameLoaded === true) {
        for (let i = 0; i < 8; i++) {
          this.scoreDisplay[i].texture = this.fieldSprites[`score_${this.scoreString[i]}.png`]
        }
      }
    }
  }
}
</script>
