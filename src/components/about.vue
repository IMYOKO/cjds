<template>
  <div v-show="showpType" class="ds-alerts-box">
    <div class="ds-alerts-title1 clear_box">
      <div class="ds-popularize-btn ds-popularize-btn-active">长江单双</div>
      <span class="ds-alert-close" @click="dsAlertClose">关闭</span>
    </div>
    <div class="ds-alerts-cont clear_box">
      <div class="float_left ds-js-cont">
        <table class="ds-tg-table" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>
              推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励
            </td>
          </tr>
          <tr>
            <td>
              推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励
            </td>
          </tr>
          <tr>
            <td>
              推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励
            </td>
          </tr>
        </table>
        <table class="ds-tg-table" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>
              推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励
            </td>
          </tr>
          <tr>
            <td>
              推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励
            </td>
          </tr>
          <tr>
            <td>
              推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励
            </td>
          </tr>
        </table>
        <table class="ds-tg-table" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>
              推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励
            </td>
          </tr>
          <tr>
            <td>
              推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励
            </td>
          </tr>
          <tr>
            <td>
              推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励推广奖励
            </td>
          </tr>
        </table>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    props: ['helpShow'], // 父组件传入数据， 数组形式,type类别
    data () {
      return {
        showpType:'',
      }
    },
    created(){
    },
    methods: {
      dsAlertClose(){
        this.$emit('showHelp',false);
        this.$emit('isShow',true);
      },
    },
    mounted: function () {
      if (this.helpShow){
        this.showpType = true;
      }else {
        this.showpType = false;
      }
    },
    // 更新的时候运动
    updated: function () {
    },
    watch: {
      helpShow(val) {
        this.showpType = val
      },
    }
  }
</script>
<style scoped>
  .ds-alerts-box{ width: 70%; left: 50%; margin-left: -35%; top: 20%; position: fixed;}
  .ds-alerts-title1{ text-align: center; background-color: #1f110e; color: #ffffff;}
  .ds-alerts-cont{ background-color: #0a0605;}
  .ds-popularize-btn{ padding: 0 20px; float: left; cursor: pointer;}
  .ds-popularize-btn-active{ background-color: #5b3e30;}
  .ds-js-cont{ width: 100%; overflow: auto; max-height: 500px; color: #ffffff;}
  .ds-js-cont td{ font-weight: bold; line-height: 30px; padding: 15px;}
</style>
