<template>
  <div class="contener-box clear_box ds-index-bg">
    <div class="ds-index-box">
      <div class="ds-index-box-left">
        <div class="ds-index-k-box">
          <div class="ds-index-k-item">

            <div class="ds-index-top-bg clear_box">
              <span class="ds-index-time">{{kjdjs}}</span>
              <span class="ds-index-time-title">{{kj_top_info[0]?kj_top_info[0].TableName:''}}</span>
              <span class="ds-index-gp float_right">靴:4  铺:10</span>
            </div>

            <div class="contener-box">

              <table class="ds-index-kj-qs-tb" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td v-for="(itemlist,index) in kj_data">
                    <div v-if="itemlist.num[0]" v-for='(kjlist,kjindex) in itemlist.num'
                         :class="kjindex>=6?'ds-index-kj-po clear_bor':''"
                         :style="kjindex>=6?'left:'+(leftPo*(itemlist.num.length-kjindex))+'px':''"
                    >
                      <span v-if="kjindex<6" :class="itemlist.DS?'bg-bf0d0b':'bg-0544b8'">{{kjlist}}</span>
                      <span v-if="kjindex>=6" :class="itemlist.DS?'bg-bf0d0b':'bg-0544b8'">{{kjlist}}</span>
                    </div>
                    <div v-if="itemlist.num[0] && itemlist.num.length<6" v-for="nonelist in Math.abs(6-itemlist.num.length)"></div>
                    <div v-if="!itemlist.num[0]" v-for="nonelist in 6"></div>
                  </td>
                </tr>
              </table>

            </div>

            <div class="ds-index-kj-bottom clear_box">
              <span class="ds-index-time">限台:100万</span>
              <span class="ds-index-gp float_right" @click="toGame('1')">开始游戏</span>
            </div>

          </div>
          <div class="ds-index-k-item">

            <div class="ds-index-top-bg clear_box">
              <span class="ds-index-time">{{kjdjs}}</span>
              <span class="ds-index-time-title">{{kj_top_info[1]?kj_top_info[1].TableName:''}}</span>
              <span class="ds-index-gp float_right">靴:4  铺:10</span>
            </div>

            <div class="contener-box">

              <table class="ds-index-kj-qs-tb" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td v-for="(itemlist,index) in kj_data">
                    <div v-if="itemlist.num[0]" v-for='(kjlist,kjindex) in itemlist.num'
                         :class="kjindex>=6?'ds-index-kj-po clear_bor':''"
                         :style="kjindex>=6?'left:'+(leftPo*(itemlist.num.length-kjindex))+'px':''"
                    >
                      <span v-if="kjindex<6" :class="itemlist.DS?'bg-bf0d0b':'bg-0544b8'">{{kjlist}}</span>
                      <span v-if="kjindex>=6" :class="itemlist.DS?'bg-bf0d0b':'bg-0544b8'">{{kjlist}}</span>
                    </div>
                    <div v-if="itemlist.num[0] && itemlist.num.length<6" v-for="nonelist in Math.abs(6-itemlist.num.length)"></div>
                    <div v-if="!itemlist.num[0]" v-for="nonelist in 6"></div>
                  </td>
                </tr>
              </table>

            </div>

            <div class="ds-index-kj-bottom clear_box">
              <span class="ds-index-time">限台:100万</span>
              <span class="ds-index-gp float_right" @click="toGame('2')">开始游戏</span>
            </div>

          </div>
        </div>
      </div>
      <div class="ds-index-box-right">
        <div id="ds-vd-box" class="ds-vd-box">
          <video v-for="(vdata,vindex) in videoList" v-if="vdata.FileName==videoName" :src="baseUrl+vdata.FileName" id="videoPlay" v-show="true" muted class="video" style="width:100%; height:100%; object-fit: fill;">您的浏览器不支持 video 视屏播放。</video>
        </div>
        <div class="ds-vd-box" style="height: auto">
          <img src="../../static/ds/t1.jpg">
        </div>
        <div class="ds-vd-box" style="height: auto">
          <div class="contener-box" style=" background-color: #1f1e1a; padding-top: 5px;">
            <img src="../../static/ds/t2.jpg" style="width: 101px; margin: auto;">
          </div>
          <div class="contener-box" style="overflow: auto; height: 400px;">
            <table class="ds-index-pm" cellspacing="0" cellpadding="0" width="100%">
              <tr>
                <td>排名</td>
                <td>昵称</td>
                <td>盈利</td>
              </tr>
              <tr v-for="(pmdata,pmindex) in pmList">
                <td>{{pmindex+1}}</td>
                <td>{{pmdata.NickName}}</td>
                <td>{{pmdata.YL}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { GetGameTable,GetVedioTime,GetVedio,baseUrl,AddVedio,QSJ,GetKJ,GetPM } from "../common/api";
  import { Toast,Loadmore  } from 'mint-ui';
  import Cookies from 'js-cookie'
  export default {
    name: 'index',
    data () {
      return {
        pmList:[],
        _imgUrl:'',
        leftPo:38,
        kj_data:[],
        kj_top_info:[],
        GameTableInfo:[],
        baseUrl:'',
        videoList:[],
        XZTime:0, //游戏倒计时
        DSTime:0,//视频播放时间
        DSTimeAll:0,//视频播放剩余时长
        dsTimesss:0,//视频播放倒计时
        videoName:0,//视频播放名字

        kjdjs:0,
        XzISOk:false,
        kjstatus:false,
      }
    },
    created() {
      var that =this;
      that.baseUrl = baseUrl();
      that.GetVedio();//获取视频列表
      that.getGetGameTable()
      that.GetPM()
    },
    methods: {
      GetPM(){
        var thats = this;
        GetPM().then(res=>{
          console.log(res,'GetPM')
          if(res.Status && res.Code==200){
            thats.pmList = res.Data;
          }else {
            Toast(res.Log);
          }
        });
      },
      getGetGameTable(){
        GetGameTable().then(res=>{
          if(res.Status && res.Code==200){
            var tempList = []
            for(var i = 0; i<res.Data.List.length; i++){
              if(res.Data.List[i].num.length>0 && res.Data.List[i].num[0]){
                tempList.unshift(res.Data.List[i])
              }else {
                tempList.push(res.Data.List[i])
              }
            }
            console.log(tempList)
            this.kj_data = tempList;
            this.kj_top_info = res.Data.GameTableList;
          }else {
            Toast(res.Log);
          }
        });
      },
      GetVedio(){
        var thats = this;
        GetVedio().then(res=>{
          console.log(res)
          if(res.Status && res.Code==200){
            thats.videoList = res.Data;
            thats.GetVedioTime();
          }else {
            Toast(res.Log);
          }
        });
      },
      GetVedioTime(){
        var tx = this;
        GetVedioTime().then(res=>{
          console.log(res)
          if(res.Status && res.Code==200){
            tx.XZTime = res.Data.XZTime;
            tx.DSTime = res.Data.DSTime;
            tx.videoName = res.Data.DSVideo;
//            console.log(tx.XZTime,'tx.XZTime')
            setTimeout(function () {
              tx.playVideo();
            },1000)
          }else {
            Toast(res.Log);
          }
        });
      },
      AddVedio(vName){
        var that = this;
        if (vName){
          var txtName = '';
          for(var i=0;i<that.videoList.length;i++){
            if(vName==that.videoList[i].FileName){
              if ((i+1) == that.videoList.length){
                QSJ().then(res=>{});
//                that.$router.push({path: '/'});
                location. reload()
              }else {
                txtName = that.videoList[i+1].FileName
              }
            }
          }
          if(txtName){
            AddVedio({VideoName:txtName}).then(res=>{
              if (res.Status){
                that.GetVedioTime()
                that.getGetGameTable()
              }
            });
          }
        }
      },
      playVideo(){
        var thatDSTime = this.DSTime+1;
        console.log(thatDSTime,'thatDSTime')
        var vdo = document.getElementById("videoPlay");
//        setTimeout(function () {
          vdo.currentTime=thatDSTime;//开始播放的时间 s
          if(vdo.paused){  //判断是否处于暂停状态
            vdo.play();  //开启播放
          }else{
//          vdo.pause();  //停止播放
          }
//        },100)
      },
      toGame(id){
        if (id){
//          this.$router.push('/game')
          this.$router.push({path: '/game',query:{id:id}});
        }
      },
      countDown(time){
        let that = this;
        if(that.kjdjs==0 && !that.XzISOk){
          if (time > that.XZTime && time < that.XZTime+30){
            that.kjdjs = 30-that.XZTime;
            that.XzISOk = true;
          }
          else if(time > that.XZTime && time > that.XZTime+30){
            that.kjdjs = 1;
            that.XzISOk = false;
          }
          else {
            that.kjdjs = 30;
            that.XzISOk = true;
          }
          var interval = setInterval(() => {
            if (that.XzISOk){
              --that.kjdjs;
              that.XzISOk = true;
              if (that.kjdjs==0){
                that.kjdjs = 0;
                that.XzISOk = false;
                that.AddVedio(that.videoName)
                clearInterval(interval);
              }
            }

          },1000)
        }
      },
    },
    mounted(){
      var that = this;
//      that.countDown();
      setInterval(function () {
        var vdos = document.getElementById("videoPlay");
        if(that.$route.path=='/'){
          if (that.XZTime == parseInt(vdos.currentTime) || that.XZTime < parseInt(vdos.currentTime)){
            console.log(that.XZTime,parseInt(vdos.currentTime),that.XzISOk)
            that.countDown(parseInt(vdos.currentTime));
            if(!that.kjstatus){
              GetKJ().then(res=>{});
              that.kjstatus = true;
            }
          }else {
            that.kjstatus = false;
          }
        }
      },1000)
    }
  }
</script>

<style scoped>

</style>
