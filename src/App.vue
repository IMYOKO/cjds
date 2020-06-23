<template>
  <div id="app" class="clear_bor">
    <div class="ds-nav-left" v-if="!(urlPath==='/login')">
      <div class="contener-box">
        <img src="../static/ds/index_03.jpg" alt="">
        <div class="contener-box clear_box">
          <ul>
            <li>
              <i class="ds-user-icon float_left"></i>
              <div class="ds-left-cont ds-left-cont-bg1 float_right">{{infoWithdrawal.UserName}}</div>
            </li>
            <li>
              <i class="ds-money-icon float_left"></i>
              <div class="ds-left-cont ds-left-cont-bg1 float_right">{{infoWithdrawal.Banlance}}</div>
            </li>
            <li>
              <i class="ds-cz-icon float_left"></i>
              <div class="ds-left-cont ds-kstx-icon float_right" @click="toshowChongzhi">快速充值</div>
            </li>
            <li>
              <i class="ds-tx-icon float_left"></i>
              <div class="ds-left-cont ds-kstx-icon float_right" @click="toshowWithdrawal">快速提现</div>
            </li>
          </ul>
        </div>
        <div class="contener-box clear_box">
          <div class="ds-dt fhdt_btn" @click="toIndex">大厅</div>
          <div class="ds-gz">
            <div class="contener-box ds-gz-title">游戏规则</div>
            <div class="contener-box ds-gz-cont">
              特码不抽水<br>
              单 <span>1:2</span> 单赢一半<br>
              单 <span>1:3</span> 双赢一半<br>
            </div>
          </div>
        </div>
        <div class="contener-box">
          <div class="ds-zx-user">
            在线：222
          </div>
        </div>
      </div>
    </div>

    <div :class="(urlPath==='/login')?'':'ds-nav-right'">
      <div class="contener-box ds-header-top clear_box" v-if="!(urlPath==='/login')">
        <div class="ds-news-box float_left">
          <div class="ds-news-cont">
            <gd></gd>
          </div>
        </div>
        <div class="float_right">
          <ul class="ds-right-nav-icon">
            <li class="ds-right-nav-icon-get ds-icon-top-1"></li>
            <li class="ds-right-nav-icon-get ds-icon-top-2"></li>
            <li class="ds-right-nav-icon-get ds-icon-top-3" title="电话"></li>
            <li class="ds-right-nav-icon-get ds-icon-top-4" @click="toshowhistory" title="历史记录"></li>
            <li class="ds-right-nav-icon-get ds-icon-top-5" @click="toshowhelp" title="简介"></li>
            <li class="ds-right-nav-icon-get ds-icon-top-6" @click="changePasswordOld('修改取款密码',1)" title="修改取款密码"></li>
            <li class="ds-right-nav-icon-get ds-icon-top-7" @click="changePasswordOld('修改密码',2)" title="修改密码"></li>
            <li class="ds-right-nav-icon-get ds-icon-top-8" @click="changePshow" title="推广"></li>
            <li class="ds-right-nav-icon-get ds-icon-top-9" @click="getlogout" title="退出登录"></li>
          </ul>
        </div>
      </div>

      <div class="contener-box clear_box">
        <!--<transition :name="transitionName">-->
          <!--<router-view/>-->
        <!--</transition>-->
        <router-view @userInfoFn="getWithdrawal"/>
      </div>

      <!--修改密码-->
      <alerts @showalert="toshow" :ptitle="alertTitle" :type="alertType" :show="showType"></alerts>

      <!--分享-->
      <popularize @showPopularize="toshowpopularize" :popularizeShow="pShow"></popularize>

      <!--about-->
      <about @showHelp="toshowhelp" :helpShow="hShow"></about>

      <!--withdrawal-->
      <withdrawal @showWithdrawal="toshowWithdrawal" :withdrawalShow="wShow" :infoArrs="infoWithdrawal" :wType="wTypea"></withdrawal>

      <!--history-->
      <history @historyShow="toshowhistory" :historyShow="historyShows" :historyArr="hArr"></history>

    </div>
  </div>
</template>

