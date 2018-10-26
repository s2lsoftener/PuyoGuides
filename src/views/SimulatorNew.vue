<template>
  <div class="SimulatorNew">
    Chain Simulator Editor and Test Page.<br><br>
    <chainsim
    :importedData="importedData" :nextQueue="nextQueue">
    </chainsim><br><br>
  </div>
</template>

<script>
// @ is an alias to /src
import Chainsim from '@/components/Chainsim.vue'
const MersenneTwister = require('mersenne-twister')

export default {
  name: 'SimulatorNew',
  components: {
    Chainsim
  },
  data () {
    return {
      importedData: [
        {
          fieldData: '000000000000000000000000000000R00000Y00000RRG000YRG00BYGBYPBYRGBYBRGBYPPRGBYPB',
          // shadowData: '0000000000000000000000000000000R00000G0000000000000000000000000000000000000000',
          shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
          cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
          arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
          autoDrop: false
        }
        // {
        //   // fieldData: '000000000000000000000000000000R00000YR0000RRG000YRG00BYGBYPBYRGBYBRGBYPPRGBYPB',
        //   fieldData: '000000000000000000000000000000RR0000YG0000RRG000YRG00BYGBYPBYRGBYBRGBYPPRGBYPB',
        //   shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
        //   cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
        //   arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
        //   autoDrop: true
        // },
        // {
        //   fieldData: '000000000000000000000000000000RR0000YGG000RRG000YRGB0BYGBYPBYRGBYBRGBYPPRGBYPB',
        //   shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
        //   cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
        //   arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
        //   autoDrop: true
        // }
      ],
      nextQueue: '',
      seed: 1
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

      let colorString = ''
      for (let i = 0; i < 512; i++) {
        (i < 4)
          ? colorString += colorArray[Math.floor(this.puyoGenerator.random_excl() * 3)]
          : colorString += colorArray[Math.floor(this.puyoGenerator.random_excl() * 4)]
      }
      return colorString
    }
  },
  created () {
    this.seed = Math.round(Math.random * 128)
    this.nextQueue = this.generatedNextQueue
  }
}
</script>
<style scoped>
</style>
