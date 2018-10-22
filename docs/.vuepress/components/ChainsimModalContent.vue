<template>
  <transition name="modal">
    <div class="modal-mask" @click="closeIfOutside">
      <div class="modal-wrapper-outer">
        <div class="modal-wrapper">
          <div class="modal-container" @mousemove="mouseInside" @mouseout="mouseOutside">

            <div class="modal-header">
              <slot name="header">
                default header
              </slot>
            </div>

            <div class="modal-body">
              <slot name="body">
                default body
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                <button class="modal-default-button" @click="stopChainsim">
                  Close
                </button>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { EventBus } from './eventbus.js'

export default {
  data() {
    return {
      outside: false
    }
  },
  methods: {
    mouseInside: function () {
      this.outside = false
    },
    mouseOutside: function () {
      this.outside = true
    },
    closeIfOutside: function () {
      if (this.outside === true) {
        this.stopChainsim()
      }
    },
    stopChainsim: function () {
      EventBus.$emit('stopChainsim')
    }
  }
}
</script>

<style>

</style>
