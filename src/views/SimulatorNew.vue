<template>
  <div class="SimulatorNew">
    Chain Simulator Editor and Test Page.
    <chainsim2
    :importedData="{
      fieldData: 'R00000P00000G00000B00000R00B00Y00000GY0000GYP00RYPPR0RYYPJRYGRBGYYGGRBGGRRBBGY'
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
