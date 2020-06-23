<template>

  <div id="ds-vd-box" class="ds-vd-box" @click="playVideo">
    <video :src="url" id="videoPlay" v-show="true" class="video" muted style="width:100%; height:100%; object-fit: fill;">您的浏览器不支持 video 视屏播放。</video>
  </div>
</template>
<script>
  export default {
    props: ['videoUrl'], // 父组件传入数据， 数组形式,type类别
    data () {
      return {
        url: '',
      }
    },
    created(){
    },
    methods: {
      playVideo(){
        var vdo = document.getElementById("videoPlay");
        vdo.currentTime=50;//开始播放的时间 s
        if(vdo.paused){  //判断是否处于暂停状态
          vdo.play();  //开启播放
        }else{
          vdo.pause();  //停止播放
        }
      },
    },
    mounted: function () {
      var that = this;
      if (this.videoUrl){
        this.url = this.videoUrl;
      }
    },
    // 更新的时候运动
    updated: function () {
    },
    watch: {
      videoUrl(val) { //即为父组件的值，val参数为值
        this.url = val //将父组件的值赋给子组件的值
      },
    }
  }
</script>
<style scoped>
  .ds-alerts-box{ width: 560px; left: 50%; margin-left: -280px; top: 25%; position: fixed;}
  .ds-alerts-title1{ padding-left: 50px; text-align: center; font-weight: bold; background-color: #1f110e; color: #ffffff;}
  .ds-alerts-cont{ background-color: #553d31; padding: 30px 120px;}
  .ds-alerts-cont input{ padding: 0 50px; margin-bottom: 25px; outline: none; text-align: center; color: #ffffff; height: 42px; border-radius: 42px; background-color: #1f110e; border: 0;}
  .ds-alerts-ok,.ds-alerts-cancel{ width: 40%; text-align: center; height: 34px; border-radius: 34px; line-height: 34px; color: #1f110e; font-size: 18px; cursor: pointer;}
  .ds-alerts-ok{ background-color: #cccccc;}
  .ds-alerts-cancel{ background-color: #c38f53;}
</style>
