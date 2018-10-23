<template>
  <div id="chainsim">
    <chain-img-field 
     v-if="gameInView" 
     :in-viewport-offset-top='-2000'
     :importedData="importedData" 
     :nextQueue="nextQueue"
     :slideshowSlide="0"
     :caption="caption"></chain-img-field>
  </div>
</template>

<script>
import ChainImgField from './ChainImgField'

const inViewport = require('vue-in-viewport-mixin')

export default {
  name: 'ChainImg',
  props: ['importedData', 'nextQueue', 'caption'],
  mixins: [ inViewport ],
  components: {
    ChainImgField
  },
  data () {
    return {
      gameInView: false
    }
  },
  mounted () {
    console.log(this.gameInView)
    if (inViewport.now === true) {
      this.gameInView = true
    }
  },
  watch: {
    'inViewport.now': function (visible) {
      console.log('This component is '+( visible ? 'in-viewport' : 'hidden'))
      if (visible === true) {
        this.gameInView = true
      }
    }
  }
}
</script>

<style>
#chainsim {
  position: relative;
  background-color: #f3f5f7;
  width: 273.6px;
  min-height: 384.3px;
  display: inline-block;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 8px;
  -moz-box-shadow: 3px 3px 1px 0px #999;
  -webkit-box-shadow: 3px 3px 1px 0px #999;
  box-shadow: 3px 3px 1px 0px #999;
  overflow: hidden;
  vertical-align: top;
}
</style>
