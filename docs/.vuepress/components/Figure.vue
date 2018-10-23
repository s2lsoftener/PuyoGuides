<template>
  <div id="figure-wrapper">
    <div id="figure">
      <div class="image-container">
        <img :src="imgUrl">
      </div>
      <div class="text-container">
        {{ caption }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Figure',
  props: ['imgUrl', 'caption'],
  data () {
    return {
      figureSlide: 0
    }
  }
}
</script>

<style scoped>
#figure-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
}

#figure {
  display: inline-flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #f3f5f7;
  min-width: 273.6px;
  max-width: 460px;
  margin-left: 8px;
  margin-right: 8px;
  padding: 12px;
  border-radius: 8px;
  -moz-box-shadow: 3px 3px 1px 0px #999;
  -webkit-box-shadow: 3px 3px 1px 0px #999;
  box-shadow: 3px 3px 1px 0px #999;
}
#figure {
  text-align: center;
}
.text-container {
  text-align: center;
  line-height: 1em;
}
.slide-controls {
  text-align: center;
  padding-top: 8px;
  padding-bottom: 4px;
}
</style>
