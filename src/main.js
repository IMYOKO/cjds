// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/css/app.css'
import VueScroller from 'vue-scroller'
import Cookies from 'js-cookie'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(MintUI)
Vue.use(ElementUI)
Vue.use(VueScroller)
Vue.use(Cookies)
Vue.config.productionTip = false
new Vue(router)

router.beforeEach((to, from, next)=>{
    // let token = localStorage.getItem("token");
  let token = Cookies.get('token');
  console.log(encodeURIComponent(token),'token')
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if(token && token!='null' && token!='undefined'){
        if(to.path == '/login'){
            next({path: '/'});
        }else{
            next();
        }
    }
    else{
        if(to.path == '/login'){
            next();
        }else {
            next('/login');
        }
    }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


