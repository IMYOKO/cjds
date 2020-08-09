<template>
  <div class="video-player-wrapper">
    <video-player ref="video" :options="videoOptions" />
  </div>
</template>

<script>
import VideoPlayer from "./videoJs";

export default {
  name: "VideoExample",
  props: {
    width: Number,
    height: Number,
  },
  components: {
    VideoPlayer
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: false,
        muted: true,
        width: this.width, // 667
        height: this.height, // 372
        preload: 'auto',
        sources: [
          {
            type: "rtmp/flv",
            src: "rtmp://58.84.7.20:1935/hls/hls"
          }
        ],
        techOrder: ["flash"]
      }
    };
  },
  mounted() {
    this.$nextTick(()=>{
      console.log(this.$refs.video)
      // this.$refs.video.play()
    })
  }
};
</script>

<style lang="less" scoped>
.video-player-wrapper {
  width: 667px;
  height: 372px;
}
</style>
