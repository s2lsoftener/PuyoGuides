<template>
  <div>
    <input v-show="!dataLoaded" type="file" v-on:change="importJSON" /><br>
    <GameSlides v-if="dataLoaded" :loaderData="dataToLoad" :useRandomSeed="false" :useManualData="false" :replay="false"></GameSlides>
  </div>
</template>

<script>
import GameSlides from './GameSlides'

export default {
  name: 'SlideLoader',
  components: {
    GameSlides
  },
  data () {
    return {
      dataToLoad: null,
      dataLoaded: false,
      inputfile: undefined
    }
  },
  mounted () {
    if (localStorage.getItem('drillLoader')) {
      try {
        this.dataToLoad = JSON.parse(localStorage.getItem('drillLoader'))
        this.dataLoaded = true
        console.log('Found drillLoader')
      } catch(e) {
        console.log('Removing drillLoader from localStorage')
        localStorage.removeItem('drillLoader')
      }
    }
  },
  methods: {
    importJSON: function (ev) {
      let file = ev.target.files[0]
      let reader = new FileReader()

      reader.onload = e => {
        this.dataToLoad = JSON.parse(e.target.result)
        this.dataLoaded = true
      }

      reader.readAsText(file)
    }
  }
}
</script>

<style>

</style>
