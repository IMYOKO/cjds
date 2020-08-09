<template>
  <div class="contener-box clear_box ds-index-bg">
    <div class="ds-index-box">
      <table class="ds-game-top-left" cellspacing="0" cellpadding="0" width="100%">
        <tr>
          <td width="280" valign="top">
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td width=''>桌台信息:</td>
                <td v-if="id == 1">{{ kj_top_info[0] ? kj_top_info[0].TableName : "" }}</td>
                <td v-if="id == 2">{{ kj_top_info[1] ? kj_top_info[1].TableName : "" }}</td>
              </tr>
              <tr>
                <td>口次:</td>
                <td v-if="id == 1">{{ kj_top_info[0] ? kj_top_info[0].OralTimes : "" }}</td>
                <td v-if="id == 2">{{ kj_top_info[1] ? kj_top_info[1].OralTimes : "" }}</td>
              </tr>
              <tr>
                <td>个人限注:</td>
                <td v-if="id == 1">{{ kj_top_info[0] ? kj_top_info[0].PersonalRestriction : "" }}</td>
                <td v-if="id == 2">{{ kj_top_info[1] ? kj_top_info[1].PersonalRestriction : "" }}</td>
              </tr>
              <tr>
                <td>个人特码限注:</td>
                <td v-if="id == 1">
                  {{
                  kj_top_info[0]
                  ? kj_top_info[0].PersonalSpecialCodeLimit
                  : ""
                  }}
                </td>
                <td v-if="id == 2">
                  {{
                  kj_top_info[1]
                  ? kj_top_info[1].PersonalSpecialCodeLimit
                  : ""
                  }}
                </td>
              </tr>
              <tr>
                <td>个人对子限注:</td>
                <td v-if="id == 1">
                  {{
                  kj_top_info[0]
                  ? kj_top_info[0].IndividualToChildRestriction
                  : ""
                  }}
                </td>
                <td v-if="id == 2">
                  {{
                  kj_top_info[1]
                  ? kj_top_info[1].IndividualToChildRestriction
                  : ""
                  }}
                </td>
              </tr>
              <tr>
                <td>限台:</td>
                <td v-if="id == 1">{{ kj_top_info[0] ? kj_top_info[0].LimitedPlatform : "" }}</td>
                <td v-if="id == 2">{{ kj_top_info[1] ? kj_top_info[1].LimitedPlatform : "" }}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 0;">
                  <img src="../../static/ds/tg_03.jpg" style="display: inherit;">
                </td>
              </tr>
            </table>
          </td>
          <td width="667" valign="top">
            <div style="width: 100%; height: 372px; position: relative;">
              <div class="xiazhu-time">
                <template v-if="timeData">
                  <span v-if="nowTime < timeData.startBet">—</span>
                  <span v-else-if="nowTime > timeData.endBet">—</span>
                  <span class="kj" v-else>{{timeData.endBet - nowTime}}</span>
                </template>
              </div>
              <div class="hide-video" v-if="!value"></div>
              <VuePlayer :width="667" :height="372" />
              <!-- <video 
                class="video"
                id="j-video"
                x-webkit-airplay="true"
                webkit-playsinline="true"
                preload="auto"
                style="width: 100%; height: 100%; object-fit: fill;"
              ></video> -->
              <!-- <video
                v-for="(vdata, vindex) in videoList"
                v-if="vdata.FileName == videoName"
                :src="baseUrl + vdata.FileName"
                id="videoPlay"
                preload
                controlslist="nodownload"
                oncontextmenu="return false"
                :key="vindex"
                v-show="true"
                muted
                autoplay
                class="video"
                style="width: 100%; height: 100%; object-fit: fill;"
              >您的浏览器不支持 video 视屏播放。</video> -->
            </div>
          </td>
          <td width="" valign="top">
            <div class="ds-game-title clear_box">
              长江单双路单
            </div>
            <div class="contener-box ds-game-cont">
              <table class="ds-index-kj-qs-tb" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td v-for="(itemlist, index) in kj_data" :key='index'>
                    <div
                      v-if="itemlist.num[0]"
                      :key='`${kjindex}s`'
                      v-for="(kjlist, kjindex) in itemlist.num"
                      :class="kjindex >= 6 ? 'ds-index-kj-po clear_bor' : ''"
                      :style="
                        kjindex >= 6
                          ? 'left:' +
                            leftPo * (itemlist.num.length - kjindex) +
                            'px'
                          : ''
                      "
                    >
                      <span
                        v-if="kjindex < 6"
                        :class="itemlist.DS ? 'bg-bf0d0b' : 'bg-0544b8'"
                      >{{ kjlist }}</span>
                      <span
                        v-if="kjindex >= 6"
                        :class="itemlist.DS ? 'bg-bf0d0b' : 'bg-0544b8'"
                      >{{ kjlist }}</span>
                    </div>
                    <div
                      v-if="itemlist.num[0] && itemlist.num.length < 6"
                      v-for="nonelist in Math.abs(6 - itemlist.num.length)"
                      :key="`${nonelist}1`"
                    ></div>
                    <div v-if="!itemlist.num[0]" v-for="nonelist in 6" :key="`${nonelist}0`"></div>
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
            <div
              :class="{
                'ds-game-active': gameActive.indexOf('1:2') != '-1' || allIn,
                'ds-game-bg-z-bg ds-game-1': 1,
              }"
              @click="upGame('1:2')"
            >
              <div v-if="gameInfo[0].Money">{{ gameInfo[0].Money }}</div>
            </div>
            <span style="display: block;">{{tmSOdds}}</span>
          </td>
          <td>
            <div class="contener-box">
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('3:4') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-2': 1,
                }"
                @click="upGame('3:4')"
              >
                <div v-if="gameInfo[1].Money">{{ gameInfo[1].Money }}</div>
                <span>{{tmOdds}}</span>
              </div>
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('1:4') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-2-2': 1,
                }"
                @click="upGame('1:4')"
              >
                <div v-if="gameInfo[2].Money">{{ gameInfo[2].Money }}</div>
                <span>{{tmOdds}}</span>
              </div>
            </div>
            <div class="contener-box">
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('1:6') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-2-3': 1,
                }"
                @click="upGame('1:6')"
              >
                <div v-if="gameInfo[3].Money">{{ gameInfo[3].Money }}</div>
                <span>{{tmOdds}}</span>
              </div>
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('2:3') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-2-4': 1,
                }"
                @click="upGame('2:3')"
              >
                <div v-if="gameInfo[4].Money">{{ gameInfo[4].Money }}</div>
                <span>{{tmOdds}}</span>
              </div>
            </div>
          </td>
          <td width="250" class="ds-tb-middle">
            <!--<div class="ds-game-bg-z-bg ds-game-4"></div>-->
            <div
              :class="{
                'ds-game-active': gameActive.indexOf('dan1') != '-1' || allIn,
                'ds-game-bg-z-bg ds-game-4': 1,
              }"
              @click="upGame('dan1')"
            >
              <div v-if="gameInfo[23].Money">{{ gameInfo[23].Money }}</div>
            </div>
            <span style="display: block;">1:1</span>
          </td>
          <td>
            <div class="contener-box">
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('2:5') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-5': 1,
                }"
                @click="upGame('2:5')"
              >
                <div v-if="gameInfo[5].Money">{{ gameInfo[5].Money }}</div>
                <span>{{tmOdds}}</span>
              </div>
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('3:6') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-5-1': 1,
                }"
                @click="upGame('3:6')"
              >
                <div v-if="gameInfo[6].Money">{{ gameInfo[6].Money }}</div>
                <span>{{tmOdds}}</span>
              </div>
            </div>
            <div class="contener-box">
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('4:5') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-5-2': 1,
                }"
                @click="upGame('4:5')"
              >
                <div v-if="gameInfo[7].Money">{{ gameInfo[7].Money }}</div>
                <span>{{tmOdds}}</span>
              </div>
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('5:6') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-5-3': 1,
                }"
                @click="upGame('5:6')"
              >
                <div v-if="gameInfo[8].Money">{{ gameInfo[8].Money }}</div>
                <span>{{tmOdds}}</span>
              </div>
            </div>
          </td>
          <td>
            <div
              :class="{
                'ds-game-active': gameActive.indexOf('shuang') != '-1' || allIn,
                'ds-game-bg-z-bg ds-game-7': 1,
              }"
              @click="upGame('shuang')"
            >
              <div v-if="gameInfo[22].Money">{{ gameInfo[22].Money }}</div>
            </div>
            <span style="display: block;">1:1</span>
          </td>
        </tr>
        <tr>
          <td>
            <div
              :class="{
                'ds-game-active': gameActive.indexOf('1:3') != '-1' || allIn,
                'ds-game-bg-z-bg ds-game-1-1': 1,
              }"
              @click="upGame('1:3')"
            >
              <div v-if="gameInfo[10].Money">{{ gameInfo[10].Money }}</div>
            </div>
            <span style="display: block;">{{tmSOdds}}</span>
          </td>
          <td>
            <div class="contener-box">
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('3:5') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-3': 1,
                }"
                @click="upGame('3:5')"
              >
                <div v-if="gameInfo[11].Money">{{ gameInfo[11].Money }}</div>
                <span>{{tmOdds}}</span>
              </div>
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('1:5') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-3-1': 1,
                }"
                @click="upGame('1:5')"
              >
                <div v-if="gameInfo[12].Money">{{ gameInfo[12].Money }}</div>
                <span>{{tmOdds}}</span>
              </div>
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('2:4') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-3-2': 1,
                }"
                @click="upGame('2:4')"
              >
                <div v-if="gameInfo[13].Money">{{ gameInfo[13].Money }}</div>
                <span>{{tmOdds}}</span>
              </div>
            </div>
            <div class="contener-box">
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('2:6') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-3-3': 1,
                }"
                @click="upGame('2:6')"
              >
                <div v-if="gameInfo[14].Money">{{ gameInfo[14].Money }}</div>
                <span>{{tmOdds}}</span>
              </div>
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('4:6') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-3-4': 1,
                }"
                @click="upGame('4:6')"
              >
                <div v-if="gameInfo[15].Money">{{ gameInfo[15].Money }}</div>
                <span>{{tmOdds}}</span>
              </div>
            </div>
          </td>
          <td class="ds-tb-middle">
            <!--<div class="ds-game-bg-z-bg ds-game-4-1">-->
            <!--<span>{{tmOdds}}</span>-->
            <!--</div>-->
            <div
              :class="{
                'ds-game-active':
                  gameActive.indexOf('shuang1') != '-1' || allIn,
                'ds-game-bg-z-bg ds-game-4-1': 1,
              }"
              @click="upGame('shuang1')"
            >
              <div v-if="gameInfo[24].Money">{{ gameInfo[24].Money }}</div>
            </div>
            <span style="display: block;">1:1</span>
          </td>
          <td>
            <div class="contener-box">
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('1:1') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-6': 1,
                }"
                @click="upGame('1:1')"
              >
                <div v-if="gameInfo[16].Money">{{ gameInfo[16].Money }}</div>
                <span>{{dzOdds}}</span>
              </div>
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('2:2') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-6-1': 1,
                }"
                @click="upGame('2:2')"
              >
                <div v-if="gameInfo[17].Money">{{ gameInfo[17].Money }}</div>
                <span>{{dzOdds}}</span>
              </div>
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('3:3') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-6-2': 1,
                }"
                @click="upGame('3:3')"
              >
                <div v-if="gameInfo[18].Money">{{ gameInfo[18].Money }}</div>
                <span>{{dzOdds}}</span>
              </div>
            </div>
            <div class="contener-box">
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('4:4') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-6-3': 1,
                }"
                @click="upGame('4:4')"
              >
                <div v-if="gameInfo[19].Money">{{ gameInfo[19].Money }}</div>
                <span>{{dzOdds}}</span>
              </div>
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('5:5') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-6-4': 1,
                }"
                @click="upGame('5:5')"
              >
                <div v-if="gameInfo[20].Money">{{ gameInfo[20].Money }}</div>
                <span>{{dzOdds}}</span>
              </div>
              <div
                :class="{
                  'ds-game-active': gameActive.indexOf('6:6') != '-1' || allIn,
                  'ds-game-bg-z-bg ds-game-6-5': 1,
                }"
                @click="upGame('6:6')"
              >
                <div v-if="gameInfo[21].Money">{{ gameInfo[21].Money }}</div>
                <span>{{dzOdds}}</span>
              </div>
            </div>
          </td>
          <td>
            <div
              :class="{
                'ds-game-active': gameActive.indexOf('dan') != '-1' || allIn,
                'ds-game-bg-z-bg ds-game-7-1': 1,
              }"
              @click="upGame('dan')"
            >
              <div v-if="gameInfo[9].Money">{{ gameInfo[9].Money }}</div>
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
        <span class="ds-sxsp" v-if="value" @click="updateVideo">刷新视频</span>
      </div>
      <div class="float_right ds-code-game">
        <div
          :class="{
            'je-active': jeStatus == '20',
            'ds-game-xz-btn ds-game-zm20': 1,
          }"
          @click="jeFn('20')"
        ></div>
        <div
          :class="{
            'je-active': jeStatus == '50',
            'ds-game-xz-btn ds-game-zm50': 1,
          }"
          @click="jeFn('50')"
        ></div>
        <div
          :class="{
            'je-active': jeStatus == '100',
            'ds-game-xz-btn ds-game-zm100': 1,
          }"
          @click="jeFn('100')"
        ></div>
        <div
          :class="{
            'je-active': jeStatus == '200',
            'ds-game-xz-btn ds-game-zm200': 1,
          }"
          @click="jeFn('200')"
        ></div>
        <div
          :class="{
            'je-active': jeStatus == '500',
            'ds-game-xz-btn ds-game-zm500': 1,
          }"
          @click="jeFn('500')"
        ></div>
        <div
          :class="{
            'je-active': jeStatus == '1000',
            'ds-game-xz-btn ds-game-zm1000': 1,
          }"
          @click="jeFn('1000')"
        ></div>
        <div class="ds-game-btn bg-00d257" :class="{ allin: isAllin }" @click="allInFn">All In</div>
        <div class="ds-game-btn bg-00d257" @click="OKGame">确定</div>
        <div class="ds-game-btn" @click="canleGame">取消</div>
      </div>
    </div>
    <block v-if="false">
      <ul class="test" v-if="timeData">
        <li>
          nowSystem: {{timeData.nowSystem}} 系统时间
        </li>
        <li>
          open: {{timeData.open}} 最新摇骰子时间
        </li>
        <li>
          ok: {{timeData.ok}} 二次确认时间
        </li>
        <li>
          startBet: {{timeData.startBet}} 下次开注开始时间 
        </li>
        <li>
          endBet: {{timeData.endBet}} 下次开注结束时间
        </li>
        <li>
          nextDraw: {{timeData.nextDraw}} 下次开奖时间
        </li>
        <li>
          系统时间更新: {{nowTime}}
        </li>
        <li>
          startBet - nowTime: {{timeData.startBet - nowTime}}
        </li>
        <li>
          endBet - nowTime: {{timeData.endBet - nowTime}}
        </li>
        <li>
          nextDraw - nowTime: {{timeData.nextDraw - nowTime}}
        </li>
      </ul>
    </block>
  </div>
