<template>
  <div id="home">
    <h1 class="title" >这里是爱上你主播大赛投票通道</h1>
    <h2 class="title" >你的投票对选手们至关重要！</h2>
    <h3 class="title" >快去给心仪选手投票打call吧！</h3>
    <h3 class="title" >每天只可以投一票哦</h3>
    <router-link to= "/votepage" class="changepage">去投票</router-link>
  </div>
</template>

<script>
export default {
  name: 'home',
  mounted(){
    //   if (!isWeiXin()) {
    //   this.isAbled = 1;
    //   return;
    // } else {
    //   this.isAbled = 0;
    // }
    // checkTime();
    // if(window.sessionStorage.getItem('TimeErr')!=""){
    //   this.$alert(window.sessionStorage.getItem('TimeErr'),"提示").catch(()=>{});
    // }
  }
}
</script>
<style scoped>
.title{
      font-size: 3.5vw;
}
#home{
      margin-top: 20vw;
}
</style>
