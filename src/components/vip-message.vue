<template>
    <div class="pop-up-window" v-if="show">
        <div class="pop-up-window-wrapper vip-message-wrapper">
            <div class="pop-up-header">
                <p>消息</p>
                <span class="closed-btn" @click="updateModal(false)">关闭</span>
            </div>
            <div class="pop-up-body">
                <div class="vip-message-content">
                    <div class="vip-message-content-box">
                        <ul class="vip-message-list" v-if="list.length>0">
                            <li v-for="({MContent, AddTime}, index) in list" :key="index">
                                <div class="description-box">{{MContent}}</div>
                                <div class="time">{{AddTime}}</div>
                            </li>
                        </ul>
                        <div class="no-data" v-else>暂无数据</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { GetZNX } from "../common/api";
export default {
  data() {
    return {
      show: false,
      list: []
    };
  },
  mounted() {
    this.GetZNX();
  },
  methods: {
    async GetZNX() {
      try {
        const { Data = [] } = await GetZNX();
        this.list = Data;
      } catch (error) {
        console.log(error);
      }
    },
    updateModal(flag) {
      this.show = flag;
    }
  }
};
</script>

<style lang="less" scoped>
.vip-message-wrapper {
  .vip-message-content {
    padding: 10px 20px;

    &-box {
      height: 320px;
      overflow-y: auto;

      .no-data {
        text-align: center;
        font-size: 16px;
        color: #fff;
        opacity: 0.5;
      }

      .vip-message-list {
        color: #fff;
        margin: 0;
        padding: 0;
        li {
          padding-bottom: 10px;
          border-bottom: 1px solid #313131;
          .description-box {
            font-size: 18px;
            line-height: 26px;
          }
          .time {
            font-size: 14px;
            line-height: 20px;
            margin-top: 2px;
            opacity: 0.5;
          }
        }
      }
    }
  }
}
</style>
