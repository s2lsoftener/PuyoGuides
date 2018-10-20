<script>
export default {
  name: 'ChainsimChainCount',
  props: ['chainLength', 'chainCountSprites', 'gameLoaded', 'chainCountDisplay'],
  render: function (h) {
    return h() // Render nothing, avoid error output.
  },
  data () {
    return {
      container: {},
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
    }
  }
}
</script>
