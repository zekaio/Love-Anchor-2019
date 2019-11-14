<template>
    <div id="card" :user='info.index' class="cardbox">
        <div class="icon-container" :id="boxindex" :style="'backgroundImage:url(' + info.iconsrc + ')'">
            <audio ref="audio" 
             :src="info.audiosrc" 
             preload="none"
            autoplay="false"
            controlsList="nodownload"
            oncontextmenu="return false"
            >
            </audio>
        </div>
        <div class="info">
        <h1 class="name" :id='info.index'>{{info.index}}号</h1>
        <h2 class="name">{{info.name}}</h2>
        <span class="piao">{{info.num}}票</span>
        <div class="button">
            <input ref="vote" id="vote" class="vote-btn" type="radio" value="投票">
        </div>
        <p class="intro">{{info.text}}</p>
        </div>
    </div>
</template>
<script>
export default {
    name:"card",
    props: {
        info:Object,
        index:Number,
        name:String,
        num:Number,
        text:String,
        iconsrc:String,
        audiosrc:String
    },
    data() {
        return {
        }
    },
    computed: {
        boxindex:function () {
            return "box"+this.index;
        }
    },
    mounted(){
        this.$refs.audio.src=this.info.audiosrc;
    }
}
</script>
<style>
.icon-container:hover {
    box-shadow: 0px 1px 8px 1px #ded5d5;
    border-radius: 2rem;
}
.icon-container{
    background-image: url(https://cn.bing.com/th?id=OIP.SierodiUS4Sz4Is_WSARdgHaDP&pid=Api&rs=1);
    background-size: 100%;
    background-repeat: no-repeat;
    height: 100%;
    width: 40%;
    margin: 0;
    float: left;
	}
	.cardbox {
    width: 100%;
    height: 30vw;
    margin-bottom: 20px;
}
.name {
    margin: 0;
    padding: 0;
    text-align: left;
    float: left;
    font-size: 5vw;
}
.piao {
    float: left;
    font-size: 3vw;
    margin: 0;
    padding: 0;
    margin-top: 10px;
    margin-left: 10px;
}
.button{
display: block;
    margin: 0;
    width: 20vw;
    float: right;
    height: 20vw;
}
</style>