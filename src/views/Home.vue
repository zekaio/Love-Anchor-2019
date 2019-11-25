<template>
  <div id="home">
    <div id="title"></div>
    <h1 class="title">这里是爱上你主播大赛投票通道</h1>
    <h2 class="title">你的投票对选手们至关重要</h2>
    <h3 class="title">快去给心仪选手投票打call吧！</h3>
    <div id="left"></div>
    <h3 class="title">每天可以投一票哦~</h3>
    <div id="change">
          <router-link to="/votepage" class="changepage">去投票</router-link>
    </div>
    <div id="bottom"></div>
  </div>
</template>

<script>
export default {
  name: "home",
  mounted() {
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
};
</script>
<style scoped>
#title{
  background-image: url('../assets/img/title.png');
      background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 35vw;
}
.title {
  z-index: 10;
    font-size: 5vw;
    font-weight: 380;
    font-family: "YouYuan";
    color: rgb(60, 13, 4);
    /* color: white; */
    margin-bottom: 15vw;
    line-height: 0.354;
}
#home {
    padding-top: 20vw;
}
#home>h1{
  margin-top: 14vw;
}
#left{
  position: absolute;
  z-index: 1;
    background-image: url('../assets/img/left.png');
    background-size: contain;
    background-repeat: no-repeat;
    height: 15vw;
    width: 25vw;
}
#bottom{
  position: absolute;
  z-index: 1;
    background-image: url('../assets/img/bottom.png');
    background-size: contain;
    background-repeat: no-repeat;
    height: 34vw;
    width: 25vw;
    right: 0;
    bottom: 0;
}
#change{
      background-image: url('../assets/img/go.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 15vw;
}
.changepage{
      font-size: 10vw;
    color: transparent;
    text-decoration-line: none;
}
</style>
