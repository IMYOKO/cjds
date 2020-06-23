<template>
  <div class="contener-box clear_box ds-index-bg">
    <div class="ds-index-box">
      <table class="ds-game-top-left" cellspacing="0" cellpadding="0" width="100%">
        <tr>
          <td width="280" valign="top">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td>桌台信息:</td>
                <td v-if="id==1">{{kj_top_info[0]?kj_top_info[0].TableName:''}}</td>
                <td v-if="id==2">{{kj_top_info[1]?kj_top_info[1].TableName:''}}</td>
              </tr>
              <tr>
                <td>口次:</td>
                <td v-if="id==1">{{kj_top_info[0]?kj_top_info[0].OralTimes:''}}</td>
                <td v-if="id==2">{{kj_top_info[1]?kj_top_info[1].OralTimes:''}}</td>
              </tr>
              <tr>
                <td>个人限注:</td>
                <td v-if="id==1">{{kj_top_info[0]?kj_top_info[0].PersonalRestriction:''}}</td>
                <td v-if="id==2">{{kj_top_info[1]?kj_top_info[1].PersonalRestriction:''}}</td>
              </tr>
              <tr>
                <td>个人特码限注:</td>
                <td v-if="id==1">{{kj_top_info[0]?kj_top_info[0].PersonalSpecialCodeLimit:''}}</td>
                <td v-if="id==2">{{kj_top_info[1]?kj_top_info[1].PersonalSpecialCodeLimit:''}}</td>
              </tr>
              <tr>
                <td>个人对子限注:</td>
                <td v-if="id==1">{{kj_top_info[0]?kj_top_info[0].IndividualToChildRestriction:''}}</td>
                <td v-if="id==2">{{kj_top_info[1]?kj_top_info[1].IndividualToChildRestriction:''}}</td>
              </tr>
              <tr>
                <td>限台:</td>
                <td v-if="id==1">{{kj_top_info[0]?kj_top_info[0].LimitedPlatform:''}}</td>
                <td v-if="id==2">{{kj_top_info[1]?kj_top_info[1].LimitedPlatform:''}}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 0;">
                  <img src="../../static/ds/tg_03.jpg" style="display: inherit;">
                </td>
              </tr>
            </table>
          </td>
          <td valign="top">
            <div style="width: 100%; height: 372px;">
              <video v-for="(vdata,vindex) in videoList" v-if="vdata.FileName==videoName" :src="baseUrl+vdata.FileName" id="videoPlay" v-show="true" muted class="video" style="width:100%; height:100%; object-fit: fill;">您的浏览器不支持 video 视屏播放。</video>
            </div>
          </td>
          <td width="680" valign="top">
            <div class="ds-game-title clear_box">
              <span style="float: left;padding-left: 15px;font-size: 20px;">{{kjdjs}}</span>
              长江单双路单
              <span class="ds-index-gp float_right ds-fhdt-btn" @click="toIndex">返回大厅</span>
            </div>

            <div class="contener-box ds-game-cont">

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

            <div class="ds-index-kj-bottom clear_box" style="height: 76px;">
              <div class="float_left ds-game-bottom-text">单17/30</div>
              <div class="float_left ds-game-bottom-text">双17/30</div>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div class="ds-game-zt">
      <table class="ds-game-table" cellspacing="0" cellpadding="0" width="100%">
        <tr>
          <td width="180">
            <div :class="{'ds-game-active':gameActive.indexOf('1:2') != '-1'||allIn,'ds-game-bg-z-bg ds-game-1':1}" @click="upGame('1:2')">
              <div v-if="gameInfo[0].Money">{{gameInfo[0].Money}}</div>
            </div>
            <span style="display: block;">1:12</span>
          </td>
          <td>
            <div class="contener-box">
              <div :class="{'ds-game-active':gameActive.indexOf('3:4') != '-1'||allIn,'ds-game-bg-z-bg ds-game-2':1}" @click="upGame('3:4')">
                <div v-if="gameInfo[1].Money">{{gameInfo[1].Money}}</div>
                <span>1:11</span>
              </div>
              <div :class="{'ds-game-active':gameActive.indexOf('1:4') != '-1'||allIn,'ds-game-bg-z-bg ds-game-2-2':1}" @click="upGame('1:4')">
                <div v-if="gameInfo[2].Money">{{gameInfo[2].Money}}</div>
                <span>1:11</span>
              </div>
            </div>
            <div class="contener-box">
              <div :class="{'ds-game-active':gameActive.indexOf('1:6') != '-1'||allIn,'ds-game-bg-z-bg ds-game-2-3':1}" @click="upGame('1:6')">
                <div v-if="gameInfo[3].Money">{{gameInfo[3].Money}}</div>
                <span>1:11</span>
              </div>
              <div :class="{'ds-game-active':gameActive.indexOf('2:3') != '-1'||allIn,'ds-game-bg-z-bg ds-game-2-4':1}" @click="upGame('2:3')">
                <div v-if="gameInfo[4].Money">{{gameInfo[4].Money}}</div>
                <span>1:11</span>
              </div>
            </div>
          </td>
          <td width="250" class="ds-tb-middle">
            <!--<div class="ds-game-bg-z-bg ds-game-4"></div>-->

            <div :class="{'ds-game-active':gameActive.indexOf('dan1') != '-1'||allIn,'ds-game-bg-z-bg ds-game-4':1}" @click="upGame('dan1')">
              <div v-if="gameInfo[23].Money">{{gameInfo[23].Money}}</div>
            </div>
            <span style="display: block;">1:1</span>

          </td>
          <td>
            <div class="contener-box">
              <div :class="{'ds-game-active':gameActive.indexOf('2:5') != '-1'||allIn,'ds-game-bg-z-bg ds-game-5':1}" @click="upGame('2:5')">
                <div v-if="gameInfo[5].Money">{{gameInfo[5].Money}}</div>
                <span>1:11</span>
              </div>
              <div :class="{'ds-game-active':gameActive.indexOf('3:6') != '-1'||allIn,'ds-game-bg-z-bg ds-game-5-1':1}" @click="upGame('3:6')">
                <div v-if="gameInfo[6].Money">{{gameInfo[6].Money}}</div>
                <span>1:11</span>
              </div>
            </div>
            <div class="contener-box">
              <div :class="{'ds-game-active':gameActive.indexOf('4:5') != '-1'||allIn,'ds-game-bg-z-bg ds-game-5-2':1}" @click="upGame('4:5')">
                <div v-if="gameInfo[7].Money">{{gameInfo[7].Money}}</div>
                <span>1:11</span>
              </div>
              <div :class="{'ds-game-active':gameActive.indexOf('5:6') != '-1'||allIn,'ds-game-bg-z-bg ds-game-5-3':1}" @click="upGame('5:6')">
                <div v-if="gameInfo[8].Money">{{gameInfo[8].Money}}</div>
                <span>1:11</span>
              </div>
            </div>
          </td>
          <td>
            <div :class="{'ds-game-active':gameActive.indexOf('shuang') != '-1'||allIn,'ds-game-bg-z-bg ds-game-7':1}" @click="upGame('shuang')">
              <div v-if="gameInfo[22].Money">{{gameInfo[22].Money}}</div>
            </div>
            <span style="display: block;">1:1</span>
          </td>
        </tr>
        <tr>
          <td>
            <div :class="{'ds-game-active':gameActive.indexOf('1:3') != '-1'||allIn,'ds-game-bg-z-bg ds-game-1-1':1}" @click="upGame('1:3')">
              <div v-if="gameInfo[10].Money">{{gameInfo[10].Money}}</div>
            </div>
            <span style="display: block;">1:12</span>
          </td>
          <td>
            <div class="contener-box">
              <div :class="{'ds-game-active':gameActive.indexOf('3:5') != '-1'||allIn,'ds-game-bg-z-bg ds-game-3':1}" @click="upGame('3:5')">
                <div v-if="gameInfo[11].Money">{{gameInfo[11].Money}}</div>
                <span>1:11</span>
              </div>
              <div :class="{'ds-game-active':gameActive.indexOf('1:5') != '-1'||allIn,'ds-game-bg-z-bg ds-game-3-1':1}" @click="upGame('1:5')">
                <div v-if="gameInfo[12].Money">{{gameInfo[12].Money}}</div>
                <span>1:11</span>
              </div>
              <div :class="{'ds-game-active':gameActive.indexOf('2:4') != '-1'||allIn,'ds-game-bg-z-bg ds-game-3-2':1}" @click="upGame('2:4')">
                <div v-if="gameInfo[13].Money">{{gameInfo[13].Money}}</div>
                <span>1:11</span>
              </div>
            </div>
            <div class="contener-box">
              <div :class="{'ds-game-active':gameActive.indexOf('2:6') != '-1'||allIn,'ds-game-bg-z-bg ds-game-3-3':1}" @click="upGame('2:6')">
                <div v-if="gameInfo[14].Money">{{gameInfo[14].Money}}</div>
                <span>1:11</span>
              </div>
              <div :class="{'ds-game-active':gameActive.indexOf('4:6') != '-1'||allIn,'ds-game-bg-z-bg ds-game-3-4':1}" @click="upGame('4:6')">
                <div v-if="gameInfo[15].Money">{{gameInfo[15].Money}}</div>
                <span>1:11</span>
              </div>
            </div>
          </td>
          <td class="ds-tb-middle">
            <!--<div class="ds-game-bg-z-bg ds-game-4-1">-->
              <!--<span>1:11</span>-->
            <!--</div>-->

            <div :class="{'ds-game-active':gameActive.indexOf('shuang1') != '-1'||allIn,'ds-game-bg-z-bg ds-game-4-1':1}" @click="upGame('shuang1')">
              <div v-if="gameInfo[24].Money">{{gameInfo[24].Money}}</div>
            </div>
            <span style="display: block;">1:1</span>

          </td>
          <td>
            <div class="contener-box">
              <div :class="{'ds-game-active':gameActive.indexOf('1:1') != '-1'||allIn,'ds-game-bg-z-bg ds-game-6':1}" @click="upGame('1:1')">
                <div v-if="gameInfo[16].Money">{{gameInfo[16].Money}}</div>
                <span>1:11</span>
              </div>
              <div :class="{'ds-game-active':gameActive.indexOf('2:2') != '-1'||allIn,'ds-game-bg-z-bg ds-game-6-1':1}" @click="upGame('2:2')">
                <div v-if="gameInfo[17].Money">{{gameInfo[17].Money}}</div>
                <span>1:11</span>
              </div>
              <div :class="{'ds-game-active':gameActive.indexOf('3:3') != '-1'||allIn,'ds-game-bg-z-bg ds-game-6-2':1}" @click="upGame('3:3')">
                <div v-if="gameInfo[18].Money">{{gameInfo[18].Money}}</div>
                <span>1:11</span>
              </div>
            </div>
            <div class="contener-box">
              <div :class="{'ds-game-active':gameActive.indexOf('4:4') != '-1'||allIn,'ds-game-bg-z-bg ds-game-6-3':1}" @click="upGame('4:4')">
                <div v-if="gameInfo[19].Money">{{gameInfo[19].Money}}</div>
                <span>1:11</span>
              </div>
              <div :class="{'ds-game-active':gameActive.indexOf('5:5') != '-1'||allIn,'ds-game-bg-z-bg ds-game-6-4':1}" @click="upGame('5:5')">
                <div v-if="gameInfo[20].Money">{{gameInfo[20].Money}}</div>
                <span>1:11</span>
              </div>
              <div :class="{'ds-game-active':gameActive.indexOf('6:6') != '-1'||allIn,'ds-game-bg-z-bg ds-game-6-5':1}" @click="upGame('6:6')">
                <div v-if="gameInfo[21].Money">{{gameInfo[21].Money}}</div>
                <span>1:11</span>
              </div>
            </div>
          </td>
          <td>
            <div :class="{'ds-game-active':gameActive.indexOf('dan') != '-1'||allIn,'ds-game-bg-z-bg ds-game-7-1':1}" @click="upGame('dan')">
              <div v-if="gameInfo[9].Money">{{gameInfo[9].Money}}</div>
            </div>
            <span style="display: block;">1:1</span>
          </td>
        </tr>
      </table>
    </div>
    <div class="ds-game-zt-bottom clear_box">
      <div class="float_left ds-switch">
        <span>视频</span>
        <mt-switch v-model="value" @change="turn">开</mt-switch>
        <span class="ds-sxsp">刷新视频</span>
      </div>
      <div class="float_right ds-code-game">

        <div :class="{'je-active':jeStatus == '20','ds-game-xz-btn ds-game-zm20':1}" @click="jeFn('20')"></div>
        <div :class="{'je-active':jeStatus == '50','ds-game-xz-btn ds-game-zm50':1}" @click="jeFn('50')"></div>
        <div :class="{'je-active':jeStatus == '100','ds-game-xz-btn ds-game-zm100':1}" @click="jeFn('100')"></div>
        <div :class="{'je-active':jeStatus == '200','ds-game-xz-btn ds-game-zm200':1}" @click="jeFn('200')"></div>
        <div :class="{'je-active':jeStatus == '500','ds-game-xz-btn ds-game-zm500':1}" @click="jeFn('500')"></div>
        <div :class="{'je-active':jeStatus == '1000','ds-game-xz-btn ds-game-zm1000':1}" @click="jeFn('1000')"></div>

        <div class="ds-game-btn bg-00d257" @click="allInFn">All In</div>
        <div class="ds-game-btn bg-00d257" @click="OKGame">确定</div>
        <div class="ds-game-btn" @click="canleGame">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { GetGameTable,AddOrder,Withdrawal,GetVedioTime,GetVedio,baseUrl,AddVedio,QSJ,GetKJ } from "../common/api";
  import { Toast,Loadmore,Switch  } from 'mint-ui';
  import Cookies from 'js-cookie'
  export default {
    name: 'game',
    data () {
      return {
        id:this.$route.query.id,
        _imgUrl:'',
        value:true,
        leftPo:38,
        kj_time:30,
        kj_data:[],
        kj_top_info:[],
        allIn:false,//allIn
        gameActive:[],//选中数组
        gameAll:0,//总金额
        jeStatus:'',//选中金额
        gameInfo:[
          {name:'1:2',Money:0},{name:'3:4',Money:0},{name:'1:4',Money:0},{name:'1:6',Money:0},{name:'2:3',Money:0},
          {name:'2:5',Money:0},{name:'3:6',Money:0},{name:'4:5',Money:0},{name:'5:6',Money:0},{name:'dan',Money:0},
          {name:'1:3',Money:0},{name:'3:5',Money:0},{name:'1:5',Money:0},{name:'2:4',Money:0},{name:'2:6',Money:0},
          {name:'4:6',Money:0},{name:'1:1',Money:0},{name:'2:2',Money:0},{name:'3:3',Money:0},{name:'4:4',Money:0},
          {name:'5:5',Money:0},{name:'6:6',Money:0},{name:'shuang',Money:0},{name:'dan1',Money:0},{name:'shuang1',Money:0}
        ],//金额数据组合

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
      var that = this;
      that.baseUrl = baseUrl();
      if (!that.id){
        that.$router.push('/')
      }else {
        that.GetVedio();//获取视频列表
        that.getGetGameTable()
      }
    },
    methods: {
      getGetGameTable(){
        GetGameTable().then(res=>{
          console.log(res)
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
      upGame(type){
        var that = this;
//        console.log(that.gameInfo)
        if (type){
          var jeStatus = Number(that.jeStatus);
          if (that.gameActive.indexOf(type) == '-1' && jeStatus){
            that.gameActive.push(type);
          }
          else if(!that.jeStatus){
            Toast('请先选择额度在下注！');
          }
          if(jeStatus){
            var infoArr = that.gameInfo;
            var gameTemp = '';
            for(var i = 0;i < infoArr.length;i++){
              if(infoArr[i].name == type){
                gameTemp = i;//存在
              }
            }
            that.gameInfo[gameTemp].Money = Number(that.gameInfo[gameTemp].Money) + jeStatus
          }
        }
        var tempAll = 0;
        for(var i = 0;i < that.gameInfo.length;i++){
          var my = that.gameInfo[i].Money;
          if(my){
            tempAll = tempAll+my;
          }
        }
        that.gameAll = tempAll;
        console.log(tempAll)

      },
      OKGame(){
        var that = this;
        var AllInJson = that.gameInfo;
        var tempGetJson = [];
        for(var i=0; i<AllInJson.length; i++){
          var M = AllInJson[i].Money;
          var N = AllInJson[i].name;
          tempGetJson.push(N+'|'+M);
        }
        tempGetJson = tempGetJson.toString();
        console.log(tempGetJson)
        if (that.XzISOk){
          if(that.gameAll && that.id){
            Withdrawal().then(res=>{
              if(res.Status && res.Code==200){
                if(res.Data.Banlance>=that.gameAll){

                  var getJson = {GameTableId:that.id,PlayType:tempGetJson,Money:that.gameAll}
                  console.log(getJson,'getJson')
                  AddOrder(getJson).then(res=>{
                    console.log(res)
                    if(res.Status){
                      Toast('下注成功！');
                      that.canleGame();

                      that.$emit('userInfoFn');
                    }else {
                      Toast(res.Log);
                    }
                  });

                }else {
                  Toast('下注金额不能大于现有金额！');
                }

              }else {
                Toast(res.msg);
              }
            });

          }else {
            Toast('请选择下注！');
          }

        }else {
          Toast('未到下注时间');
        }

      },
      allInFn(){
        var jeS = Number(this.jeStatus);
        if(this.jeStatus){
          this.gameAll = 0;
          var AllInJson = this.gameInfo;
          for(var i=0; i<AllInJson.length; i++){
            AllInJson[i].Money = jeS;
            this.gameAll = Number(this.gameAll)+jeS;
          }
          this.allIn = true;
        }else {
          Toast('请先选择额度在下注！');
        }
        console.log(this.gameInfo)
      },
      jeFn(num){
        if(num){
          this.jeStatus = num;
        }
      },
      GetVedio(){
        var thats = this;
        GetVedio().then(res=>{
          if(res.Status && res.Code==200){
            thats.videoList = res.Data;
            thats.GetVedioTime();
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
//                that.$router.push({path: '/game',query:{id:that.id}});
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
      GetVedioTime(){
        var tx = this;
        GetVedioTime().then(res=>{
          console.log(res)
          if(res.Status && res.Code==200){
            tx.XZTime = res.Data.XZTime;
            tx.DSTime = res.Data.DSTime;
            tx.videoName = res.Data.DSVideo;
            setTimeout(function () {
              tx.playVideo();
            },1000)
          }else {
            Toast(res.Log);
          }
        });
      },
      playVideo(){
        var thatDSTime = this.DSTime+1;
        var vdo = document.getElementById("videoPlay");
//        setTimeout(function () {
        vdo.currentTime=thatDSTime;//开始播放的时间 s
        if(vdo.paused && this.value){  //判断是否处于暂停状态
          vdo.play();  //开启播放
        }
//        },100)
      },
      playStop(){
        var myVideo = document.getElementById("videoPlay");
        myVideo.pause();
      },
      turn: function(){
        if (this.value){
          this.playVideo();
        }else {
          this.playStop();
        }
      },
      toIndex(){
        this.$router.push('/')
      },
      canleGame(){
        this.gameActive = [];
        this.jeStatus = '';
        this.gameAll = 0;
        this.jeStatus = '';
        this.allIn = false;
        var AllInJson = this.gameInfo;
        for(var i=0; i<AllInJson.length; i++){
          AllInJson[i].Money = 0;
        }
        console.log(this.gameInfo)
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
        if(that.$route.path=='/game'){
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ds-switch{ margin-left: 10px;}
  .ds-switch label{ margin-left: 10px;}
  .ds-switch *{ float: left; color: #ffffd3;}
  .ds-game-bg-z-bg{ position: relative;}
  .ds-game-bg-z-bg>div{ position: absolute; right: -5px; top: 0; z-index: 11; font-size: 14px; line-height: initial; padding:2px 3px; background-color: #8877ca; border-radius: 8px;}
</style>
