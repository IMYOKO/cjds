<template>
  <div class="video-player-wrapper">
    <video-player :options="videoOptions" />
  </div>
</template>

<script>
import VideoPlayer from "./videoJs";

export default {
  name: "VideoExample",
  components: {
    VideoPlayer
  },
  data() {
    return {
      videoOptions: {
        autoplay: true,
        controls: false,
        muted: true,
        width: 667,
        height: 372,
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
  }
};
</script>

<style lang="less" scoped>
.video-player-wrapper {
  width: 667px;
  height: 372px;
}
</style>
