<template>
  <div style="background-color: aqua;">listening.</div>
</template>

<script>
// Import the EventBus we just created.
import { EventBus } from './eventbus.js';

export default {
  data() {
    return {
      clickCount: 0
    }
  },
  mounted () {
    EventBus.$on('i-got-clicked', clickCount => {
      console.log(`Oh, that's nice. It's gotten ${clickCount} clicks! :)`)
    });
  }
}
</script>