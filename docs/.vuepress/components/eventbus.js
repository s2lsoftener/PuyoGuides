import Vue from 'vue'
export const EventBus = new Vue({
  data: {
    assetsLoaded: false
  },
  methods: {
    setLoaded: function () {
      this.assetsLoaded = true
    }
  }
})