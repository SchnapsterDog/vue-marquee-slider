<script>
import Vue from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
import { VueMarqueeSlider } from '@/entry.esm';

export default Vue.extend({
  name: 'ServeDev',
  components: {
   VueMarqueeSlider,
  }
});
</script>

<template>
  <div id="app">
    <vue-marquee-slider id="id">
      <span>One</span>
      <span>Two</span>
    </vue-marquee-slider>
  </div>
</template>
