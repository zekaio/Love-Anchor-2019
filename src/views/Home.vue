<template>
  <div id="home">
    <div>
      <img
        src="../assets/img/title.png"
        alt=""
        style="width:60vw; margin-top:22vh"
      />
    </div>
    <!-- <div id="title"></div> -->
    <!-- <h1 class="title">这里是爱上你主播大赛投票通道</h1>
    <h2 class="title">你的投票对选手们至关重要</h2>
    <h3 class="title">快去给心仪选手投票打call吧！</h3>
    <div id="left"></div>
    <h3 class="title">每天可以投一票哦~</h3> -->
    <router-link to="/votepage">
      <img src="../assets/img/start.png" style="width:40vw; margin-top: 30vh" />
    </router-link>
    <!-- <div id="change">
      <router-link to="/votepage" class="changepage">去投票</router-link>
    </div> -->
    <!-- <div id="bottom"></div> -->
  </div>
</template>

<script>
export default {
  name: 'home',
};
</script>
<style scoped>
h1,
h2,
p {
  user-select: none !important;
}

#home {
  background-image: url('../assets/img/bg_home.jpg');

  /* zoom: 1 !important; */

  /* margin-left: auto; */
  /* margin-right: auto; */
  text-align: center;
  /* margin-top: 0; */
  background-size: auto 100%;
  background-position: center center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
}
/* #title {
  background-image: url('../assets/img/title.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 35vw;
} */
.title {
  z-index: 10;
  font-size: 5vw;
  font-weight: 380;
  font-family: 'YouYuan';
  color: rgb(60, 13, 4);
  /* color: white; */
  margin-bottom: 15vw;
  line-height: 0.354;
  color: white;
}
#home {
  padding-top: 20vw;
}
#home > h1 {
  margin-top: 14vw;
}
#left {
  position: absolute;
  z-index: 1;
  background-image: url('../assets/img/left.png');
  background-size: contain;
  background-repeat: no-repeat;
  height: 15vw;
  width: 25vw;
}
/* #bottom {
  position: absolute;
  z-index: 1;
  background-image: url('../assets/img/bottom.png');
  background-size: contain;
  background-repeat: no-repeat;
  height: 34vw;
  width: 25vw;
  right: 0;
  bottom: 0;
} */
/* #change {
  background-image: url('../assets/img/start.png');
  background-size: 40% auto;
  background-repeat: no-repeat;
  background-position: center;
  height: 15vw;
  margin-top: 35vh;
} */
.changepage {
  font-size: 10vw;
  color: transparent;
  text-decoration-line: none;
}
</style>
