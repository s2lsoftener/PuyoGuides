<template>
  <div class="asset-loader"></div>
</template>

<script>
import '../assets/js/pixi.min.js'
import { EventBus } from './eventbus.js'

const loader = PIXI.loader // eslint-disable-line no-unused-vars
const resources = PIXI.loader.resources // eslint-disable-line no-unused-vars

export default {
  data () {
    return {
      texturesToLoad: [
        '/img/arle_bg.png',
        '/img/field.json',
        '/img/puyo.json',
        '/img/arrow.png',
        '/img/arrow_x.png',
        '/img/cursor.png',
        '/img/cursor_x.png',
        '/img/chain_font.json',
        '/img/edit_bubble.png',
        '/img/touch_disabler.png',
        '/img/picker_arrow_left.png',
        '/img/picker_arrow_right.png',
        '/img/editor_x.png',
        '/img/current_tool.png',
        '/img/next_background_1p_mask.png'
      ]
    }
  },
  mounted () {
    let loadProgressHandler = (loader, resource) => {
      console.log(`Loading: ${resource.url}`)
      console.log(`Progress: ${Math.floor(loader.progress)}%`)
    }

    loader
      .add(this.texturesToLoad)
      .on('progress', loadProgressHandler)
      .on('complete', () => {
        EventBus.setLoaded()
      })
      .load()
  }
}
</script>

<style scoped>
.asset-loader {
  width: 0px;
  height: 0px;
}
</style>
