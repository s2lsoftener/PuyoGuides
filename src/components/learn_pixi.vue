<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <div ref="game"></div>
    <br>
    <button @click="removePuyo">Remove Puyo</button>
    <button @click="changePosition">Change Puyo Position</button>
    <button @click="addPuyo">Add Puyo</button>
    <button @click="changePuyo">Change Puyo</button>
  </div>
</template>

<script>
import * as PIXI from 'pixi.js'
import { TweenMax } from 'gsap'
import PixiPlugin from 'gsap/PixiPlugin' // eslint-disable-line no-unused-vars

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    app: function () {
      return new PIXI.Application({
        width: 256,
        height: 256,
        antialias: true,
        transparent: false,
        resolution: 1
      })
    },
    sprites: function () {
      return PIXI.loader.resources['/img/spritesheet.json'].textures
    },
    redpuyo: function () {
      let newPuyo = new PIXI.Sprite(this.sprites['red_ud.png'])
      // newPuyo.anchor.set(0.5)
      return newPuyo
    },
    redOtherPuyo: function () {
      let newPuyo = new PIXI.Sprite(this.sprites['red_ur.png'])
      newPuyo.y = 60
      return newPuyo
    }
  },
  methods: {
    loadGame: function () {
      // Add the canvas that Pixi automatically created for you to the HTML document
      this.$refs.game.appendChild(this.app.view)
      // This `setup` function will run when the image has loaded
      let setup = () => {
        this.app.stage.addChild(this.redpuyo)
        this.app.stage.addChild(this.redOtherPuyo)
      }

      // load an image and run the `setup` function when it's done
      PIXI.loader
        .add('/img/spritesheet.json')
        .load(setup)
    },
    changePosition: function () {
      TweenMax.to(this.redpuyo, 1, {
        pixi: {
          y: 200,
          scaleX: 15
        },
        yoyo: true,
        repeat: -1
      })
    },
    removePuyo: function () {
      this.app.stage.removeChild(this.redpuyo)
    },
    addPuyo: function () {
      this.app.stage.addChild(this.redpuyo)
    },
    changePuyo: function () {
      this.redOtherPuyo.texture = this.sprites['red_ud.png']
    }
  },
  mounted () {
    this.loadGame()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
