<template>
  <div>
    <input type="text" v-model="manualSeed"><button @click="seedChosen = true">Load Seed</button>
    <GameSlides v-if="seedChosen" :useRandomSeed="false" :useManualData="false" :replay="false"
    :manualSeed="parseInt(manualSeed, 10)">
    </GameSlides>
  </div>
</template>

<script>
import GameSlides from './GameSlides'

export default {
  name: 'SlideLoaderRandomSeed',
  components: {
    GameSlides
  },
  data () {
    return {
      manualSeed: 0,
      seedChosen: false
    }
  }
}
</script>

<style>

</style>
