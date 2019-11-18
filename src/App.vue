<template>
  <div id="app">
<transition :name="transitionName">
  <router-view></router-view>
</transition>  </div>
</template>
<style>
html{
      height: -webkit-fill-available;
}
body{
  margin: 0%;
}
#app{
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    margin-top: 0;
    width: 100%;
    background-size: cover;
    height: -webkit-fill-available;
    background-image: url('./assets/img/background.jpg')
}
</style>
<script>
export default {
  data() {
    return {
      transitionName:'slide-right'
    }
  },
  watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
  }
}
</script>