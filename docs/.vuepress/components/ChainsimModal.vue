<template>
  <div>
    <chainsim-modal-content v-show="showModal">
      <h3 slot="header">Chain Simulator</h3>
      <div slot="body"><chainsim :showModal="showModal" /></div>
    </chainsim-modal-content>
  </div>
</template>

<script>
// Import the EventBus we just created.
import { EventBus } from './eventbus.js'
import ChainsimModalContent from './ChainsimModalContent'
import Chainsim from './Chainsim'

export default {
  components: {
    ChainsimModalContent,
    Chainsim
  },
  data() {
    return {
      showModal: false,
      chainsimData: [{
        fieldData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
        shadowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
        cursorData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
        arrowData: '000000000000000000000000000000000000000000000000000000000000000000000000000000',
        autoDrop: false
      }]
    }
  },
  mounted () {
    EventBus.$on('openModal', () => {
      this.showModal = true
    })
    EventBus.$on('closeModal', () => {
      this.showModal = false
    })
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 150%; /* Extra height so the translucent black covers the screen on all devices */
  background-color: rgba(0, 0, 0, .5);
  transition: opacity 0.3s ease;
}

.modal-wrapper-outer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: table;
}

.modal-wrapper {
  position: relative;
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  position: relative;
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  position: relative;
  margin: 10px 0;
  width: 100%;
}

.modal-default-button {
  position: absolute;
  top: 22px;
  right: 22px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
