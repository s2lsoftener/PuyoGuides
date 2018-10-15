<script>
export default {
  name: 'ChainsimControlButton',
  props: ['spritesheetLoaded', 'button', 'fieldSprites', 'buttonName'],
  render: function (h) {
    return h() // Render nothing, avoid error output.
  },
  methods: {
    onButtonDown: function () {
      this.button.texture = this.fieldSprites[`btn_${this.buttonName}_pressed.png`]
    },
    onButtonUp: function () {
      this.button.texture = this.fieldSprites[`btn_${this.buttonName}.png`]
      this.$emit('controlField', this.buttonName)
    },
    onButtonUpOutside: function () {
      this.button.texture = this.fieldSprites[`btn_${this.buttonName}.png`]
    }
  },
  mounted () {
    if (this.spritesheetLoaded === true) {
      this.button
        .on('pointerdown', this.onButtonDown)
        .on('pointerup', this.onButtonUp)
        .on('pointerupoutside', this.onButtonUpOutside)
    }
  },
  watch: { // Fallback in case the component initalizes before the spritesheets finish loading.
    spritesheetLoaded: function () {
      this.button
        .on('pointerdown', this.onButtonDown)
        .on('pointerup', this.onButtonUp)
        .on('pointerupoutside', this.onButtonUpOutside)
    }
  }
}
</script>
