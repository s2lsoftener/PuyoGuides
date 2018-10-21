<template>
  <div>
    <chainsim-modal-content v-show="showModal" v-on:close="showModal = false">
      <h3 slot="header">Chain Simulator</h3>
      <div slot="body"><chainsim /></div>
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
    EventBus.$on('i-got-clicked', () => {
      this.showModal = !this.showModal
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
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
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
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
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
