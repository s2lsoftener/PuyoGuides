<template>
  <a @click="openChainsim"><slot></slot></a>
</template>

<script>
import { EventBus } from './eventbus.js'

export default {
  name: 'ChainLink',
  props: ['importedData', 'nextQueue'],
  data () {
    return {
      currentSlide: 0
    }
  },
  methods: {
    openChainsim: function () {
      EventBus.$emit('openModal', {importedData: this.importedData, nextQueue: this.nextQueue, currentSlide: this.currentSlide})
    }
  }
}
</script>

<style>

</style>
