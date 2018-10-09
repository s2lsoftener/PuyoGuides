<template>
  <div class="chainsim">
    <h1>Hi</h1>
    <p>
      For guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <div ref="game"></div>
    <br>
    <button @click="removePuyo">Remove Puyo</button>
    <button @click="changePosition">Change Puyo Position</button>
    <button @click="addPuyo">Add Puyo</button>
    <button @click="changePuyo">Change Puyo</button>
  </div>
</template>

<script>
export default {
  name: 'Chainsim'
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
