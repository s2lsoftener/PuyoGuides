<template>
  <div class="SimulatorNew">
    Chain Simulator Editor and Test Page.<br><br>
    <p>Chain seed: {{ seed }}</p>
    <chainsim v-if="jsonLoaded"
    :importedData="importedData" :manualData="manualData" :mersenneData="mersenneData"
    :useRandomSeed="useRandomSeed" :useManualData="useManualData">
    </chainsim><br><br>
  </div>
</template>

<script>
import Chainsim from '@/components/Chainsim.vue'
const MersenneTwister = require('mersenne-twister')

export default {
  name: 'SimulatorNew',
  components: {
    Chainsim
  },
  data () { /* eslint-disable */
    return {
      jsonFileToLoad: '/chain_json/default.json',
      jsonLoaded: false,
      importedData: undefined,
      mersenneData: '',
      // importedData: null,
      // seed: Math.round(Math.random() * 128)
      seed: 645,
      useRandomSeed: true,
      useManualData: false,
      manualData: {
        seed: 0,
        nextQueue: 'RRBBRRBB'
      }
    }
  },
  created () {
    if (this.useRandomSeed === true) {
      this.seed = Math.round(Math.random() * 65535)
    }
    
    if (this.useRandomSeed === false) {
      this.jsonFileToLoad = '/chain_json/advanced/tanaka_special_1.json'
    }

    if (this.useManualData === true) {
      this.manualData.nextQueue = this.manualData.nextQueue += this.generatedNextQueue.nextQueue
      this.manualData.seed = this.generatedNextQueue.seed
    }
    
    this.mersenneData = this.generatedNextQueue
    this.setJSON()
  },
  methods: {
    loadJSON: function (callback) {
      let xobj = new XMLHttpRequest()
      xobj.overrideMimeType('application/json')

      xobj.open('GET', this.jsonFileToLoad, true)
      xobj.onreadystatechange = function () {
        // eslint-disable-next-line
        if (xobj.readyState == 4 && xobj.status == '200') {
          callback(xobj.responseText)
        }
      }

      xobj.send(null)
    },
    setJSON: function () {
      this.loadJSON((response) => {
        this.importedData = JSON.parse(response)
        this.jsonLoaded = true
        console.log('JSON loaded!')
      })
    }
  },
  computed: {
    puyoGenerator: function () {
      return new MersenneTwister(this.seed)
    },
    generatedNextQueue: function () {
      let colorArray = []
      let colorChoice = this.puyoGenerator.random() * 5
      colorArray = colorChoice <= 1
        ? ['R', 'G', 'B', 'Y']
        : colorChoice <= 2
          ? ['P', 'G', 'B', 'Y']
          : colorChoice <= 3
            ? ['R', 'P', 'B', 'Y']
            : colorChoice <= 4
              ? ['R', 'G', 'P', 'Y']
              : ['R', 'G', 'B', 'P']

      let shuffleArray = [] // Shuffle the colors so purple isn't overrepresented.
      for (let i = 3; i >= 0; i--) {
        let index = Math.floor(this.puyoGenerator.random_excl() * (i + 1))
        shuffleArray.push(colorArray[index])
        colorArray.splice(index, 1)
      }

      console.log(shuffleArray)

      let colorString = ''
      for (let i = 0; i < 512; i++) {
        (i < 4)
          ? colorString += shuffleArray[Math.floor(this.puyoGenerator.random_excl() * 3)]
          : colorString += shuffleArray[Math.floor(this.puyoGenerator.random_excl() * 4)]
      }
      return {
        seed: this.seed,
        nextQueue: colorString
      }
    }
  }
}
</script>
<style scoped>
</style>
