<template>
  <div v-show="showpType" class="ds-alerts-box">
    <div class="ds-alerts-title1 clear_box">
      {{wTypes?'充值':'提现'}}
      <span class="ds-alert-close" @click="dsAlertClose">关闭</span>
    </div>
    <div class="ds-alerts-cont clear_box">
      <div v-if="!wTypes" class="ds-p-1-cont float_left ds-text-center">
        <div class="ds-tx-bg">
          <div class="contener-box clear_box">
            <span class="ds-tx-ye float_left">余额 (元)</span>
            <span class="ds-tx-ye-text float_right">{{infoArr.UserName}}</span>
          </div>
          <div class="contener-box ds-text-center ds-tx-contx">{{infoArr.Banlance}}</div>
          <div class="contener-box clear_box">
            <div class="ds-tx-ls float_left">提现所需流水 (元)
              <br>
              {{infoArr.WithdrawalLS}}
            </div>
            <div class="ds-tx-ls float_left">当前流水 (元)
              <br>
              {{infoArr.WithdrawalDQLS}}
            </div>
          </div>
          <div class="contener-box clear_box" style="margin-top: 25px;">
            <div class="ds-tx-ls float_left">已提现金额 (元)
              <br>
              {{infoArr.YTXMoney}}
            </div>
            <div class="ds-tx-ls float_left">提现中金额 (元)
              <br>
              {{infoArr.TXZMoney}}
            </div>
          </div>
        </div>
      </div>
      <div v-if="!wTypes" class="ds-p-1-cont float_left">
        <table class="ds-tg-table" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td>请填写／选择 持卡人银行卡信息：</td>
          </tr>
          <tr>
            <td>
              开户姓名：
              <input type="text" v-model="Name">
            </td>
          </tr>
          <tr>
            <td>
              银行名称：
              <select v-model="Bankname">
                <option value="中国银行">中国银行</option>
                <option value="中国农业银行">中国农业银行</option>
                <option value="中国工商银行">中国工商银行</option>
                <option value="中国建设银行">中国建设银行</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>
              所属支行：
              <input v-model="Zh" type="text">
            </td>
          </tr>
          <tr>
            <td>
              银行卡号：
              <input v-model="Bankno" type="text">
            </td>
          </tr>
          <tr>
            <td>
              提现金额：
              <input v-model="Money" type="text">
            </td>
          </tr>
          <tr>
            <td>
              提款密码：
              <input v-model="Tkmm" type="password">
            </td>
          </tr>
        </table>
      </div>
      <div v-if="wTypes" class="ds-p-1-cont float_left wtypes_s wtypes-wrapper">
        <div class="wtypes-content">
          <table class="ds-tg-table" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td colspan="2">请填写／选择信息：</td>
            </tr>
            <tr>
              <td>汇款方式：</td>
              <td>
                <select v-model="BankFS" @change="selectFn($event)">
                  <!-- <option value="">请选择汇款方式</option> -->
                  <option value="1">银行卡</option>
                  <!-- <option value="2">支付宝</option>
                  <option value="3">微信</option>-->
                </select>
              </td>
            </tr>
            <tr v-if="BanknameStatus">
              <td>汇款人姓名：</td>
              <td>
                <input type="text" v-model="Name">
              </td>
            </tr>
            <tr v-if="BanknameStatus">
              <td>汇款人银行：</td>
              <td>
                <select v-model="Bankname">
                  <option value="中国银行">中国银行</option>
                  <option value="中国农业银行">中国农业银行</option>
                  <option value="中国工商银行">中国工商银行</option>
                  <option value="中国建设银行">中国建设银行</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>充值金额：</td>
              <td>
                <input v-model="Money" type="text">
              </td>
            </tr>
          </table>
        </div>
        <div class="wtypes-content">
          <table class="ds-tg-table" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td colspan="2">收款方信息：</td>
            </tr>
            <tr>
              <td>开户银行：</td>
              <td>{{bankInfo.BankName}}</td>
            </tr>
            <tr>
              <td>开户支行：</td>
              <td>{{bankInfo.BankZH}}</td>
            </tr>
            <tr>
              <td>开户姓名：</td>
              <td>{{bankInfo.BankUserName}}</td>
            </tr>
            <tr>
              <td>银行卡号：</td>
              <td>
                {{bankInfo.BankNo}}
                <button class="clipboard" :data-clipboard-text="copyValue">复制</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="contener-box ds-text-center" style="background-color: #0a0605;">
      <div class="ds-tx-ok" @click="getAddWithdrawal">{{wTypes?'确认充值':'确认提现'}}</div>
    </div>
    <div
      v-if="yinhang"
      style="position: absolute; top: 30%; width: 50%; left: 15%; background-color: #d09a51; padding: 30px 10%; color: #fff;"
    >{{yinhang}}</div>
  </div>
