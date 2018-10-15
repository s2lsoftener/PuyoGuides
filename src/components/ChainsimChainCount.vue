<script>
import { TweenMax } from 'gsap/all' // eslint-disable-line no-unused-vars

export default {
  name: 'ChainsimChainCount',
  props: ['chainLength', 'chainCountSprites', 'spritesheetLoaded', 'chainCountContainer'],
  render: function (h) {
    return h() // Render nothing, avoid error output.
  },
  data () {
    return {
      container: {}
    }
  },
  computed: {
    chainLengthString: function () {
      let string = this.chainLength.toString()
      if (string.length < 2) {
        string = '0' + string
      }
      return string
    }
  },
  mounted () {
    if (this.spritesheetLoaded === true) {
      this.chainCountSprites.firstDigit.alpha = 0
      this.chainCountSprites.secondDigit.alpha = 0
      this.chainCountSprites.chainText.alpha = 0
    }
  },
  watch: {
    spritesheetLoaded: function () {
      this.chainCountSprites.firstDigit.alpha = 0
      this.chainCountSprites.secondDigit.alpha = 0
      this.chainCountSprites.chainText.alpha = 0
    },
    chainLengthString: function () {
      this.chainCountSprites.firstDigit.alpha = 0
      this.chainCountSprites.secondDigit.alpha = 0
      this.chainCountSprites.chainText.alpha = 0

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

      TweenMax.to(this.chainCountContainer, 0.2, {
        pixi: {
          y: '-=10px'
        },
        repeat: 1,
        yoyo: true
      })
    }
  }
}
</script>
