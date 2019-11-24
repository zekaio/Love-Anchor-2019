<template>
  <div id="votepage">
    <div id="cardcontain">
      <card
        v-for="(value,key,index) in test"
        :info="value"
        :key="index"
        :Player="Player"
        @goback="choose"
        :ifCheck="ifCheck"
      >
        <!-- :btnsrc="btnsrc"  -->
      </card>
    </div>
    <div id="final-btn">
      <input type="submit" class="queren" id="final" value=" " @click="submit" :ifClick="ifClick" />
    </div>
    <div id="attention">{{errmsg}}</div>
    <div id="bottom2"></div>
  </div>
</template>
<script>
import card from "../components/card";
import { posturl,login,  show } from "../js/config"; //show,login,getinfo
import axios from "axios";
// var test = require("@/assets/test.json");

// alert(test);
// fetch(getinfo, {
//     headers: {
//       "Content-Type": "application/json"
//     },
//     method: "GET"
//     })
//     .then(res => {{
//       window.console.log(res);
//     }})
// var data= require("@/assets/test.json");

export default {
  data() {
    return {
      // getinfo:[]
      test: [{}],
      index: 0,
      ifCheck: 0,
      // btnsrc:"../assets/img/void.png",
      // ifChecked:false
      ifClick: false,
      Player: 0,
      errmsg: ""
    };
  },
  components: {
    card
  },
  mounted() {
    axios(login);
    axios(show)
      .then(res => {
        this.test = Object.values(res.data);
        window.console.log(res.data)
        window.console.log(this.test)
      })
      .catch(error => {
        window.console.log(error);
      });
    // test = Object.values(test);
    // window.console.log(test);
    // sessionStorage.setItem("choose", 0);
  },
  computed: {},
  methods: {
    choose(value) {
      // var idx=sessionStorage.getItem('choose');
      //  window.console.log(idx);
      //  window.console.log(value);
      this.ifCheck = value;
      this.Player = value;
      //    for(var i=1;i<=document.getElementsByTagName('audio').length+1;i++){
      //document.querySelector("#audio" + i).pause();
      //}
      this.ifClick=false;
    },
    submit() {
      this.errmsg = "";
      if(this.ifClick==true){
        this.errmsg = "点太快啦！"
          return;
      }
      this.ifClick=true;
      const vote = {
        //提交索引
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: this.ifCheck,
        transformRequest: [
          function(data) {
            data = JSON.stringify(data);
            return data;
          }
        ],
        url: posturl+this.ifCheck
      };
      axios(vote)
        .then(res => {
          window.console.log(res);
          if(res.data.errcode==3){
            this.$router.push("/alert");
          }else if(res.data.errcode==0){

            this.errmsg="感谢投票！"
          }else{

            this.errmsg="似乎有什么出错了哦"
          }
        })
        .catch(() => {
          this.ifClick=false;
          this.errmsg = "网络出错，请稍候再试";
        });
    }
  }
};
</script>
<style>
#votepage{
  padding-top: 10%;
}
#cardcontain {
  height: 100vw;
  padding-top: 20vw;
  overflow-y: scroll;
  margin-bottom: 5vw;
  padding-bottom: 5vw;
  padding-left: 2%;
  padding-right: 2%;
}
#cardcontain::-webkit-scrollbar,
#attention::-webkit-scrollbar,
p.intro::-webkit-scrollbar {
  display: none;
}
#final {
  background: none;
  border: none;
  color: transparent;
  font-size: 8vw;
  outline: none;
}
#final-btn {
  background-image: url("../assets/img/final.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 9.5vw;
}
#attention {
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
#bottom2 {
  position: absolute;
  z-index: 1;
  background-image: url("../assets/img/bottom_less.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: bottom;
  height: 40vw;
  width: 40vw;
  right: 0;
  bottom: 0;
}
</style>
