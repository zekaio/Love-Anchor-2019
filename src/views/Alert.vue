<template>
  <div id="alert">
    <transition id="attention2">
      <!-- <div id="alertbox"> -->
      <img
        src="../assets/img/title.png"
        alt=""
        style="width:60vw; margin-top:10vh"
      />
      <!-- <div id="title"></div> -->
      <p class="attentiontext">{{ line1 }}<br />{{ line2 }}</p>
      <!-- </div> -->
    </transition>
    <!-- <div id="bottom"></div> -->
  </div>
</template>

<script>
export default {
  name: 'alert',
  data() {
    return {
      line1: '你已经投过票了',
      line2: '记得明天再来哦',
    };
  },
  mounted() {
    if (sessionStorage.getItem('line1') != '') {
      this.line1 = sessionStorage.getItem('line1');
    }
    if (sessionStorage.getItem('line2') != '') {
      this.line2 = sessionStorage.getItem('line2');
    }
    if (sessionStorage.getItem('line1') == undefined) {
      this.line1 = '你已经投过票了';
      this.line2 = '记得明天再来哦';
    }
  },
};
</script>
<style scoped>
h1,
h2,
p {
  user-select: none !important;
}
#alert {
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
#title {
  background-image: url('../assets/img/title.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 35vw;
}
#bottom {
  position: absolute;
  z-index: 1;
  background-image: url('../assets/img/bottom_text.png');
  background-size: contain;
  background-repeat: no-repeat;
  height: 34vw;

  width: 100%;
  right: 0;
  bottom: 0;
}
#alertbox {
  background-image: url('../assets/img/alert.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 125vw;
  width: 100%;
  padding-top: 10vw;
}
.attentiontext {
  margin: 0;
  width: 50vw;
  padding-left: 25%;
  padding-right: 25%;
  height: 40vw;
  text-align: center;
  margin-top: 10vw;
  font-size: 7vw;
  font-family: 'STYuanti';
  color: rgb(44, 36, 35);
  line-height: 2.3;
}
</style>
