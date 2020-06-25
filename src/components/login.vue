<template>
  <div class="contener-box clear_box login_box">
    <div class="login_from">
      <input v-model="username" class="ds-phone" type="text" maxlength="11" placeholder="账号/手机号码">
      <input v-model="password" class="ds-password" type="password" placeholder="密码">
      <div class="login_btn_get btn_bg_def ds-login-btn-def" @click="get_login">登录</div>
      <div class="contener-box clear_box">
        <div class="float_left btn_bg_def ds-login-btn-def botton-login-btn">试玩</div>
        <div class="float_right btn_bg_def ds-login-btn-def botton-login-btn" @click="register">注册</div>
      </div>
      <div class="contener-box">
        <div class="ds-cms-btn">短信验证码登录 》</div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginApi } from "../common/api";
import { Toast } from "mint-ui";
import Cookies from "js-cookie";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  created() {},
  methods: {
    register() {
      this.$router.push("/register");
    },
    get_login() {
      if (this.username && this.password) {
        let json = { username: this.username, password: this.password };
        loginApi(json).then(res => {
          console.log(res);
          if (res.Status && res.Data.token && res.Code == 200) {
            Cookies.set("token", res.Data.token);
            localStorage.setItem("token", res.Data.token);
            let instance = Toast("登录成功！");
            setTimeout(() => {
              this.$router.push({ path: "/" });
              instance.close();
            }, 1500);
          } else {
            Toast(res.Log);
          }
        });
      } else {
        Toast("手机号码或密码不能为空");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_from {
  width: 17%;
  left: 50%;
  margin-left: -20%;
  top: 42%;
  position: fixed;
}
.login_from input {
  width: 100%;
  color: #838383;
  background-color: #ffffff;
  margin-top: 15px;
  line-height: 35px;
  height: 35px;
  border-radius: 40px;
  border: 1px solid #c8c8c8;
  text-align: center;
  outline: none;
}
.ds-login-btn-def {
  line-height: 44px;
  height: 44px;
  text-align: center;
  color: #838383;
  padding: 0 3px;
  margin-top: 15px;
  cursor: pointer;
  border-radius: 44px;
}
.login_btn_get {
  width: 100%;
}
.botton-login-btn {
  width: 36%;
  margin-top: 20px;
}
.ds-cms-btn {
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;
  color: #d8cdaf;
  display: inline-block;
}
</style>