</template>

<script>
import {
  GetGameTable,
  AddOrder,
  Withdrawal,
  GetVedioTime,
  GetVedio,
  baseUrl,
  AddVedio,
  QSJ,
  GetKJ,
  GetBankInfo,
  GetZNX,
  GetXZTime,
  Kj
} from "../common/api";
import { fetchVideo } from "../common/http"
import { Toast, Loadmore, Switch } from "mint-ui";
import Cookies from "js-cookie";
// import VuePlayer from './v-player'
import VuePlayer from './videoPlayer'
export default {
  name: "game",
  props: ["banlance"],
  components: {
    VuePlayer
  },
  data() {
    return {
      id: this.$route.query.id,
      _imgUrl: "",
      value: true,
      leftPo: 38,
      kj_time: 30,
      kj_data: [],
      kj_top_info: [],
      allIn: false, //allIn
      gameActive: [], //选中数组
      gameAll: 0, //总金额
      jeStatus: "", //选中金额
      gameInfo: [
        { name: "1:2", Money: 0, xzType: 2 },
        { name: "3:4", Money: 0, xzType: 2 },
        { name: "1:4", Money: 0, xzType: 2 },
        { name: "1:6", Money: 0, xzType: 2 },
        { name: "2:3", Money: 0, xzType: 2 },
        { name: "2:5", Money: 0, xzType: 2 },
        { name: "3:6", Money: 0, xzType: 2 },
        { name: "4:5", Money: 0, xzType: 2 },
        { name: "5:6", Money: 0, xzType: 2 },
        { name: "dan", Money: 0, xzType: 1 },
        { name: "1:3", Money: 0, xzType: 2 },
        { name: "3:5", Money: 0, xzType: 2 },
        { name: "1:5", Money: 0, xzType: 2 },
        { name: "2:4", Money: 0, xzType: 2 },
        { name: "2:6", Money: 0, xzType: 2 },
        { name: "4:6", Money: 0, xzType: 2 },
        { name: "1:1", Money: 0, xzType: 3 },
        { name: "2:2", Money: 0, xzType: 3 },
        { name: "3:3", Money: 0, xzType: 3 },
        { name: "4:4", Money: 0, xzType: 3 },
        { name: "5:5", Money: 0, xzType: 3 },
        { name: "6:6", Money: 0, xzType: 3 },
        { name: "shuang", Money: 0, xzType: 1 },
        { name: "dan1", Money: 0, xzType: 1 },
        { name: "shuang1", Money: 0, xzType: 1 }
      ], //金额数据组合
      grxz: 0, // 1 个人限注
      grtm: 0, // 2 个人特马
      grdz: 0, // 3 个人对子
      xzlimt: {},
      currentTime: 0,
      grOdds: '1:1',
      tmOdds: '1:11',
      tmSOdds: '1:12',
      dzOdds: '1:18',
      baseUrl: "",
      videoList: [],
      XZTime: 0, //游戏倒计时
      DSTime: 0, //视频播放时间
      DSTimeAll: 0, //视频播放剩余时长
      dsTimesss: 0, //视频播放倒计时
      videoName: 0, //视频播放名字

      kjdjs: 0,
      XzISOk: false,
      kjstatus: false,
      isAllin: false,
      xzTime: 0,
      timer: null,
      timer2: null,
      timer3: null,

      timeData: null,
      nowTime: null,
      timesCurrent: null
    };
  },
  created() {
    this.baseUrl = baseUrl();
    if (!this.id) {
      this.$router.push("/");
    } else {
      // this.GetVedio(); //获取视频列表
      this.getGetGameTable();
    }
  },
  mounted() {
    this.$emit('getUserInfo', this.id);
    this.timer = setInterval(()=>{
      this.$emit('getUserInfo', this.id);
    }, 15000)
    this.GetXZTime();
    this.getKj()
  },
  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer2);
    clearInterval(this.timer3);
    clearTimeout(this.timer4)
  },
  methods: {
    async GetXZTime() {
      try {
        const { Data = 0 } = await GetXZTime();
        this.xzTime = Number(Data);
      } catch (error) {
        console.log(error);
      }
    },
    init() {
      this.$nextTick(()=>{
        this.timer2 = setInterval(() => {
          var vdos = document.getElementById("videoPlay");
          if (this.$route.path == "/game") {
            if (
              this.XZTime == parseInt(vdos.currentTime) ||
              this.XZTime < parseInt(vdos.currentTime)
            ) {
              this.countDown(parseInt(vdos.currentTime));
              if (!this.kjstatus) {
                GetKJ().then(res => {});
                this.kjstatus = true;
              }
            } else {
              this.kjstatus = false;
            }
          }
        }, 1000);
      })
    },
    getGetGameTable() {
      GetGameTable().then(res => {
        console.log(res);
        if (res.Status && res.Code == 200) {
          var tempList = [];
          for (var i = 0; i < res.Data.List.length; i++) {
            if (res.Data.List[i].num.length > 0 && res.Data.List[i].num[0]) {
              tempList.unshift(res.Data.List[i]);
            } else {
              tempList.push(res.Data.List[i]);
            }
          }
          tempList.map(({num}) => {
            num = this.$_.reverse(num)
          })
          this.kj_data = tempList;
          this.kj_top_info = res.Data.GameTableList;
          if (this.kj_top_info.length > 0) {
            if (this.id == 1) {
              this.xzlimt = this.kj_top_info[0];
            } else if (this.id == 2) {
              this.xzlimt = this.kj_top_info[1];
            }
          }
        } else {
          Toast(res.Log);
        }
      });
    },
    isOverXZ(value, xzData) {
      let min = 0,
        max = 0;
      min = xzData.split("-").shift();
      max = xzData.split("-").pop();
      if (value >= min && value <= max) {
        return -1;
      } else if (value < min) {
        return 0;
      } else {
        return 1;
      }
    },
    upGame(type) {
      var that = this;
      if (this.isAllin && type) {
        this.gameActive = [type];
        const index = this.gameInfo.findIndex(i => i.name === type);
        this.gameInfo.map(i => (i.Money = 0));
        if (index >= 0) {
          this.$set(this.gameInfo, index, {
            name: this.gameInfo[index].name,
            xzType: this.gameInfo[index].xzType,
            Money: this.banlance
          });
        }
        this.gameAll = this.banlance;
        return;
      }
      if (type) {
        var jeStatus = Number(that.jeStatus);
        if (that.gameActive.indexOf(type) == "-1" && jeStatus) {
          that.gameActive.push(type);
        } else if (!that.jeStatus) {
          Toast("请先选择额度在下注！");
        }
        if (jeStatus) {
          const isOverBanlance = this.overMaxBanlance(
            this.gameAll + jeStatus,
            this.banlance
          );
          if (isOverBanlance) {
            Toast("下注金额不能大于现有金额！");
            this.gameActive.splice(-1);
            return;
          }
          var infoArr = that.gameInfo;
          var gameTemp = "";
          for (var i = 0; i < infoArr.length; i++) {
            if (infoArr[i].name == type) {
              gameTemp = i; //存在
            }
          }
          that.gameInfo[gameTemp].Money =
            Number(that.gameInfo[gameTemp].Money) + jeStatus;
        }
      }
      var tempAll = 0;
      for (var i = 0; i < that.gameInfo.length; i++) {
        var my = that.gameInfo[i].Money;
        if (my) {
          tempAll = tempAll + my;
        }
      }
      that.gameAll = tempAll;
    },
    overMaxBanlance(gameAll, banlance) {
      if (gameAll > banlance) {
        return true;
      }
      return false;
    },
    OKGame() {
      var that = this;
      var AllInJson = that.gameInfo;
      var tempGetJson = [];
      for (var i = 0; i < AllInJson.length; i++) {
        var M = AllInJson[i].Money;
        var N = AllInJson[i].name;
        tempGetJson.push(N + "|" + M);
      }
      tempGetJson = tempGetJson.toString();
      if (this.timeData && this.nowTime >= this.timeData.startBet && this.nowTime <= this.timeData.endBet) {
        if (that.gameAll && that.id) {
          Withdrawal().then(res => {
            if (res.Status && res.Code == 200) {
              if (res.Data.Banlance >= that.gameAll) {
                // 判断限注额度
                this.gameInfo.map(({ xzType, Money }) => {
                  if (xzType === 1) {
                    this.grxz += Money;
                  } else if (xzType === 2) {
                    this.grtm += Money;
                  } else {
                    this.grdz += Money;
                  }
                });
                const isOverGrxz = this.isOverXZ(
                  this.grxz,
                  this.xzlimt.PersonalRestriction
                );
                const isOverGrtm = this.isOverXZ(
                  this.grtm,
                  this.xzlimt.PersonalSpecialCodeLimit
                );
                const isOverGrdz = this.isOverXZ(
                  this.grdz,
                  this.xzlimt.IndividualToChildRestriction
                );
                if (this.grdz > 0) {
                  if (isOverGrdz > -1) {
                    Toast(
                      `下注金额${
                        isOverGrdz > 0 ? "大于" : "小于"
                      }个人对子限注！`
                    );
                    return;
                  }
                }
                if (this.grtm > 0) {
                  if (isOverGrtm > -1) {
                    Toast(
                      `下注金额${
                        isOverGrtm > 0 ? "大于" : "小于"
                      }个人特码限注！`
                    );
                    return;
                  }
                }
                if (this.grxz > 0) {
                  if (isOverGrxz > -1) {
                    Toast(
                      `下注金额${isOverGrxz > 0 ? "大于" : "小于"}个人限注！`
                    );
                    return;
                  }
                }

                var getJson = {
                  GameTableId: that.id,
                  PlayType: tempGetJson,
                  Money: that.gameAll
                };
                console.log(getJson, "getJson");
                AddOrder(getJson).then(res => {
                  console.log(res);
                  if (res.Status) {
                    Toast("下注成功！");
                    that.canleGame();
                    that.getGetGameTable();
                    that.$emit("userInfoFn");
                  } else {
                    Toast(res.Log);
                  }
                });
              } else {
                Toast("下注金额不能大于现有金额！");
              }
            } else {
              Toast(res.msg);
            }
          });
        } else {
          Toast("请选择下注！");
        }
      } else {
        Toast("未到下注时间");
      }
    },
    allInFn() {
      this.isAllin = true;
      this.clearData();

      // var jeS = Number(this.jeStatus);
      // if (this.jeStatus) {
      //   this.gameAll = 0;
      //   // var AllInJson = this.gameInfo;
      //   // for (var i = 0; i < AllInJson.length; i++) {
      //   //   AllInJson[i].Money = jeS;
      //   //   this.gameAll = Number(this.gameAll) + jeS;
      //   // }
      //   // this.allIn = true;
      // } else {
      //   Toast("请先选择额度在下注！");
      // }
    },
    clearData() {
      this.jeStatus = "";
      this.gameActive = [];
      this.gameAll = 0;
      this.gameInfo.map(i => (i.Money = 0));
    },
    jeFn(num) {
      if (this.isAllin) {
        this.clearData();
        this.isAllin = false;
      }
      if (num) {
        this.jeStatus = num;
      }
    },
    GetVedio() {
      GetVedio().then(res => {
        if (res.Status && res.Code == 200) {
          this.videoList = res.Data;
          this.init();
          this.GetVedioTime();
        } else {
          Toast(res.Log);
        }
      });
    },
    AddVedio(vName) {
      if (vName) {
        var txtName = "";
        for (var i = 0; i < this.videoList.length; i++) {
          if (vName == this.videoList[i].FileName) {
            if (i + 1 == this.videoList.length) {
              QSJ().then(res => {});
              console.log('init')
              // this.init()
              // location.reload();
              GetVedio().then(res => {
                if (res.Status && res.Code == 200) {
                  this.videoList = res.Data;
                  if (this.videoList.length > 0) {
                    txtName = this.videoList[0].FileName;
                    if (txtName) {
                      AddVedio({ VideoName: txtName }).then(res => {
                        if (res.Status) {
                          this.GetVedioTime();
                          this.getGetGameTable();
                        }
                      });
                    }
                  }
                } else {
                  Toast(res.Log);
                }
              });
            } else {
              txtName = this.videoList[i + 1].FileName;
            }
          }
        }
        if (txtName) {
          AddVedio({ VideoName: txtName }).then(res => {
            if (res.Status) {
              this.GetVedioTime();
              this.getGetGameTable();
            }
          });
        }
      }
    },
    GetVedioTime() {
      GetVedioTime().then(res => {
        console.log(res);
        if (res.Status && res.Code == 200) {
          this.XZTime = res.Data.XZTime;
          this.DSTime = res.Data.DSTime;
          this.videoName = res.Data.DSVideo;
          setTimeout(() => {
            this.playVideo();
          }, 1000);
        } else {
          Toast(res.Log);
        }
      });
    },
    playVideo() {
      var thatDSTime = this.DSTime + 1;
      console.log('currentTime', thatDSTime)
      var vdo = document.getElementById("videoPlay");
      //        setTimeout(function () {
      vdo.currentTime = thatDSTime; //开始播放的时间 s
      if (vdo.paused && this.value) {
        //判断是否处于暂停状态
        vdo.play(); //开启播放
      }
      //        },100)
    },
    playStop() {
      var myVideo = document.getElementById("videoPlay");
      myVideo.pause();
    },
    turn() {
      // if (this.value) {
      //   this.playVideo();
      // } else {
      //   this.playStop();
      // }
    },
    toIndex() {
      this.$router.push("/");
    },
    canleGame() {
      this.gameActive = [];
      this.jeStatus = "";
      this.gameAll = 0;
      this.jeStatus = "";
      var AllInJson = this.gameInfo;
      for (var i = 0; i < AllInJson.length; i++) {
        AllInJson[i].Money = 0;
      }
      console.log(this.gameInfo);
    },
    countDown(time) {
      if (this.kjdjs == 0 && !this.XzISOk) {
        if (time > this.XZTime && time < this.XZTime + this.xzTime) {
          this.kjdjs = this.xzTime - this.XZTime;
          this.XzISOk = true;
        } else if (time > this.XZTime && time > this.XZTime + this.xzTime) {
          this.kjdjs = 1;
          this.XzISOk = false;
        } else {
          this.kjdjs = this.xzTime;
          this.XzISOk = true;
        }
        this.timer3 = setInterval(() => {
          if (this.XzISOk) {
            --this.kjdjs;
            this.XzISOk = true;
            if (this.kjdjs == 0) {
              this.kjdjs = 0;
              this.XzISOk = false;
              this.AddVedio(this.videoName);
              clearInterval(this.timer3);
            }
          }
        }, 1000);
      }
    },
    updateVideo() {
      // const video = document.getElementById("videoPlay");
      // if (video) {
      //   const currentTime = video.currentTime
      //   video.pause();
      //   video.setAttribute('src', this.baseUrl + this.videoName);
      //   video.load();
      //   video.currentTime = currentTime;
      //   video.play();
      // }
    },
    async getKj () {
      try {
        const res = await Kj()
        this.timeData = res
        this.nowTime = res.nowSystem
        this.timesCurrent = res.nextDraw - res.nowSystem
        this.updateTimes();
      } catch (error) {
        console.log(error)
      }
    },
    updateTimes() {
      this.timer4 = setTimeout(() => {
        this.timesCurrent --
        this.nowTime ++ 
        if (this.timesCurrent === -1) {
          clearTimeout(this.timer4)
          this.clearKjTime()
          this.getGetGameTable()
          this.getKj()
          return
        }
        this.updateTimes()
      }, 1000)
    },
    clearKjTime() {
      this.timeData = null
      this.nowTime = null
      this.timesCurrent = null
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style <style lang="less" scoped>
.ds-switch {
  margin-left: 10px;
}
.ds-switch label {
  margin-left: 10px;
}
.ds-switch * {
  float: left;
  color: #ffffd3;
}
.ds-game-bg-z-bg {
  position: relative;
}
.hide-video {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 10;
}
.ds-game-bg-z-bg > div {
  position: absolute;
  right: -5px;
  top: 0;
  z-index: 11;
  font-size: 14px;
  line-height: initial;
  padding: 2px 3px;
  background-color: #8877ca;
  border-radius: 8px;
}
.bg-00d257 {
  &.allin {
    width: 98px;
    height: 30px;
    line-height: 30px;
    color: rgba(255, 255, 0, 1);
    border: 1px solid rgba(255, 255, 0, 1);
    background-color: #8877ca;
    box-shadow: 0 4px 5px rgba(255, 255, 0, 0.5);
  }
  &:hover {
    box-shadow: 0 4px 5px rgba(255, 255, 0, 0.5);
  }
}
.xzTime,
.xiazhu-time {
  color: #bf0e0b;
  font-size: 28px;
  font-weight: bold;
  display: block;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  border-radius: 20px;
  background-color: #fdfd76;
  margin: 8px 0 0 10px;
}
.xiazhu-time {
  position: absolute;
  top: 10px;
  right: 10px;
  margin: 0;
  z-index: 20;

  span {
    display: block;
    color: #bf0e0b;
    width: 40px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 12px;

    &.kj {
      font-size: 28px;
    }
  }
}

.test {
  margin-top: 20px;
  font-size: 14px;
  color: #fff;
  padding: 20px ;
}
</style>
