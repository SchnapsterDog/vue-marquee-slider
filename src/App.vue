<template>
  <div id="app">
    <marquee-slider speed="10000" id="one" :item-width="250" :space="250">
      <img alt="Vue logo" src="./assets/logo.png">
      <img alt="Vue logo" src="./assets/logo.png">
      <img alt="Vue logo" src="./assets/logo.png">
    </marquee-slider>
  </div>
</template>

<script>
import MarqueeSlider from './components/MarqueeSlider.vue'

export default {
  name: 'App',
  components: {
    MarqueeSlider
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
