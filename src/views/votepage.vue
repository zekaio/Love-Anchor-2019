<template>
  <div id="votepage">
    <van-overlay class="up" :show="showLoading">
      <div class="loading_wrapper up" @click.stop>
        <van-loading size="50px" text-size="16px" vertical
          >加载中...</van-loading
        >
      </div>
    </van-overlay>
    <div style="height: 0;visibility:hidden;">placeholder</div>
    <div id="cardcontain">
      <card
        v-for="(value, key, index) in test"
        :info="value"
        :key="index"
        :Player="Player"
        @goback="choose"
        @changePlayer="changePlayer"
        :ifCheck="ifCheck"
      >
      </card>
    </div>
    <div style="margin:3vh 0;">向下滑动查看更多选手</div>
    <div style="position: relative; width: 40vw; margin: auto;">
      <div
        style="position: absolute;z-index: 100;left: 0;right: 0;top: 0;bottom: 0;opacity: 0;"
        @click="submit"
      ></div>
      <img
        style="display: block; width: 100%;"
        src="../assets/img/confirm.png"
      />
    </div>

    <div id="attention">{{ errmsg }}</div>
    <!-- <img src="../assets/img/confirm.png" style="height: 0;visibility:hidden;" /> -->

    <!-- <div id="bottom2"></div> -->
  </div>
</template>
<script>
import card from '../components/card';
// import I from '../components/I';
import { posturl, show, phpurl } from '../js/config'; //show,login,getinfo
import { Toast } from 'vant';
import selected from '../assets/img/selected.png';
import stop from '../assets/img/stop.png';

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
      errmsg: '',
      showLoading: false,
    };
  },
  components: {
    card,
    // I,
  },
  async mounted() {
    this.axios(show)
      .then((res) => {
        this.test = Object.values(res.data);
        sessionStorage.setItem('line1', '');
        sessionStorage.setItem('line2', '');
        // if (res.response.status == 401) {
        //   window.location.href = phpurl;
        // }
      })
      .catch(function(error) {
        // window.console.log(error);
        if (error.response.status === 401) {
          window.location.href = phpurl;
          return;
        }
        Toast.fail({
          message: `${error.response.status}: 服务器错误，请稍后重试`,
        });

        // sessionStorage.setItem('line2', '似乎网络出错了');
        // sessionStorage.setItem('line1', '请稍候再试');
        // this.$router.push('/alert');
      });

    let c = new Image();
    c.src = selected;
    let s = new Image();
    s.src = stop;
  },
  computed: {},
  watch: {
    ifCheck: function() {
      this.errmsg = '你选择的是第' + this.ifCheck + '号选手';
      // if(this.Player!=this.ifCheck){
      // document.querySelector("#audio" + this.Player).pause();
      // }
    },
    immediate: true,
  },
  methods: {
    changePlayer(newName) {
      var oldName = this.Player;
      if (newName == oldName) {
        newName = 0;
      }
      this.Player = newName;
      if (oldName != 0) {
        document.querySelector('#audio' + oldName).pause();
      }
      if (oldName != newName) {
        if (newName != 0) {
          document.querySelector('#audio' + newName).play();
        }
        if (oldName != 0) {
          document.querySelector('#audio' + oldName).currentTime = 0;
        }
      }
    },
    choose(value) {
      // document.querySelector("#audio" + this.Player).pause();
      this.ifCheck = value;
      // this.Player = value;
      //    for(var i=1;i<=document.getElementsByTagName('audio').length+1;i++){
      //document.querySelector("#audio" + i).pause();
      //
      this.ifClick = false;
    },
    submit() {
      this.errmsg = '';
      if (this.ifCheck == 0 || this.ifCheck == undefined) {
        Toast.fail({
          message: '请选择选手',
        });
        // this.errmsg = '请选择选手！';
        return;
      }
      if (this.ifClick == true) {
        this.errmsg = '点太快啦！';
        return;
      }
      this.ifClick = true;
      if (this.ifCheck != 0) {
        const vote = {
          //提交索引
          method: 'POST',
          data: this.ifCheck,
          transformRequest: [
            function(data) {
              data = JSON.stringify(data);
              return data;
            },
          ],
          url: posturl + this.ifCheck,
        };
        this.showLoading = true;
        let timeout = setTimeout(() => {
          this.showLoading = false;
        }, 7000);
        this.axios(vote)
          .then((res) => {
            window.console.log(res);
            // if (res.status===401) {
            //   window.location.href = phpurl;
            // }
            this.showLoading = false;
            clearTimeout(timeout);

            if (res.data.errcode != 0) {
              Toast.fail({
                message: res.data.errmsg,
              });
              // this.$router.push('/alert');
            } else {
              this.test[this.ifCheck - 1].number++;
              Toast.success({ message: '感谢投票' });
              // this.errmsg = '感谢投票！';
            }
            // console.log('aaa');
            this.ifClick = false;

            // else {
            //   this.errmsg = res.data.errmsg;
            // }
          })
          .catch(function(error) {
            this.showLoading = false;
            clearTimeout(timeout);

            if (error.response) {
              // 服务器返回正常的异常对象
              // window.console.log(error.response.data);
              this.errmsg = '请求中……';
              if (error.response.status === 401) {
                window.location.href = phpurl;
              }
              this.errmsg = error.response.data;
            } else {
              // 服务器发生未处理的异常
              this.errmsg = error.message;
            }
            window.console.log(error.config);
            this.ifClick = true;
          });
      }
    },
  },
};
</script>
<style scoped>
h1,
h2,
p {
  user-select: none !important;
}
/* #votepage {
  padding-top: 10%; 
} */
.up {
  z-index: 10000;
}
.loading_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
#votepage {
  zoom: 1 !important;

  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-top: 0;
  width: 100%;
  background-size: cover;
  height: 100vh;
  background-image: url('../assets/img/bg.jpg');
}
#cardcontain {
  height: 65vh;
  /* height: 100vw; */
  margin-top: 8vh;
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
  height: 100%;
}
#final-btn {
  background-image: url('../assets/img/confirm.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  height: 12vw;
}
#attention {
  font-size: 3.2vw;
  margin-top: 1vh;
  font-family: 'STYuanti';
  color: rgb(169, 60, 39);
  line-height: 1.667;
  white-space: normal;
  overflow-x: scroll;
  margin-left: 25%;
  width: 50%;
  white-space: pre;
}
/* #bottom2 {
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
} */
</style>
