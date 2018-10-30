<template>
  <div class="asset-loader"></div>
</template>

<script>
import { EventBus } from './eventbus.js'
import isNode from 'detect-node'

let PIXI = null
let loader = null
let resources = null

if (!isNode) {
  PIXI = window.PIXI
  loader = PIXI.loader
  resources = PIXI.loader.resources
}

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

    if (loader.progress === 0) {
      loader
        .add(this.texturesToLoad)
        .on('progress', loadProgressHandler)
        .on('complete', () => {
          EventBus.setLoaded()
        })
        .load()
    } else {
      window.location.reload()
    }
  }
}
</script>

<style scoped>
.asset-loader {
  width: 0px;
  height: 0px;
}
</style>
