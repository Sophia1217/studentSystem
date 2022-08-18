import axios from 'axios'
import { Notification, MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { tansParams, blobValidate } from "@/utils/ruoyi";
import cache from '@/plugins/cache'
import { saveAs } from 'file-saver'

let loading
var startLoading = function () {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

var endLoading = function () { 
  loading && loading.close()
}

let downloadLoadingInstance;
// 是否显示重新登录
export let isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
//   const isToken = (config.headers || {}).isToken === false
  // 是否需要防止数据重复提交
//   const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
  const isRepeatSubmit =  true
  if (getToken() ) {
    // config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改 accessToken
    config.headers['accessToken'] =  getToken() // 让每个请求携带自定义token 请根据实际情况自行修改 
  }
  config.headers['uuid'] = new Date().getTime()
  config.headers['clientId'] = '111'
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
    const requestObj = {
      url: config.url,
      data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
      time: new Date().getTime()
    }
    const sessionObj = cache.session.getJSON('sessionObj')
    if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
      cache.session.setJSON('sessionObj', requestObj)
    } else {
      const s_url = sessionObj.url;                  // 请求地址
      const s_data = sessionObj.data;                // 请求数据
      const s_time = sessionObj.time;                // 请求时间
      const interval = 1000;                         // 间隔时间(ms)，小于此时间视为重复提交
      if (s_data === requestObj.data && requestObj.time - s_time < interval && s_url === requestObj.url) {
        const message = '数据正在处理，请勿重复提交';
        console.warn(`[${s_url}]: ` + message)
        return Promise.reject(new Error(message))
      } else {
        cache.session.setJSON('sessionObj', requestObj)
      }
    }
  }
  startLoading()
  return config
}, error => {
  // console.log(error)
  endLoading()
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  const code = res.data.errcode || '00';
  // 获取错误信息
  const msg =  res.data.errmsg || errorCode[code] || errorCode['default']
  // 二进制数据则直接返回
  if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
    return res.data
  }
  endLoading()
//   if (code === 401) {
//     if (!isRelogin.show) {
//       isRelogin.show = true;
//       MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
//         confirmButtonText: '重新登录',
//         cancelButtonText: '取消',
//         type: 'warning'
//       }
//       ).then(() => {
//         isRelogin.show = false;
//         store.dispatch('LogOut').then(() => {
//         //   location.href = '/index';
//           location.href = 'https://account.ccnu.edu.cn/cas/logout?service=http://10.222.7.139/'; //  https://account.ccnu.edu.cn/cas/logout?service= http://ip:port/Cas1/
//         })
//       }).catch(() => {
//         isRelogin.show = false;
//       });
//     }
//     return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
//   } else if (code === 500) {
//     Message({
//       message: msg,
//       type: 'error'
//     })
//     return Promise.reject(new Error(msg))
//   } else if (code !== 200) {
//     Notification.error({
//       title: msg
//     })
//     return Promise.reject('error')
//   } else {
//     return res.data
//   }
    if (code === 'EC-000006' ) { // || code === 'EC-000005'
        console.log('登录失效',res)
        // let outLength = '/loginout'.length
        // let allLength = res.request.responseURL.length
        // console.log('当前url',res.request.responseURL)
        // if (res.request.responseURL.substr(allLength-outLength,outLength) === '/loginout') {
        //     console.log('当前是登出操作')
        // //     location.href = '/index';
        // //     return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        // }
        let doms = document.getElementsByClassName('el-message-box')[0]
        if(doms === undefined){
            MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
            }
            ).then(() => {
            store.dispatch('LogOut').then(() => {
                //   console.log('接口调用成功，执行登出')
                location.href = 'https://account.ccnu.edu.cn/cas/logout?service=' + location.protocol+'//' + location.host ;
            }).catch(() => {
                // console.log('接口调用失败，执行登出')
                location.href = 'https://account.ccnu.edu.cn/cas/logout?service=' + location.protocol+'//' + location.host ;
            });
            }).catch(() => {});
        }
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 'EC-000302') { // 
        // redirectUrl 
        location.href = res.redirectUrl; 
        // location.href = 'https://account.ccnu.edu.cn/cas/login?service=http://10.222.7.139:8081/' 
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    }else if (code === 500) {
        Message({
            message: msg,
            type: 'error'
        })
        return Promise.reject(new Error(msg))
    } else if (code !== "00") {
    //   Notification.error({
    //     title: msg
    //   })
        Message({
            message: msg,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(new Error(msg))
    //   return Promise.reject('error')
    } else {
        return res.data
    }
},
  error => {
    endLoading()
    console.log('err' + error)
    console.log("错误代码:",error.code)

    let { message ,code} = error;
    if (code == 302) {
        console.log('302')
        return Promise.reject(error);
    }
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// 通用下载方法
export function download(url, params, filename) {
  downloadLoadingInstance = Loading.service({ text: "正在下载数据，请稍候", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)", })
  return service.post(url, params, {
    transformRequest: [(params) => { return tansParams(params) }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'blob'
  }).then(async (data) => {
    const isLogin = await blobValidate(data);
    if (isLogin) {
      const blob = new Blob([data])
      saveAs(blob, filename)
    } else {
      const resText = await data.text();
      const rspObj = JSON.parse(resText);
      const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
      Message.error(errMsg);
    }
    downloadLoadingInstance.close();
  }).catch((r) => {
    console.error(r)
    Message.error('下载文件出现错误，请联系管理员！')
    downloadLoadingInstance.close();
  })
}

export default service
