<template>
  <div v-show="showpType" class="ds-alerts-box">
    <div class="ds-alerts-title1 clear_box">
      <div class="ds-popularize-btn ds-popularize-btn-active">游戏规则</div>
      <span class="ds-alert-close" @click="dsAlertClose">关闭</span>
    </div>
    <div class="ds-alerts-cont clear_box">
      <div class="float_left ds-js-cont">
        <table class="ds-tg-table" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>
              一、点数计算：两颗骰子相加之和
            </td>
          </tr>
          <tr>
            <td>
              二、路单：单数显示为蓝色，双数显式为红色。例如2:3即显示蓝色；1:5即显示红色。
            </td>
          </tr>
          <tr>
            <td>
              三、下注单、双、吃单数和吃双数：下注单、双、吃单数和吃双数时。开出1:2，则单赢70%，双输；开出1:3则双赢70%，单输。
            </td>
          </tr>
        </table>
        <table class="ds-tg-table" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>
              四、特码规则：
            </td>
          </tr>
          <tr>
            <td>
              1:4，1:5，1:6，2:3，2:4，2:5，2:6，3:4，3:5，3:6，4:5，4:6，5:6
            </td>
          </tr>
          <tr>
            <td>
              开出以上任意牌型赔率1:11
            </td>
          </tr>
        </table>
        <table class="ds-tg-table" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>
              开出对子，如1:1，2:2，3:3，4:4，5:5，6:6则赔率1:18
            </td>
          </tr>
          <tr>
            <td>
              如开出1:2，1:3特码时，则赔率1：12
            </td>
          </tr>
          <tr>
            <td>
              下注并盈利特码不抽水
            </td>
          </tr>
        </table>
        <table class="ds-tg-table" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>
              五、押单，押双，押吃单数，押吃双数： 押单，押双，押吃单数，押吃双数，赔率均为1:1。
            </td>
          </tr>
          <tr>
            <td>
              六、吃单数和吃双数： 本金范围内可押注吃单数或者吃双数。当开单数时，则吃单数输，吃双数赢。当开双数时，吃双数输吃单数赢。
            </td>
          </tr>
          <tr>
            <td>
              七、开奖结果以现场视讯显示为准。
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
