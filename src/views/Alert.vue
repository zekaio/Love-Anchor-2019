<template>
  <div id="alert">
    <transition id="attention2">
        <div :v-if="alertit" id="alertbox">
            <div id="title"></div>
            <p class="attentiontext">您已投票！<br>记得明天再来哦</p>
        </div>
    </transition>
    <div id="bottom"></div>
  </div>
</template>

<script>
export default {
  name: "alert",
  mounted() {
    
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
#bottom{
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
#alertbox{
        background-image: url('../assets/img/alert.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 125vw;
    width: 100%;
    padding-top: 10vw;

}
.attentiontext{
    margin: 0;
    width: 50vw;
    padding-left: 25%;
    padding-right: 25%;
    height: 40vw;
    text-align: center;
    margin-top: 10vw;
    font-size: 7vw;
  font-family: "STYuanti";
  color: rgb(44, 36, 35);
line-height: 2.3;
}
</style>