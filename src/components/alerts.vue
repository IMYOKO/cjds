<template>
  <div v-show="showType" class="ds-alerts-box">
    <div class="ds-alerts-title1 clear_box">
      {{alertTitle}}
      <span class="ds-alert-close" @click="dsAlertClose">关闭</span>
    </div>
    <div class="ds-alerts-cont">
      <input v-model="pwd" type="password" placeholder="请输入旧密码">
      <input v-model="pwd2" type="password" placeholder="请输入新密码">
      <input v-model="newpwd" type="password" placeholder="再次输入新密码">
      <div class="contener-box clear_box">
        <div class="ds-alerts-ok float_left" @click="okAlert">确认</div>
        <div class="ds-alerts-cancel float_right" @click="dsAlertClose">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
  import { UpdatePassWord,UpdateTKPassWord } from "../common/api";
  import { Toast} from 'mint-ui';
  import Cookies from 'js-cookie'
  export default {
    props: ['ptitle','type','show'], // 父组件传入数据， 数组形式,type类别
    data () {
      return {
        pwd: '',
        pwd2: '',
        newpwd: '',

        alertTitle: '',
        alertType:'',
        showType:''
      }
    },
    created(){
    },
    methods: {
      okAlert(){
        let that = this;
        if (that.pwd){
          console.log(that.alertType)
          if(that.newpwd == that.pwd2 && that.newpwd && that.pwd2){
            var json = {'Password':that.pwd,'Newpassword':that.newpwd}
            console.log(json)
            if(that.alertType == 1){ //alertType qk - 1, mm -2
              UpdateTKPassWord(json).then(res=>{
                console.log(res)
                if(res.Status){
                  that.dsAlertClose();
                  Toast('修改提款密码成功！');
                  that.nullInput();
                  that.dsAlertClose();
                }else {
                  Toast(res.Log);
                }
              });
            }
            else if (that.alertType == 2){
              UpdatePassWord(json).then(res=>{
                console.log(res)
                if(res.Status){
                  that.dsAlertClose();
                  Toast('修改账号密码成功，请重新登录！');
                  Cookies.set('token', '');
                  var cookie = Cookies.get('token');
                  if(!cookie){
                    setTimeout(()=>{this.$router.push({path:'/login'});instance.close();}, 1500);
                  }
                }else {
                  Toast(res.Log);
                }
              });
            }
          }else {
            Toast('两次密码不一致或不能为空');
          }

        }else {
          Toast('旧密码不能为空');
        }
      },
      nullInput(){
        this.pwd = ''
        this.pwd2 = ''
        this.newpwd = ''
      },
      dsAlertClose(){
        this.$emit('showalert',false);
        this.$emit('isShow',true);
        this.nullInput();
      },
    },
    mounted: function () {
      if (this.ptitle){
        this.alertTitle = this.ptitle;
      }
      if (this.type){
        this.alertType = this.type;
      }
      if (this.show){
        this.showType = true;
      }else {
        this.showType = false;
      }
    },
    // 更新的时候运动
    updated: function () {
    },
    watch: {
      ptitle(val) { //即为父组件的值，val参数为值
        this.alertTitle = val //将父组件的值赋给子组件的值
      },
      type(val) {
        this.nullInput();
        this.alertType = val
      },
      show(val) {
        this.showType = val
      },
    }
  }
</script>
<style scoped>
  .ds-alerts-box{ width: 560px; left: 50%; margin-left: -280px; top: 25%; position: fixed;}
  .ds-alerts-title1{ padding-left: 50px; text-align: center; font-weight: bold; background-color: #1f110e; color: #ffffff;}
  .ds-alerts-cont{ background-color: #553d31; padding: 30px 120px;}
  .ds-alerts-cont input{ padding: 0 50px; margin-bottom: 25px; outline: none; text-align: center; color: #ffffff; height: 42px; border-radius: 42px; background-color: #1f110e; border: 0;}
  .ds-alerts-ok,.ds-alerts-cancel{ width: 40%; text-align: center; height: 34px; border-radius: 34px; line-height: 34px; color: #1f110e; font-size: 18px; cursor: pointer;}
  .ds-alerts-ok{ background-color: #cccccc;}
  .ds-alerts-cancel{ background-color: #c38f53;}
</style>
