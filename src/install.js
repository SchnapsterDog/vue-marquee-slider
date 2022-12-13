import MarqueeSlider from '@/components/MarqueeSlider.vue';

const VueMarqueeSlider = {
  install(Vue) {
    Vue.component("vue-marquee-slider", MarqueeSlider);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueMarqueeSlider);
}

export default VueMarqueeSlider;