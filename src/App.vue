<template>
  <div id="app">
    <RCR></RCR>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import RCR from './components/RCR.vue'

export default {
  name: 'App',
  components: {
    RCR
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