</template>
<script>
import { AddWithdrawal, AddRecharge, GetBankInfo } from "../common/api";
import { Toast } from "mint-ui";
import Clipboard from "clipboard";
const clipboard = new Clipboard(".clipboard");
export default {
  props: ["withdrawalShow", "infoArrs", "wType"], // 父组件传入数据， 数组形式,type类别
  data() {
    return {
      yinhang: "",
      Name: "",
      Bankname: "中国银行",
      Zh: "",
      Bankno: "",
      Money: "",
      Tkmm: "",
      BankFS: "1",

      showpType: "",
      wTypes: "",
      infoArr: [],
      BanknameStatus: true,
      copyValue: "",
      bankInfo: { BankName: "", BankNo: "", BankUserName: "", BankZH: "" } // 银行卡信息
    };
  },
  methods: {
    dsAlertClose() {
      this.clearData();
      this.$emit("showWithdrawal", false);
    },
    clearData() {
      this.yinhang = "";
      this.Name = "";
      this.Bankname = "中国银行";
      this.Zh = "";
      this.Bankno = "";
      this.Money = "";
      this.Tkmm = "";
      this.BankFS = "1";

      this.showpType = "";
      this.wTypes = "";
      this.infoArr = [];
      this.BanknameStatus = true;
      this.copyValue = "";
      this.bankInfo = {
        BankName: "",
        BankNo: "",
        BankUserName: "",
        BankZH: ""
      };
    },
    selectFn(e) {
      if (e.target.value == 1) {
        this.BanknameStatus = true;
      } else {
        this.BanknameStatus = false;
      }
    },
    async GetBankInfo() {
      try {
        const res = await GetBankInfo();
        this.bankInfo = res.Data;
        this.copyValue = res.Data.BankNo;
      } catch (error) {}
    },
    getAddWithdrawal() {
      if (!this.wTypes) {
        if (this.Name && this.Zh && this.Bankno && this.Money && this.Tkmm) {
          let json = {
            Name: this.Name,
            Bankname: this.Bankname,
            Zh: this.Zh,
            Bankno: this.Bankno,
            Money: this.Money,
            Tkmm: this.Tkmm
          };
          AddWithdrawal(json).then(res => {
            console.log(res);
            if (res.Status) {
              Toast("提现申请已提交！");
            } else {
              Toast(res.Log);
            }
          });
        } else {
          Toast("所有信息都为必填项!");
        }
      } else {
        if (
          (that.Name && that.BankFS == 1 && that.Money) ||
          (that.BankFS != 1 && that.Money && that.BankFS)
        ) {
          var json = {};
          if (this.BanknameStatus) {
            json = {
              Name: that.Name,
              Bankname: that.Bankname,
              BankFS: that.BankFS,
              Money: that.Money,
              Type: that.BankFS
            };
          } else {
            json = {
              Name: "",
              Bankname: "",
              BankFS: that.BankFS,
              Money: that.Money,
              Type: that.BankFS
            };
          }
          AddRecharge(json).then(res => {
            if (res.Status) {
              // if (that.BanknameStatus) {
              //   that.yinhang = res.Data;
              // }
              Toast("充值已提交！");
            } else {
              Toast(res.Log);
            }
          });
        } else {
          Toast("所有信息都为必填项");
        }
      }
    }
  },
  mounted() {
    this.GetBankInfo();
    if (this.withdrawalShow) {
      this.showpType = true;
    } else {
      this.showpType = false;
    }
    clipboard.on("success", function(e) {
      Toast("复制成功！");
      console.log("sss");
      e.clearSelection();
    });
  },
  // 更新的时候运动
  updated: function() {},
  watch: {
    withdrawalShow(val) {
      this.showpType = val;
      this.GetBankInfo();
    },
    wType(val) {
      this.wTypes = val;
      this.showpType = val;
    },
    infoArrs(val) {
      this.infoArr = val;
      this.Name = "";
      this.Bankname = "";
      this.Zh = "";
      this.Bankno = "";
      this.Money = "";
      this.Tkmm = "";
    }
  }
};
</script>
<style lang="less" scoped>
.ds-alerts-box {
  width: 730px;
  left: 50%;
  margin-left: -365px;
  top: 25%;
  position: fixed;
}
.ds-alerts-title1 {
  padding-left: 65px;
  text-align: center;
  font-weight: bold;
  background-color: #1f110e;
  color: #ffffff;
}
.ds-alerts-cont {
  background-color: #0a0605;
}
.ds-popularize-btn {
  padding: 0 20px;
  float: left;
  cursor: pointer;
}
.ds-popularize-btn-active {
  background-color: #5b3e30;
}
.ds-p-1-cont {
  width: 50%;
}
.ds-tg-table td {
  padding: 0px 15px;
  height: 46px;
  color: #fecc8f;
  font-size: 14px;
}
.ds-tg-table input,
.ds-tg-table select {
  height: 30px;
  width: 200px;
  margin-left: 15px;
  border-radius: 28px;
  background-image: none;
  background-color: #151106;
  border: 1px solid #aeada8;
  color: #aeada8;
  font-size: 14px;
  padding-left: 15px;
  outline: none;
}
.ds-tg-table select {
  width: 220px;
  height: 34px;
  margin-left: 13px;
}
.ds-tx-ok {
  padding: 10px 50px;
  border-radius: 5px;
  margin: 20px 0;
  cursor: pointer;
  background-color: #19642b;
  color: #ffffff;
  font-weight: bold;
  line-height: initial;
  display: inline-block;
}
.wtypes_s td {
  padding: 0;
}
.wtypes-wrapper {
  width: 100%;
  display: flex;
  .wtypes-content {
    padding: 0 20px 0 40px;
  }
}
.clipboard {
  font-size: 12px;
  cursor: pointer;
  margin-left: 5px;
  border: none;
}
</style>
