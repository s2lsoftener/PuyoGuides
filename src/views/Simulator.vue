<template>
  <div class="simulator">
    Chain Simulator Editor and Test Page.
    <chainsim></chainsim>
  </div>
</template>

<script>
// @ is an alias to /src
import Chainsim from '@/components/Chainsim.vue'

export default {
  name: 'simulator',
  components: {
    Chainsim
  }
}
</script>
