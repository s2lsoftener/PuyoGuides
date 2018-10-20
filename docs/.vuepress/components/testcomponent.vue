<template>
  <div>
    <p>Test component</p>
    <div ref="games"></div>
  </div>
</template>

<script>
import '../assets/js/pixi.min.js'
import Chainsim from '../assets/js/chainsim.js'

export default {
  name: 'testcomponent',
  components: {

  },
  mounted () {
    let app = new PIXI.Application({width: 256, height: 256})
    this.$refs.games.appendChild(app.view)
    console.log(Chainsim)
  }
}
</script>

<style>

</style>
