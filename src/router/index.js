import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import game from '@/components/game'
import login from '@/components/login'
import register from '@/components/register'
// import Test from '@/test/test'

Vue.use(Router)

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

//meta-logintype:判断该路由是否需要登录权限
export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index,
            meta: {
                title: '长城单双',
                logintype: true
            }
        },
        {
            path: '/game',
            name: 'game',
            component: game,
            meta: {
                title: '长城单双-开始游戏',
                logintype: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: login,
            meta: {
                title: '登录',
                logintype: false
            }
        },
        {
            path: '/register',
            name: 'register',
            component: register,
            meta: {
                title: '注册',
                logintype: false
            }
        }
    ]
})
