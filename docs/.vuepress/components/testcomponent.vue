<template>
  <p>Test component!</p>
</template>

<script>
import * as PIXI from 'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/4.7.1/pixi.min.js'
export default {
  name: 'testcomponent',
  methods: {
    logPixi: function () {
      console.log(PIXI.Application())
    }
  }
}
</script>

<style>

</style>
