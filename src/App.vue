<template>
  <div id="app" v-on:touchmove.native="prevent(e)">
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<style>
html {
  height: 100vh;
  zoom: 1 !important;
}
body {
  margin: 0%;
  overflow: hidden;
  zoom: 1 !important;
}

h1,
h2,
p {
  user-select: none !important;
}
</style>
<script>
window.onload = function() {
  document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener('gesturestart', function(event) {
    event.preventDefault();
  });
};
import { wxlogin } from './js/api'; //showlogin,getinfo    记得把这个开起来 上线的时候
import { checkLogin } from './js/config';

export default {
  data() {
    return {
      transitionName: 'slide-down',
    };
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-up' : 'slide-down';
    },
  },
  mounted() {
    this.axios.get(checkLogin).then(() => wxlogin());
  },
  methods: {
    prevent(event) {
      event.preventDefault();
    },
  },
};
</script>
