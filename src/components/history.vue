<template>
  <div v-show="showpType" class="ds-alerts-box">
    <div class="ds-alerts-title1 clear_box">
      <div :class="{'ds-h-btn-active':topAc == '1','ds-popularize-btn ds-h-btn':1}" @click="dsHFn(1)">长江单双</div>
      <span :class="{'ds-h-btn-active':topAc == '2','float_left ds-h-btn':1}" @click="dsHFn(2)">上分</span>
      <span :class="{'ds-h-btn-active':topAc == '3','float_left ds-h-btn':1}" @click="dsHFn(3)">下分</span>
      <!-- <span :class="{'ds-h-btn-active':topAc == '4','float_left ds-h-btn':1}" @click="dsHFn(4)">返佣</span> -->
      <span class="ds-alert-close" @click="dsAlertClose">关闭</span>
    </div>
    <div class="ds-alerts-cont clear_box" style="background-color: #553d31;">
      <div class="ds-h-nav clear_box" style="line-height: 34px;">
        <span :class="{'ds-nav-btn-active':navAc == '1','float_left ds-h-btn ds-nav-btn':1}" @click="dsNavFn(1)">今天</span>
        <span :class="{'ds-nav-btn-active':navAc == '2','float_left ds-h-btn ds-nav-btn':1}" @click="dsNavFn(2)">昨天</span>
        <span :class="{'ds-nav-btn-active':navAc == '3','float_left ds-h-btn ds-nav-btn':1}" @click="dsNavFn(3)">近一周</span>
      </div>
      <div class="float_left ds-js-cont">
        <div class="block">

          <div class="container_table" v-if="topAc==1">
            <el-table class="el_table_ui" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
              <el-table-column prop="OrderId" width="200" label="注册单号"></el-table-column>
              <el-table-column prop="TableName" label="类别"></el-table-column>
              <el-table-column prop="JG" label="结果"></el-table-column>
              <el-table-column prop="PlayType" label="玩法"></el-table-column>
              <el-table-column prop="AddTime" width="200" label="下注时间"></el-table-column>
              <el-table-column prop="JYQMoney" label="交易前余额"></el-table-column>
              <el-table-column prop="XZMoney" label="下注余额"></el-table-column>
              <el-table-column prop="SY" label="输赢"></el-table-column>
              <el-table-column prop="Status" label="操作">
                <template slot-scope="scope">
                  <!-- <span class="caozuo" @click="revoke(scope.row)" v-if="scope.row.Status === 0">撤单</span> -->
                  <span v-if="scope.row.Status === 1">已开奖</span>
                  <!-- <span v-if="scope.row.Status === 2">已撤单</span> -->
                </template>
              </el-table-column>
            </el-table>
            <el-pagination class="el_page_ui"
               layout="total, prev, pager, next"
               @current-change="current_change"
               :page-size="pagesize"
               :total="total"
               background
            ></el-pagination>
          </div>

          <div class="container_table" v-if="topAc==2">
            <el-table class="el_table_ui" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
              <el-table-column prop="UserName" label="用户名"></el-table-column>
              <el-table-column prop="RName" label="汇款人姓名"></el-table-column>
              <el-table-column prop="RBankName" label="汇款银行"></el-table-column>
              <el-table-column prop="RBankFS" label="汇款方式" :formatter="hkfs"></el-table-column>
              <el-table-column prop="EndTime" width="200" label="处理时间"></el-table-column>
              <el-table-column prop="RMoney" label="充值金额"></el-table-column>
              <el-table-column prop="AddTime" label="充值时间"></el-table-column>
              <el-table-column prop="Status" label="状态" :formatter="sfStatus"></el-table-column>
              <el-table-column prop="RType" width="200" label="充值方式" :formatter="czfs"></el-table-column>
              <el-table-column prop="EndTime" label="处理时间"></el-table-column>
              <el-table-column prop="BZ" label="备注"></el-table-column>
            </el-table>
            <el-pagination class="el_page_ui"
               layout="total, prev, pager, next"
               @current-change="current_change"
               :page-size="pagesize"
               :total="total"
               background
            ></el-pagination>
          </div>

          <div class="container_table" v-if="topAc==3">
            <el-table class="el_table_ui" :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
              <el-table-column prop="Banlance" width="200" label="提现金额"></el-table-column>
              <el-table-column prop="Status" label="状态" :formatter="txstatus"></el-table-column>
              <el-table-column prop="AddTime" label="添加时间"></el-table-column>
              <el-table-column prop="BZ" label="备注"></el-table-column>
              <el-table-column prop="EndTime" width="200" label="处理时间"></el-table-column>
              <el-table-column prop="BankName" label="银行名"></el-table-column>
              <el-table-column prop="BankUserName" label="银行账户名"></el-table-column>
              <el-table-column prop="BankZHInfo" label="支行信息"></el-table-column>
              <el-table-column prop="BankNo" label="银行卡号"></el-table-column>
            </el-table>
            <el-pagination class="el_page_ui"
               layout="total, prev, pager, next"
               @current-change="current_change"
               :page-size="pagesize"
               :total="total"
               background
            ></el-pagination>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>
