<script>
export default {
  name: 'ChainsimGarbagetray',
  props: ['garbage', 'spritesheet', 'spritesheetLoaded', 'garbageDisplay'],
  render: function (h) {
    return h() // Render nothing, avoid error output.
  },
  data () {
    return {
      icons: [null, null, null, null, null, null]
    }
  },
  methods: {
    countGarbage: function (g, i) {
      this.checkCrown(g, i)
    },
    checkCrown: function (g, i) {
      if (i < 6) {
        if (g - 720 >= 0) {
          this.icons.splice(i, 1, 'crown')
          this.checkCrown(g - 720, i + 1)
        } else {
          this.checkMoon(g, i)
        }
      }
    },
    checkMoon: function (g, i) {
      if (i < 6) {
        if (g - 360 >= 0) {
          this.icons.splice(i, 1, 'moon')
          this.checkStar(g - 360, i + 1)
        } else {
          this.checkStar(g, i)
        }
      }
    },
    checkStar: function (g, i) {
      if (i < 6) {
        if (g - 180 >= 0) {
          this.icons.splice(i, 1, 'star')
          this.checkRock(g - 180, i + 1)
        } else {
          this.checkRock(g, i)
        }
      }
    },
    checkRock: function (g, i) {
      if (i < 6) {
        if (g - 30 >= 0) {
          this.icons.splice(i, 1, 'rock')
          this.checkRock(g - 30, i + 1)
        } else {
          this.checkLine(g, i)
        }
      }
    },
    checkLine: function (g, i) {
      if (i < 6) {
        if (g - 6 >= 0) {
          this.icons.splice(i, 1, 'line')
          this.checkLine(g - 6, i + 1)
        } else {
          this.checkUnit(g, i)
        }
      }
    },
    checkUnit: function (g, i) {
      if (i < 6) {
        if (g - 1 >= 0) {
          this.icons.splice(i, 1, 'unit')
          this.checkUnit(g - 1, i + 1)
        } else {
          this.addNull(i)
        }
      }
    },
    addNull: function (i) {
      console.log('Have to add some empty garbage icons')
      for (let x = i; x < 6; x++) {
        this.icons.splice(i, 1, null)
      }
    }
  },
  watch: {
    spritesheetLoaded: function () {
      this.countGarbage(this.garbage, 0)
      for (let i = 0; i < 6; i++) {
        this.garbageDisplay[i].texture = this.spritesheet[`${this.icons[i]}.png`]
      }
    },
    garbage: function () {
      this.countGarbage(this.garbage, 0) // second parameter is i, the index for icons (array)
      for (let i = 0; i < 6; i++) {
        this.garbageDisplay[i].texture = this.spritesheet[`${this.icons[i]}.png`]
      }
    }
  }
}
</script>