<script>
  import gd from '@/components/gd';
  import alerts from '@/components/alerts';
  import about from '@/components/about';
  import popularize from '@/components/popularize';
  import withdrawal from '@/components/withdrawal';
  import history from '@/components/history';
  import { Toast,Actionsheet,Loadmore  } from 'mint-ui';
  import { Withdrawal,GetOrder,GetGG } from "./common/api";
  import Cookies from 'js-cookie'
  export default {
    name: 'App',
    components: {
      gd,alerts,popularize,about,withdrawal,history
    },
    data () {
      return {
        urlPath:'',
        transitionName:'',
        alertTitle:'',
        alertType:1,
        showType:false,
        pShow:false,
        hShow:false,
        historyShows:false,
        hArr:[],
        wShow:false,
        wTypea:'',
        infoWithdrawal:[],
      }
    },
    created() {
      this.urlPath = this.$route.path;
      this.loginSat();
      this.getWithdrawal(false);
    },
    methods:{
      getlogout: function(){ //退出登录
        Cookies.set('token', '');
        var cookie = Cookies.get('token');
        if(!cookie){
          let instance = Toast('退出成功！');
          setTimeout(()=>{this.$router.push({path:'/login'});instance.close();}, 1500);
        }
      },
      changePasswordOld:function(text,type){
        if (text && type){
          this.showType = true;
          this.alertTitle = text;
          this.alertType = type;
          this.pShow = false;
          this.hShow = false;
          this.wShow = false;
        }else {
          console.log('缺少参数，请重试！')
        }
      },
      toshow(show) {
        this.showType = show;
        this.pShow = false;
        this.hShow = false;
        this.wShow = false;
      },
      changePshow(){
        this.pShow = true;
        this.showType = false;
        this.hShow = false;
        this.wShow = false;
      },
      toshowpopularize(show) {
        this.pShow = show;
        this.showType = false;
        this.hShow = false;
        this.wShow = false;
      },
      toshowhelp(show) {
        this.hShow = show;
        this.historyShows = false;
        this.pShow = false;
        this.showType = false;
        this.wShow = false;
      },
      toshowhistory(show,type,clickType) {
        console.log(show)
        var that = this;
        if (type){
          that.hArr = [];
          that.historyShows = show;
        }else {
          var clickTypes = clickType?clickType:1;
          console.log(clickTypes,'clickTypes')
          GetOrder({DayType:clickTypes}).then(res=>{
            console.log(res)
            if(res.Status && res.Code==200){
              that.hArr = res.Data;
              that.historyShows = show;
            }else {
              Toast(res.msg);
            }
          });
        }
        that.hShow = false;
        that.pShow = false;
        that.showType = false;
        that.wShow = false;
      },
      toshowWithdrawal(show) {
        this.wTypea = '';
        if(show){
          this.getWithdrawal(show);
        }else {
          this.wShow = show;
        }
        this.hShow = false;
        this.historyShows = false;
        this.pShow = false;
        this.showType = false;
      },
      toshowChongzhi(show) {
        this.wTypea = 1;
        if (this.wTypea){
          this.wShow = show;
        }
        this.hShow = false;
        this.historyShows = false;
        this.pShow = false;
        this.showType = false;
      },
      getWithdrawal(show){
        Withdrawal().then(res=>{
          console.log(res)
          if(res.Status && res.Code==200){
            this.infoWithdrawal = res.Data;
            this.wShow = show;
          }else {
            Toast(res.msg);
          }
        });
      },
      loginSat: function () {
        var token = Cookies.get('token');
        if(!token || token=='null' || token=='undefined'){
          this.$router.push({path:'/login'});
        }
      },
      toIndex(){
        this.$router.push('/')
      },
    },
    mounted() {
    },
    watch: {
      // 使用watch 监听$router的变化
      $route (to, from) {
        this.urlPath = to.path;
        // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if (to.meta.index > from.meta.index){
          // 设置动画名称
          this.transitionName = 'slide-left';
        } else{
          this.transitionName = 'slide-right';
        }
      }
    }
  }
</script>

<style>
  #app { font-family: 'Avenir', Helvetica, Arial, sans-serif;  -webkit-font-smoothing: antialiased;  -moz-osx-font-smoothing: grayscale;  text-align: center;  color: #2c3e50;}
  .slide-right-enter-active, .slide-right-leave-active, .slide-left-enter-active, .slide-left-leave-active {  will-change: transform;  transition: all 500ms;  position: absolute;}
  .slide-right-enter { opacity: 0;  transform: translate3d(-100%, 0, 0);}
  .slide-right-leave-active { opacity: 0;  transform: translate3d(100%, 0, 0);}
  .slide-left-enter { opacity: 0;  transform: translate3d(100%, 0, 0);}
  .slide-left-leave-active { opacity: 0;  transform: translate3d(-100%, 0, 0);}
  .ds-nav-left{ width: 220px; padding-bottom: 20px; background-color: #0d0a03; float: left;}
  .ds-nav-left img{ display: inline-block; text-align: center; margin: 20px 0;}
  .ds-nav-right{ padding-left: 220px; padding-top: 2px; text-align: left; height: 46px; background-color: #0d0a03; line-height: 46px;}
  .ds-header-top{ height: 46px;}
  .ds-news-cont{ color: #e6e6e6; font-size: 18px; line-height: 40px;}
</style>
