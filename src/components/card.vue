<template>
  <div :id="'card'+info.index" class="cardbox" @click="change">
    <h1 class="name" :id="'user'+info.index">{{info.index}}</h1>

    <div
      class="icon-container"
      :id="'box'+info.index"
      :style="'backgroundImage:url(' + info.iconsrc + ')'"
      @click="control"
    >
      <audio
        ref="audio"
        :src="info.audiosrc"
        preload="none"
        autoplay="false"
        controlslist="nodownload"
        oncontextmenu="return false"
      ></audio>
    </div>
    <div class="info">
      <h2 class="name">{{info.name}}</h2>
      <div class="piao">{{info.num}}票</div>
            <!-- <div class="button_active" v-show="btnclass==false"  :id="'btn'+info.index" :ref="'btn'+info.index"  ></div> -->
      <div :class="btnname"  :id="'btn'+info.index" :ref="'btn'+info.index"  ></div>
      <!-- :style="'backgroundImage:url(' + btnsrc + ')'" v-show="btnclass==true" -->
      <p class="intro">{{info.text}}</p>
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
    ifCheck:Number,

  },
  data() {
    return {
        boxidx:0,
        show:true,
        // btnname:"button"
    };
  },
  computed: {
    boxindex: function() {
      return "box" + this.index;
    },
    // btnclass: function () {
    //   // var now=sessionStorage.getItem('choose');
    //   // window.console.log(now);
    //   if(this.info.index==this.ifCheck){
    //     return false
    //   }else{
    //     return true
    //   }
    // }
    btnname: function () {
      // var now=sessionStorage.getItem('choose');
      // window.console.log(1);
      if(this.info.index==this.ifCheck){
        return "button_active"
      }else{
        return "button"
      }
    }
    // ifSelected:function () {
    //   var now=sessionStorage.getItem('choose');
    //   if(this.index==Number(now)){
    //     // this.btnsrc="../assets/img/slected.png";
    //     return  this.ifSelected=true;
    //   }else{
    //     // this.btnsrc="../assets/img/void.png";
    //     return  this.ifSelected=false;
    //   }
    // },
  },
  mounted() {
    this.$refs.audio.src = this.info.audiosrc;
  },
    methods: {
    change(){
      sessionStorage.setItem('choose',this.info.index);
      // this.$parent.$emit('goback',this.info.index);
    this.$emit('goback',this.info.index);
    // this.ifCheck=this.info.index;
    // this.btnname="button_active"
      // alert('change:'+this.info.index);
    //   var btnname="btn"+this.info.index;
    //   this.$refs.btnname
    },
    control(){

    }
  },
};
</script>
<style>
.icon-container:hover {
  box-shadow: 0px 1px 8px 1px #ded5d5;
  border-radius: 2rem;
}
.icon-container {
  background-image: url(https://cn.bing.com/th?id=OIP.SierodiUS4Sz4Is_WSARdgHaDP&pid=Api&rs=1);
  background-size: 100%;
  height: 25vw;
  width: 25vw;
  margin: 0;
  margin-top: 2.5vw;
  float: left;
  border-radius: 8px;
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
    margin-left: -7px;
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
.button_active{
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
.info {
  margin-left: 40%;
}
.intro {
  text-align: left;
      white-space: normal;
    /* width: 36vw; */
    height:10vw;
    margin-top: 2vw;
    overflow: scroll;
    margin-bottom: 2vw;
      font-family: "Microsoft YaHei";
  color: rgb(60, 13, 4);
  font-size: 4vw !important;

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
h2.name{
    font-family: "STYuanti";
    color: rgb(60, 13, 4);
    font-weight: 400;
}
</style>