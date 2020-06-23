import axios from 'axios';
import { Toast,Indicator} from 'mint-ui';
import router from '../router'
import Cookies from 'js-cookie'

// 默认超时设置
// axios.defaults.timeout = 5000;
// 开启cookie
// axios.defaults.withCredentials =true;

// 相对路径设置
axios.defaults.baseURL ='';

//http request 拦截器
axios.interceptors.request.use(
    config => {
        // 获取token
        const token = Cookies.get('token')?Cookies.get('token'):localStorage.getItem('token');
        // 设置参数格式
        if(!config.headers['Content-Type']){
            config.headers = {
                'Content-Type':'application/json;charset=UTF-8'
            };
        }
        // 添加token到headers
        if(token){
            config.headers.token = encodeURIComponent(token)
        }
        // 鉴权参数设置
        if(config.method === 'get'){
            //get请求下 参数在params中，其他请求在data中
            config.params = config.params || {};
            let json = JSON.parse(JSON.stringify(config.params));
            //一些参数处理
        }else{
            config.data = config.data || {};
            //一些参数处理
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

//http response 拦截器
axios.interceptors.response.use(
    response => {
        //一些统一code的返回处理
        if(response.data.code === 501){
            // 登录验证
            //做了个示例跳转项目中登录，并记录下相对路径
            router.push({
                name:'/login',//从哪个页面跳转
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error)
    }
);


/**
 * 封装get方法
 * @param url
 * @param params
 * @returns {Promise}
 */
export function fetch(url,params={}){
    return new Promise((resolve,reject) => {
        let token = localStorage.getItem('token')?localStorage.getItem('token'):Cookies.get('token');
        if(token && token!='null' && token!='undefined'){
            Indicator.open();
            axios.get(url,{
                params:params
            })
                .then(response => {
                    if(response.data.code === 200){
                        //返回成功处理  这里传的啥 后续调用的时候 res就是啥
                        resolve(response.data.data);//我们后台所有数据都是放在返回的data里所以这里统一处理了
                    }else{
                        //错误处理
                        resolve(response.data);
                    }
                    Indicator.close();
                })
                .catch(err => {
                    reject(err);
                    let message = '请求失败！请稍后再试';
                    //错误返回
                    if(err.response)message=err.response.data.message;
                    Toast(message)
                    Indicator.close();
                })
        }else{
            router.push({
                name:'/login',//从哪个页面跳转
            })
        }


    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @param login 是否是登录--唯有登录可用
 * @param upload 是否是上传图片--唯有上传图片可用
 * @returns {Promise}
 */

export function post(url,data,login,upload = {},indicators){
    return new Promise((resolve,reject) => {
        let token = localStorage.getItem('token')?localStorage.getItem('token'):Cookies.get('token');
        if(token && token!='null' && token!='undefined' || login){
            if (!indicators){
              Indicator.open();
            }
            axios.post(url,data, {
                    headers: {
                        'Content-Type':typeof upload != "object" && indicators!=1 ?'image/jpeg':'application/json;charset=UTF-8'
                    }
                })
                .then(response => {
                    if(response.data.code === 200){
                        resolve(response.data.data);
                    }else{
                        resolve(response.data);
                    }
                    Indicator.close();
                },err => {
                    reject(err);
                    let message = '请求失败！请稍后再试';
                    if(err.response)message=err.response.data.message;
                    Toast(message)
                    Indicator.close();
                })
        }else{
            if(!login){
                router.push({
                    name:'/login',//从哪个页面跳转
                })
            }
        }

    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
    return new Promise((resolve,reject) => {
        let token = localStorage.getItem('token')?localStorage.getItem('token'):Cookies.get('token');
        if(token && token!='null' && token!='undefined'){
            Indicator.open();
            axios.patch(url,data)
                .then(response => {
                    if(response.data.code === 200){
                        resolve(response.data.data);
                    }else{
                        resolve(response.data);
                    }
                    Indicator.close();
                },err => {
                    reject(err);
                    let message = '请求失败！请稍后再试';
                    if(err.response)message=err.response.data.message;
                    Toast(message)
                    Indicator.close();
                })
        }else{
            router.push({
                name:'/login',//从哪个页面跳转\
            })
        }
    })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
    return new Promise((resolve,reject) => {
        let token = localStorage.getItem('token')?localStorage.getItem('token'):Cookies.get('token');
        if(token && token!='null' && token!='undefined'){
            Indicator.open();
            axios.put(url,data)
                .then(response => {
                    if(response.data.code === 200){
                        resolve(response.data.data);
                    }else{
                        resolve(response.data);
                    }
                    Indicator.close();
                },err => {
                    reject(err);
                    let message = '请求失败！请稍后再试';
                    if(err.response)message=err.response.data.message;
                    Toast(message)
                    Indicator.close();
                })
        }else{
            router.push({
                name:'/login',//从哪个页面跳转
                query:{
                    retUrl:window.location.href.split('#')[1] || '',
                    is_new_user_url:1
                }
            })
        }
    })
}

export function del(url,data = {}){
    return new Promise((resolve,reject) => {
        let token = localStorage.getItem('token')?localStorage.getItem('token'):Cookies.get('token');
        if(token && token!='null' && token!='undefined'){
            Indicator.open();
            axios.delete(url,data)
                .then(response => {
                    if(response.data.code === 200){
                        resolve(response.data.data);
                    }else{
                        resolve(response.data);
                    }
                    Indicator.close();
                },err => {
                    reject(err);
                    let message = '请求失败！请稍后再试';
                    if(err.response)message=err.response.data.message;
                    Toast(message)
                    Indicator.close();
                })
        }else{
            router.push({
                name:'/login',//从哪个页面跳转
            })
        }
    })
}