<script>
  import { GetWithdrawal, GetRecharge, Revoke } from "../common/api";
  import { Toast  } from 'mint-ui';
  export default {
    props: ['historyShow','historyArr'], // 父组件传入数据， 数组形式,type类别
    data () {
      return {
        showpType:'',
        topAc:1,
        navAc:1,

        total:1,//默认数据总数
        pagesize:7,//每页的数据条数
        currentPage:1,//默认开始页面
        istag: true,
        tableData: [],
      }
    },
    created(){
    },
    methods: {
      revoke(item) {
        const id = item.Id
        Revoke({id}).then((res)=>{
          if(res.Status){
            Toast('操作成功');
            this.dsNavFn(this.navAc)
          }else {
            Toast('操作失败');
          }
        })
      },
      getWithdrawal(){
        var dx = this.navAc;
        GetWithdrawal({DayType:dx}).then(res=>{
          console.log(res,'GetWithdrawal')
          if(res.Status && res.Code==200){
            this.tableData = res.Data;
          }else {
            Toast(res.msg);
          }
        });
      },
      getRecharge(){
        var dx = this.navAc;
        GetRecharge({DayType:dx}).then(res=>{
          console.log(res,'GetWithdrawal')
          if(res.Status && res.Code==200){
            this.tableData = res.Data;
          }else {
            Toast(res.msg);
          }
        });
      },
      switchChange(){
        this.istag = !this.istag ;
      },
      current_change:function(currentPage){
        this.currentPage = currentPage;
      },
      dsAlertClose(){
        this.topAc = 1
        this.navAc = 1
        this.$emit('historyShow',false,true);
      },
      dsHFn(type){
        var that = this;
        console.log(type)
        if(type){
          that.topAc = type;
        }
        if (type==2){
          that.getRecharge();
        }
        if (type==3){
          that.getWithdrawal();
        }
        if (type==4){
//          that.tableData==[];
        }
      },
      dsNavFn(type){
        var that = this;
        if(type){
          that.navAc = type;
          if (that.topAc == 1){
            this.$emit('historyShow',true,'',type);
          }
          else if (that.topAc == 2){
            that.getRecharge();
          }
          else if (that.topAc == 3){
            that.getWithdrawal();
          }
        }
      },
      sfStatus (row) {
        var txtx = '';
        if (row.Status==0){
          txtx = '提交'
        }
        else if (row.Status==1){
          txtx = '成功'
        }
        else if (row.Status==2){
          txtx = '失败'
        }
        return txtx;
      },
      czfs (row) {
        var txtx = '';
        if (row.RType==1){
          txtx = '银行卡'
        }
        else if (row.RType==2){
          txtx = '支付宝'
        }
        else if (row.RType==3){
          txtx = '微信'
        }
        return txtx;
      },
      txstatus (row) {
        var txtx = '';
        if (row.Status==0){
          txtx = '申请中'
        }
        else if (row.Status==1){
          txtx = '成功'
        }
        else if (row.Status==2){
          txtx = '失败'
        }
        return txtx;
      },
      hkfs (row) {
        var txtx = '';
        if (row.RBankFS==1){
          txtx = '银行卡'
        }
        else if (row.RBankFS==2){
          txtx = '支付宝'
        }
        else if (row.RBankFS==3){
          txtx = '微信'
        }
        return txtx;
      },
    },
    mounted: function () {
      if (this.historyShow){
        this.showpType = true;
      }else {
        this.showpType = false;
      }
    },
    // 更新的时候运动
    updated: function () {
    },
    watch: {
      historyShow(val) {
        this.showpType = val
      },
      historyArr(val) {
        this.total = val.length
        this.tableData = val
      },
    }
  }
</script>
<style lang='less' scoped>
  .ds-alerts-box{ width: 70%; left: 50%; margin-left: -35%; top: 20%; position: fixed;}
  .ds-alerts-title1{ text-align: center; background-color: #1f110e; color: #ffffff;}
  .ds-alerts-cont{ background-color: #0a0605;}
  .ds-popularize-btn{ padding: 0 20px; float: left; cursor: pointer;}
  .ds-popularize-btn-active{ background-color: #5b3e30;}
  .ds-js-cont{ width: 100%; overflow: auto; max-height: 500px; color: #ffffff;}
  .ds-js-cont td{ font-weight: bold; line-height: 30px; padding: 15px;}
  .cell {
    span {
      font-size: 14px !important;
    }
  }
  .caozuo {
    color: #fff;
    font-size: 14px !important;
    cursor: pointer;
    padding: 4px 8px;
    background: #553d31;
    border-radius: 5px

  }
</style>
