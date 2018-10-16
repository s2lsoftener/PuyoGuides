<script>
import * as BezierEasing from 'bezier-easing'

export default {
  name: 'ChainsimChainCount',
  props: ['chainLength', 'chainCountSprites', 'gameLoaded', 'chainCountDisplay', 'frame', 'delta'],
  render: function (h) {
    return h() // Render nothing, avoid error output.
  },
  data () {
    return {
      container: {},
      toggleAnimation: false,
      counterFrame: 0,
      origY: 0
    }
  },
  computed: {
    chainLengthString: function () {
      let string = this.chainLength.toString()
      if (string.length < 2) {
        string = '0' + string
      }
      return string
    },
    easing: function () {
      return BezierEasing(0.42, 1.03, 0.78, 1)
    }
  },
  mounted () {
    if (this.gameLoaded === true) {
      this.chainCountSprites.firstDigit.alpha = 0
      this.chainCountSprites.secondDigit.alpha = 0
      this.chainCountSprites.chainText.alpha = 0
    }
    this.origY = this.chainCountDisplay.y
  },
  watch: {
    gameLoaded: function () {
      this.chainCountSprites.firstDigit.alpha = 0
      this.chainCountSprites.secondDigit.alpha = 0
      this.chainCountSprites.chainText.alpha = 0
    },
    chainLengthString: function () {
      this.chainCountSprites.firstDigit.alpha = 0
      this.chainCountSprites.secondDigit.alpha = 0
      this.chainCountSprites.chainText.alpha = 0
      this.toggleAnimation = false
      console.log(this.toggleAnimation)

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

      this.$nextTick(() => {
        console.log('turn on animation')
        this.toggleAnimation = true
        this.counterFrame = 0
        console.log(this.toggleAnimation)
      })
    },
    frame: function () {
      if (this.toggleAnimation === true) {
        this.counterFrame += 1 + (1 - this.delta)
        if (this.counterFrame / 15 <= 1) {
          this.chainCountDisplay.y = this.origY - (10 * this.easing(this.counterFrame / 15))
        } else if (this.counterFrame / 15 <= 2) {
          this.chainCountDisplay.y = this.origY - (10 * this.easing(2 - this.counterFrame / 15))
        } else {
          this.chainCountDisplay.y = this.origY
        }
      }
    }
  }
}
</script>
