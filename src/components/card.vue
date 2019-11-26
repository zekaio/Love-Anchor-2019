<template>
  <div :id="'card'+info.index" class="cardbox" @click="change">
    <h1 class="name" :id="'user'+info.index">{{info.index}}</h1>
    <div
      class="icon-container"
      :id="'box'+info.index"
      :style="'backgroundImage:url('+ info.iconsrc + ')'"
    >
      <audio :id="'audio'+info.index" :src="info.audiosrc" controlslist="nodownload"></audio>
    </div>
    <div class="info">
      <h2 class="name">{{info.name}}</h2>
      <input
        type="submit"
        :class="audiobtn"
        ref="play"
        id="play"
        muted="muted"
        @click="control"
        value
        :ifChecked="ifChecked"
      />
      <!---+realplay--!-->

      <div class="piao">{{info.number}}票</div>
      <!-- <div class="button_active" v-show="btnclass==false"  :id="'btn'+info.index" :ref="'btn'+info.index"  ></div> -->
      <p class="intro">{{info.text}}</p>
      <div :class="btnname" :id="'btn'+info.index" :ref="'btn'+info.index"></div>
      <!-- :style="'backgroundImage:url(' + btnsrc + ')'" v-show="btnclass==true" -->
    </div>
  </div>
</template>
<script>
export default {
  name: "card",
  props: {
    info: Object,
    index: Number,
    name: String,
    num: Number,
    text: String,
    iconsrc: String,
    audiosrc: String,
    ifCheck: Number,
    ifChecked: Boolean,
    Player: Number
  },
  data() {
    return {
      boxidx: 0,
      show: true,
      // btnname:"button"
      //  audiobtn:"playbtn",

     
    };
  },
  computed: {
    boxindex: function() {
      return "box" + this.index;
    },

    btnname: function() {
      // var now=sessionStorage.getItem('choose');
      // window.console.log(1);
      if (this.info.index == this.ifCheck) {
        return "button_active";
      } else {
        return "button";
      }
    },
     ifPlay: function(){
      if (this.Player == this.info.index) {
        return  true;
      }else{
        return false;
      }
     },
    // realplay: function() {
    //   if (this.Player != 0) {
    //     if (this.ifCheck != this.info.index) {
    //       return "stop";
    //     }
    //     return "";
    //   } else {
    //     return "stop";
    //   }
    // },
    audiobtn: function() {
      // if (this.ifPlay == true) {
      if (this.ifPlay) {
        //   return "playbtn";
        // }
        return "playbtn_active";
      } else {
        return "playbtn";
      }
    }
  },
  mounted() {
    // this.$refs.audio.src = this.info.audiosrc;
  },
  watch: {
    //     Player:function () {
    //     document.querySelector("#audio" + this.Player).pause();
    //     this.Player=this.ifCheck;
    // },
  },
  methods: {
    change() {
      sessionStorage.setItem("choose", this.info.index);
      // this.$parent.$emit('goback',this.info.index);
      this.$emit("goback", this.info.index);
      window.console.log("正在播放的是" + this.Player);
    },
    control() {
      window.console.log("正在播放的是" + this.Player);
      this.$emit("changePlayer", this.info.index);


      // document.querySelector("#audio" + this.Player).pause();
      // this.Player=this.ifCheck;
      // if (this.Player != this.info.index && this.Player != 0) {
      //   document.querySelector("#audio" + this.Player).pause();
      // } else if (this.Player == 0 || this.Player == this.info.index) {
      // var audio = document.querySelector("#audio" + this.Player);
      // switch (this.ifPlay) {
      //   case false:
      //     // this.audiobtn="playbtn_active";
      //     audio.play();
      //     this.ifPlay = true;

      //     break;
      //   case true:
      //     // this.audiobtn="playbtn";
      //     audio.pause();
      //     audio.currentTime = 0;
      //     this.ifPlay = false;
      //     break;
      // }
      //   if(this.info.index==this.ifCheck){
      //   this.audiobtn="playbtn_active";
      //   return;
      // }else{
      //   this.audiobtn="playbtn"
      // }
      // }
    }
  }
};
</script>
<style>
.icon-container {
  background-image: url(https://cn.bing.com/th?id=OIP.SierodiUS4Sz4Is_WSARdgHaDP&pid=Api&rs=1);
  height: 25vw;
  width: 25vw;
  background-size: 250% !important;
  background-position-x: center;
  background-position-y: -20px;
  margin: 0;
  margin-top: 2.5vw;
  float: left;
  border-radius: 8px;
  /* 如果要显示四个的话↓ 要这个不要上面的
  height: 135vw;

    overflow-y: scroll;
    margin-bottom: 5vw;
    padding-bottom: 5vw;
    padding-left: 2%;
    padding-right: 2%; */
}

.icon-container:hover {
    position: absolute;
    top: 5%;
    background-size: 100%!important;
    background-position-y: 0;
    background-repeat: no-repeat;
    width: 90%;
    height: 50%;
    border-radius: 2rem;
}
.cardbox {
  /* width: 96%; */
  height: 30vw;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  /* margin-left: 2%; */
  padding-left: 10px;
}
.name {
  margin: 0;
  padding: 0;
  text-align: left;
  float: left;
  font-size: 5vw;
  margin-top: 5px;
}
.piao {
  /* float: left; */
  font-family: "STYuanti";
  color: rgb(60, 13, 4);

  font-size: 3vw;
  margin: 0;
  padding: 0;
  font-size: 4vw;
  /* margin-left: 10px; */
  width: 15vw;
  height: 12vw;
  /* margin-left: -15px; */
    clear: both;
    text-align: left;
    width: 100%;
    height: 5vw;
    white-space: pre;
}
.button {
  display: block;
  margin: 0;
  width: 20vw;
  float: right;
  height: 20vw;
  margin-top: -9vw;
  background-image: url("../assets/img/void.png");
  background-size: 15px;
  background-repeat: no-repeat;
  background-position: center;
}
.button_active {
  display: block;
  margin: 0;
  width: 20vw;
  float: right;
  height: 20vw;
  margin-top: -9vw;
  background-image: url("../assets/img/selected.png");
  background-size: 15px;
  background-repeat: no-repeat;
  background-position: center;
}
.playbtn,
.playbtnstop,
.playbtn_activestop {
  -webkit-appearance: none;
  border: none;
  background: none;
  background-size: contain;
  background-image: url("../assets/img/play.png");
  background-repeat: no-repeat;
  background-position: center;
  width: 5vw;
  height: 6vw;
  float: left;
  margin-left: 2vw;
  margin-top: 1vw;
  outline: none;
  margin-top: 5px;
}
.playbtn_active {
  -webkit-appearance: none;
  border: none;
  background: none;
  background-size: contain;
  background-image: url("../assets/img/stop.png");
  background-repeat: no-repeat;
  background-position: center;
  width: 5vw;
  height: 6vw;
  float: left;
  margin-left: 2vw;
  margin-top: 1vw;
  outline: none;
  margin-top: 5px;
}
.info {
  margin-left: 40%;
  overflow: hidden;
  height: 100%;
}
.intro {
  text-align: left;
  white-space: normal;
  /* width: 36vw; */
  height: 10vw;
  margin-top: 2vw;
  overflow: scroll;
  margin-bottom: 2vw;
  font-family: "Microsoft YaHei";
  color: rgb(60, 13, 4);
  font-size: 4vw !important;
}
.intro {
  text-align: left;
  white-space: normal;
  /* width: 36vw; */
  height: 11vw;
  /* margin-top: -20px; */
  overflow: scroll;
  margin-bottom: -12.5vw;
  font-family: "Microsoft YaHei";
  color: rgb(60, 13, 4);
  font-size: 4vw !important;
  width: 70%;
}
h1 {
  background-image: url("../assets/img/index.png");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: 10vw !important;
  font-weight: 300;
  padding: 2vw !important;
  margin-right: 10px !important;
  font-family: "Microsoft YaHei";
  color: rgb(60, 13, 4);
  font-size: 4vw !important;
}
h2.name {
  font-family: "STYuanti";
  color: rgb(60, 13, 4);
  font-weight: 400;
}
.cardbox>.name {
    width: 4vw;
    height: 6vw;
    /* margin: 0 !important; */
    text-align: center;
    margin-top: 9vw !important;}

</style>