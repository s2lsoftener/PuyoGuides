<template>
  <div class="SimulatorNew">
    Chain Simulator Editor and Test Page.
    <chainsim3
    :importedData="{
      fieldData: 'R00B00P00000G00000B00000R00000Y00000GY0000GYPB0RYPPR0RYYPJRYGRBGYYGGRBGGRRBBGY',
      // fieldData: '000000000000000000000000000000000000000000000000000000000000BBBBGGRRRRGGYYYYYY',
      shadowData: 'RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR',
      cursorData: '000101011010000101011010000101011010000101011010000101011010000101011010000000',
      arrowData: '00URDL00URDL00URDL00URDL00URDL00URDL00URDL00URDL00URDL00URDL00URDL00URDL00URDL'
    }">
    </chainsim3>
  </div>
</template>

<script>
// @ is an alias to /src
import Chainsim3 from '@/components/Chainsim3.vue'

export default {
  name: 'SimulatorNew',
  components: {
    Chainsim3
  }
}
</script>
