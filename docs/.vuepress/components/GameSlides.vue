<template>
  <div id="slideshow-wrapper">
    <div id="slideshow">
      <div class="chainsim-container">
        <chain-drill-maker v-if="jsonLoaded"
        :importedData="importedData" :manualData="manualData" :mersenneData="mersenneData"
        :useRandomSeed="useRandomSeed" :useManualData="useManualData" :slideText="slideText"
        :replay="replay" :inputtingText="inputtingText" :gameTitle="gameTitle" :chainType="chainType"
        v-on:change-comment-input="updateSlideText" v-on:reload="reloadGame">
        </chain-drill-maker>
      </div>
      <div class="text-container">
        <div class="slide-controls">
          <!-- <button @click="goToPrevSlide">&larr;</button>
          Slide: {{ slideshowSlide + 1 }} / {{ this.importedData.fields.length }}
          <button @click="goToNextSlide">&rarr;</button> -->
        </div>
        <div v-if="replay === undefined || replay === false" class="slide-text"
        @mouseover="inputtingText = true" @mouseout="inputtingText = false">
          Title: <input v-model="gameTitle" v-if="replay === false" />
        </div>
        <div v-if="replay === undefined || replay === false" class="slide-text"
        @mouseover="inputtingText = true" @mouseout="inputtingText = false">
          Type: <select v-model="chainType">
            <option disabled value="">Please select one</option>
            <option>playermade</option>
            <option>basics</option>
            <option>stairs</option>
            <option>sandwich</option>
            <option>lshape</option>
            <option>tailing</option>
            <option>gtr</option>
            <option>newgtr</option>
            <option>yayoi</option>
            <option>flatstacking</option>
            <option>fukigen</option>
            <option>other</option>
          </select>
        </div>

        
        <div v-if="replay === undefined || replay === false" class="slide-text"
        @mouseover="inputtingText = true" @mouseout="inputtingText = false">
          Write a helpful hint.
          <textarea rows="20" cols="30" v-model="slideText"></textarea>
        </div>
        <div v-if="replay === true" class="slide-text"
        @mouseover="inputtingText = true" @mouseout="inputtingText = false">
          <textarea rows="20" cols="30" v-model="slideText" readonly></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChainDrillMaker from './ChainDrillMaker'
const MersenneTwister = require('mersenne-twister')

export default {
  name: 'GameSlides',
  props: ['jsonFileToLoad', 'useRandomSeed', 'useManualData', 'manualData', 'replay', 'loaderData', 'manualSeed'],
  components: {
    ChainDrillMaker
  },
  data () {
    return {
      slideshowSlide: 0,
      jsonLoaded: false,
      importedData: undefined,
      mersenneData: '',
      seed: 0,
      editText: true,
      slideText: 'OK',
      renderGame: true,
      inputtingText: false,
      gameTitle: '',
      chainType: '',
      gatherJSON: {}
    }
  },
  created () {
    // Set seed of mersenne twister to random number
    if (this.manualSeed !== undefined) {
      this.seed = this.manualSeed
      console.log(this.seed)
    } else if (this.useRandomSeed === true) {
      this.seed = Math.round(Math.random() * 65535 * 2424)
    }
    
    // Load default slide template if jsonFileToLoad isn't passed in as a prop
    // if (this.jsonFileToLoad === undefined) {
    //   this.jsonFileToLoad = '/chain_json/default.json'
    // }

    // Use manually defined chain seed.
    if (this.useManualData === true) {
      this.manualData.nextQueue = this.manualData.nextQueue += this.generatedNextQueue.nextQueue
      this.manualData.seed = this.generatedNextQueue.seed
    }
    
    this.mersenneData = this.generatedNextQueue
    this.setJSON()
  },
  mounted () {
    if (localStorage.getItem('gatherJSON')) {
      try {
        this.gatherJSON = JSON.parse(localStorage.getItem('gatherJSON'))
        console.log('Found gatherJSON')
      } catch(e) {
        console.log('Removing gatherJSON from localStorage')
        localStorage.removeItem('gatherJSON')
      }
    }

    this.gatherJSON[this.jsonFileToLoad] = {
      title: this.jsonFileToLoad,
      completed: false,
      dateComplete: null
    }

    localStorage.setItem('gatherJSON', JSON.stringify(this.gatherJSON))
    console.log(JSON.stringify(this.gatherJSON))
  },
  methods: {
    loadJSON: function (callback) {
      let jsonfile
      if (this.jsonFileToLoad === undefined) {
        jsonfile = 'default.json'
      } else {
        jsonfile = this.jsonFileToLoad
      }
      
      let xobj = new XMLHttpRequest()
      xobj.overrideMimeType('application/json')

      xobj.open('GET', `/chain_json/${jsonfile}`, true)
      xobj.onreadystatechange = function () {
        // eslint-disable-next-line
        if (xobj.readyState == 4 && xobj.status == '200') {
          callback(xobj.responseText)
        }
      }

      xobj.send(null)
    },
    setJSON: function () {
      if (this.loaderData === undefined) {
        this.loadJSON((response) => {
          this.importedData = JSON.parse(response)
          this.jsonLoaded = true
          console.log('JSON loaded!')
        })
      } else {
        this.importedData = this.loaderData
        this.jsonLoaded = true
      }
    },
    updateSlideText: function (text) {
      this.slideText = text
    },
    reloadGame: function (data) {
      let newData = JSON.parse(data)
      this.renderGame = false
      this.importedData = newData
      this.mersenneData = {
        seed: newData.next.seed,
        nextQueue: newData.next.nextQueue
      }
      setTimeout(() => {
        this.renderGame = true
      }, 100)
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
#slideshow-wrapper {
  display: flex;
  justify-content: center;
}

#slideshow {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #f3f5f7;
  /* min-width: 273.6px;
  min-height: 384.3px; */
  margin-left: 8px;
  margin-right: 8px;
  padding: 12px;
  border-radius: 8px;
  -moz-box-shadow: 3px 3px 1px 0px #999;
  -webkit-box-shadow: 3px 3px 1px 0px #999;
  box-shadow: 3px 3px 1px 0px #999;
}
#slideshow {
  text-align: center;
}
.chainsim-container {
  position: relative;
}
.text-container {
  width: 273.6px;
  text-align: left;
}
.slide-controls {
  text-align: center;
  padding-top: 8px;
  padding-bottom: 4px;
}
.slide-text {
  padding: 8px 12px 8px 12px;
}
</style>
