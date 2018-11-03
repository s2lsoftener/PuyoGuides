<template>
  <div>
    <input type="text" v-model="manualSeed"><button @click="seedChosen = true">Load Seed</button>
    <GameSlides v-if="seedChosen" :useRandomSeed="true" :useManualData="false" :replay="false"
    :manualSeed="seed">
    </GameSlides>
  </div>
</template>

<script>
import GameSlides from './GameSlides'

export default {
  name: 'SlideLoaderManualSeed',
  components: {
    GameSlides
  },
  data () {
    return {
      manualSeed: 0,
      seedChosen: false,
      seed: 0
    }
  },
  watch: {
    manualSeed: function () {
      this.seed = parseInt(this.manualSeed, 10)
    }
  }
}
</script>

<style>

</style>
