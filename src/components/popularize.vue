<template>
  <div v-show="showpType" class="ds-alerts-box">
    <div class="ds-alerts-title1 clear_box">
      <div @click="pactiveFn(1)" :class="pactive==1?'ds-popularize-btn ds-popularize-btn-active':'ds-popularize-btn'">全民推广</div>
      <div @click="pactiveFn(2)" :class="pactive==2?'ds-popularize-btn ds-popularize-btn-active':'ds-popularize-btn'">推广奖励</div>
      <span class="ds-alert-close" @click="dsAlertClose">关闭</span>
    </div>
    <div v-show="pactive==1" class="ds-alerts-cont clear_box">
      <div class="ds-p-1-cont float_left">
        <table class="ds-tg-table" cellpadding="0" cellspacing="0" width="100%">
          <tr><td></td></tr>
          <tr>
            <td class="ds-tg-icon ds-tg-icon1">
              昨日总奖励：<span>22.00</span>
            </td>
          </tr>
          <tr>
            <td class="ds-tg-icon ds-tg-icon1">
              昨日直属玩家奖励：<span>22.00</span>
            </td>
          </tr>
          <tr>
            <td class="ds-tg-icon ds-tg-icon1">
              昨日其他玩家奖励：<span>22.00</span>
            </td>
          </tr>
          <tr>
            <td class="ds-tg-icon ds-tg-icon2">
              直属玩家人数：<span>22.00</span>
            </td>
          </tr>
          <tr>
            <td class="ds-tg-icon ds-tg-icon2">
              其他玩家人数：<span>22.00</span>
            </td>
          </tr>
          <tr>
            <td class="ds-tg-icon ds-tg-icon1">
              历史总奖励：<span>22.00</span>
            </td>
          </tr>
          <tr><td></td></tr>
        </table>
      </div>
      <div class="ds-p-1-cont float_left ds-code">
        <img src="../../static/ds/code-s_03.jpg" alt="">
        <div class="ds-code-btn">左键点击二维码保存并分享</div>
      </div>
    </div>
    <div v-show="pactive==2" class="ds-alerts-cont clear_box">
      <div class="ds-p-1-cont float_left ds-js-cont clear_box" style="width: 100%;">
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
    props: ['popularizeShow'], // 父组件传入数据， 数组形式,type类别
    data () {
      return {
        showpType:'',
        pactive:1,
      }
    },
    created(){
    },
    methods: {
      dsAlertClose(){
        this.$emit('showPopularize',false);
      },
      pactiveFn(type){
        if(type){
         this.pactive = type;
        }
      },
    },
    mounted: function () {
      if (this.popularizeShow){
        this.showpType = true;
      }else {
        this.showpType = false;
      }
    },
    // 更新的时候运动
    updated: function () {
    },
    watch: {
      popularizeShow(val) {
        this.showpType = val
      },
    }
  }
</script>
<style scoped>
  .ds-alerts-box{ width: 730px; left: 50%; margin-left: -365px; top: 25%; position: fixed;}
  .ds-alerts-title1{ text-align: center; background-color: #1f110e; color: #ffffff;}
  .ds-alerts-cont{ background-color: #0a0605;}
  .ds-popularize-btn{ padding: 0 20px; float: left; cursor: pointer;}
  .ds-popularize-btn-active{ background-color: #5b3e30;}
  .ds-p-1-cont{ width: 50%;}
  .ds-tg-table td{ padding: 0px 15px; height: 46px; color: #fecc8f; background-color: #161616; font-size: 18px;}
  .ds-tg-table tr:nth-child(2n) td{ background-color: #1f1f1f;}
  .ds-tg-table span{ float: right;}
  .ds-code{ text-align: center;}
  .ds-code img{ display: inline-block; margin-top: 30px; width: 250px;}
  .ds-code-btn{ width: 80%; font-size: 16px; height: 40px; line-height: 40px; cursor: pointer; background-color: #000000; color: #fecc8f; border: 1px solid #fecc8f; display: inline-block; border-radius: 40px;}
  .ds-js-cont{ width: 100%!important;}
  .ds-js-cont td{ font-weight: bold; line-height: 30px; padding: 15px;}
</style>
