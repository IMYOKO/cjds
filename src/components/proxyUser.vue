<template>
    <div class="pop-up-window">
        <div class="pop-up-window-wrapper proxyuser-message-wrapper">
            <div class="pop-up-header">
                <div class="pop-up-box">
                  <span :class="{active: type === 0}" @click="upType(0)">我的代理</span>
                  <span :class="{active: type === 3}" @click="upType(3)">我的会员</span>
                  <span :class="{active: type === 1}" @click="upType(1)">加入代理</span>
                  <span :class="{active: type === 2}" @click="upType(2)">我的二维码</span>
                </div>
                <span class="closed-btn" @click="updateModal(false)">关闭</span>
            </div>
            <div class="pop-up-body">
                <div class="proxyuser-message-content">
                    <div class="proxyuser-message-content-box">

                        <div class="proxy-user-box" v-if="type === 0">
                          <table>
                            <tr>
                              <td>代理会员类型：</td>
                              <td>代理特码分红：</td>
                              <td>特码划分比率：</td>
                              <td>特码分红比率：</td>
                            </tr>
                            <tr>
                              
                              <td>{{myDlData.TypeText}}</td>
                              <td>{{myDlData.Profit}}</td>
                              <td>{{myDlData.Divide}}</td>
                              <td>{{myDlData.Dividends}}</td>
                            </tr>
                          </table>
                          <table>
                            <tr>
                              <td>下级会员人数：</td>
                              <td>下级有效会员人数：</td>
                              <td>下级有效人数：</td>
                              <td>所有下级有效下注金额：</td>
                            </tr>
                            <tr>
                              <td>{{myDlData.Sub}}</td>
                              <td>{{myDlData.SubActive}}</td>
                              <td>{{myDlData.SubLot}}</td>
                              <td>{{myDlData.SubBet}}</td>
                            </tr>
                          </table>
                          <table>
                            <tr>
                              <td>所有下级利润总和：</td>
                              <td>最后分红时间：</td>
                              <td>当月交的保证金：</td>
                              <td>保证金余额：</td>
                            </tr>
                            <tr>
                              <td>{{myDlData.SubProfit}}</td>
                              <td>{{myDlData.DividendsDate}}</td>
                              <td>{{myDlData.Margin}}</td>
                              <td>{{myDlData.MarginBalance}}</td>
                            </tr>
                          </table>
                          <table>
                            <tr>
                              <td>最近保证金交款时间：</td>
                              <td>占成代理停止时间：</td>
                              <td>占成比率：</td>
                              <td>停止占成人数：</td>
                            </tr>
                            <tr>
                              <td>{{myDlData.MarginDate}}</td>
                              <td>{{myDlData.MarginDateEnd}}</td>
                              <td>{{myDlData.Percentage}}</td>
                              <td>{{myDlData.EndLot}}</td>
                            </tr>
                          </table>
                          <table>
                            <tr>
                              <td>审核结果：</td>
                              <td>审核时间：</td>
                              <td>修改时间：</td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>{{myDlData.AuditText}}</td>
                              <td>{{myDlData.AuditDate}}</td>
                              <td>{{myDlData.EditDate}}</td>
                              <td></td>
                            </tr>
                          </table>
                        </div>

                        <div class="my-vip" v-if="type === 3">
                          <table>
                            <tr>
                              <td>ID</td>
                              <td>用户名</td>
                              <td>昵称</td>
                              <td>手机号</td>
                            </tr>
                            <tr v-for="(item, index ) in list" :key="index">
                              <td>{{item.Id}}</td>
                              <td>{{item.UserName}}</td>
                              <td>{{item.NickName}}</td>
                              <td>{{item.Phone}}</td>
                            </tr>
                          </table>
                          <div class="total">
                            <span @click="getMoreList" v-if="page < totalPage">显示更多</span>
                            <span v-else>暂无更多</span>
                          </div>
                        </div>

                        <div class="join-vip" v-if="type === 1">
                          <div class="join-vip-box">
                            <div class="join-vip-box-item">
                              <span>代理人ID：</span>
                            </div>
                            <div class="join-vip-box-item">
                              <input type="text" maxlength="16" v-model="proxyId" placeholder="请输入代理人ID">
                            </div>
                            <div class="join-vip-box-item">
                              <div class="button" @click="joinProxy">确认</div>
                            </div>
                          </div>
                        </div>

                        <div class="v-code" v-if="type === 2">
                          <div class="v-code-box">
                            <div class="title">ID: {{userId}}</div>
                            <img width="140px" :src="qrcodeurl"  v-if="qrcodeurl" alt="" />
                          </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import { GetZNX, getProxy, joinProxy, getSubUser } from "../common/api";
