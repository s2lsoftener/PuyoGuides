<template>
  <div id="slideshow-wrapper">
    <div id="slideshow">
      <div class="chainsim-container">
        <chain-img-field :importedData="importedData" :nextQueue="nextQueue" :slideshowSlide="slideshowSlide" />
      </div>
      <div class="text-container">
        <div class="slide-controls">
          <button @click="goToPrevSlide">&larr;</button>
          Slide: {{ slideshowSlide + 1 }} / {{ this.importedData.length }}
          <button @click="goToNextSlide">&rarr;</button>
        </div>
        <div class="slide-text">
          {{ importedData[slideshowSlide].slideText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChainImgField from './ChainImgField'

export default {
  name: 'Slideshow',
  props: ['importedData', 'nextQueue'],
  components: {
    ChainImgField
  },
  data () {
    return {
      slideshowSlide: 0
    }
  },
  methods: {
    goToPrevSlide: function () {
      if (this.slideshowSlide > 0) {
        this.slideshowSlide -= 1
      }
    },
    goToNextSlide: function () {
      if (this.slideshowSlide < this.importedData.length - 1) {
        this.slideshowSlide += 1
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
