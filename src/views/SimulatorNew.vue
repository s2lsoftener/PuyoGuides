<template>
  <div class="SimulatorNew">
    Chain Simulator Editor and Test Page.
    <chainsim2
    :importedData="{
      fieldData: 'JJPBRPRYYBRGGYYPBRBPPBRGRGYPBGGYPBPGRGYPBPRGYPBPRBBGRGBPYBGGGRPYBRGRPYBRGRPYBR',
      shadowData: 'RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR',
      cursorData: '000101011010000101011010000101011010000101011010000101011010000101011010000000',
      arrowData: '00URDL00URDL00URDL00URDL00URDL00URDL00URDL00URDL00URDL00URDL00URDL00URDL00URDL'
    }">
    </chainsim2>
  </div>
</template>

<script>
// @ is an alias to /src
import Chainsim2 from '@/components/Chainsim2.vue'

export default {
  name: 'SimulatorNew',
  components: {
    Chainsim2
  }
}
</script>
