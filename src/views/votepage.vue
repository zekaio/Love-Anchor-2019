<template>
  <div id="votepage">
    <div id="cardcontain">
    <card v-for="(value,key,index) in test" :info="value" :key="index">
    </card>
    </div>
    <div id="final-btn">
      <input type="submit" class="queren" id="final" value=" ">
    </div>
    <div id="attention">网络出错啦，请稍候再试！</div>
        <div id="bottom2"></div>
  </div>
</template>
<script>
import card from '../components/card'
// import {show}from '../js/config'
var test = require("@/assets/test.json");
// alert(test);
export default {
  data() {
    return {
      // getinfo:[]
      test:test
    }
  },
  components:{
    card
  },
  mounted(){
  //   this.axios(show)
  //   .then(res=>{
  //     this.getinfo=res.data.user;
  //     if(this.getinfo.length==0){
  //       //禁用确认按钮  报错
  //     }
  //   })
  // for(var i=0;i<=test.length;i++){
  //   this.getinfo[i]=test[i];
  // }
  }
}

</script>
<style>
#cardcontain{
    height: 100vw;
    padding-top: 20vw;
    overflow-y: scroll;
    margin-bottom: 20vw;

}
#cardcontain::-webkit-scrollbar {
  display: none;
}
#final{
      background: none;
    border: none;
    color: transparent;
    font-size: 8vw;
    outline: none;
}
#final-btn{
          background-image: url('../assets/img/final.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 9.5vw;
}
#attention{
    font-size: 3.2vw;
    margin-top: 4vw;
  font-family: "STYuanti";
  color: rgb(169, 60, 39);
  line-height: 1.667;
  white-space: normal;
    overflow-x: scroll;
    margin-left: 25%;
       width: 55%;
}
#bottom2{
    position: absolute;
  z-index: 1;
    background-image: url('../assets/img/bottom_less.png');
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: bottom;
    height: 40vw;
    width: 40vw;
    right: 0;
    bottom: 0;

}
</style>