const QR = require('@/utils/qrcode.js');
export default {
  props: {
    userId: String | Number
  },
  data() {
    return {
      type: 0,
      show: false,
      list: [],
      proxyId: '',
      page: 1,
      rows: 20,
      list: [],
      total: 0,
      totalPage: 0,
      myDlData: {
        Audit: 0,
        AuditDate: "",
        AuditUsderId: 0,
        Divide: 0,
        DivideBalance: 0,
        Dividends: 0,
        DividendsDate: "",
        EditDate: "",
        EditUserId: null,
        EndLot: 0,
        Id: null,
        Margin: 0,
        MarginBalance: 0,
        MarginDate: "",
        MarginDateEnd: "",
        Percentage: 0,
        Profit: 0,
        Sub: 0,
        SubActive: 0,
        SubBet: 0,
        SubLot: 0,
        SubProfit: 0,
        Type: null,
        UserId: null,
        UserName: "",
        TypeText: "",
        AuditText: ""
      }
    };
  },
  mounted() {
    this.generateQR(this.userId)
    this.getProxy()
    this.getSubUser()
  },
  methods: {
    upType(type) {
      this.type = type
    },
    updateModal(flag) {
      this.$emit('showtProxyUser', flag)
    },
    async generateQR(text) {
      try {

					const qrcodeurl = await QR.createQrCodeImg(text)
					this.qrcodeurl = qrcodeurl
				} catch (err) {
					console.error(err)
				}
    },
    async joinProxy() {
      if (this.proxyId == '') {
        Toast('请输入代理人ID')
        return
      }
      if (this.proxyId === this.userId) {
        Toast('代理用户和用户不能为同一人')
        return
      }
      try {
        const res = await joinProxy({
          proxyId: this.proxyId,
          userId: this.userId
        })
        Toast('操作成功')
      } catch (e) {
        Toast(e.Log)
        console.log(e)
      }
    },
    async getSubUser() {
      try {
        const resData = await getSubUser(this.userId, this.page, this.rows)
        const res = resData.Data
        res.rows.map(item => {
          this.list.push(item)
        })
        this.total = res.total
        if(res.total > 0) {
          this.totalPage = Math.ceil(this.total / this.rows)
        }
      } catch (err) {
        console.error(err)
      }
    },
    async getProxy() {
      try {
        const resData = await getProxy(this.userId)
        const res = resData.Data
        console.log(res)
        if(!res) {
          return
        }
        if(res.Type === 1) {
          res.TypeText = '分红代理'
        }
        if(res.Type === 2) {
          res.TypeText = '合伙人代理'
        }
        if(res.Type === 3) {
          res.TypeText = '合伙人转分红'
        }
        if(res.Audit === 0) {
          res.AuditText = '未审核'
        }
        if(res.Audit === 1) {
          res.AuditText = '审核通过'
        }
        if(res.Audit === 2) {
          res.AuditText = '审核未通过'
        }
        this.myDlData = res
      } catch (err) {
        console.error(err)
      }
    }
  }
};
</script>

<style lang="less" scoped>
.proxyuser-message-wrapper {
  .pop-up-box {
    span {
      cursor: pointer;
      font-size: 16px;
      padding: 0 12px;
      display: block;
      float: left;

      &:hover,
      &.active {
        background-color: #5b3e30;
      }
    }
  }
  .proxyuser-message-content {
    padding: 10px 0;

    &-box {
      color: #fff;
      font-size: 12px;
      height: 320px;
      overflow-y: auto;

      .no-data,
      .total {
        text-align: center;
        color: #fff;
        opacity: 0.5;

        span {
          font-size: 12px;
        }
      }

      .my-vip ,
      .proxy-user-box {
        padding: 0 10px;
        table {
          width: 100%;
          display: table;
          tr {
            background-color: rgba(255, 255, 255, 0.2);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);

            &:first-child {
              background-color: rgba(255, 255, 255, 0.1);
            }
            td {
              font-size: 14px;
              line-height: 1.5;
              padding: 4px 0;
              text-align: center;
              border-right: 1px solid rgba(255, 255, 255, 0.2);
            }
          }
        }
      }

      .proxy-user-box {
        table {
          tr {
            td {
              width: 25%;
            }
          }
        }
      }

      .join-vip {
        padding-top: 40px;
        display: flex;
        justify-content: center;
        &-box {
          padding: 20px 0;
          width: 40%;
          &-item {
            >span {
              font-size: 16px;
            }
            input {
              color: #fff;
              width: calc(100% - 20px);
              border: none;
              background: none;
              outline:none;
              box-shadow: none;
              border: 1px solid #676767;
              padding: 5px 10px;
            }
            .button {
              font-size: 16px;
              color: #000;
              text-align: center;
              height: 34px;
              line-height: 34px;
              background: #00d257;
              cursor: pointer;
              margin-top: 20px;
            }
          }
        }
      }

      .v-code {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
