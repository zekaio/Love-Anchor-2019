<template>
  <div id="votepage">
    <div id="cardcontain">
    <card v-for="(value,key,index) in test" :info="value" :key="index">
    </card>
    </div>
    <div id="final-btn">
      <input type="submit" class="queren" id="final" value="确认投票">
    </div>
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
    margin-top: 20vw;
    height: 100vw;
    overflow-y: scroll;
    margin-bottom: 20vw;

}
#cardcontain::-webkit-scrollbar {
  display: none;
}
</style>
