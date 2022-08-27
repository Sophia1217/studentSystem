import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken ,setToken} from '@/utils/auth'

NProgress.configure({ showSpinner: false })

// const whiteList = ['/','/login', '/auth-redirect', '/bind', '/register']
// const whiteList = ['/','/login', '/auth-redirect', '/bind', '/register']

router.beforeEach((to, from, next) => {
    // next('/');
    // return;
  NProgress.start()
    
  var token = to.query.token || ''
  //console.log('获取token1',token)
  if (token.length > 0) {
        if (token == '-1') {
            Message.error('获取用户失败！')
            // next({ path: '/' ,query:{},replace : true})
            NProgress.done()
            
        }else {
            setToken(token)
            next({ path: '/' ,query:{},replace : true})
            NProgress.done()
            
        }
  }else {
        // 尝试获取token
        token = getToken() || ''
        //console.log('获取token2',token)
        if (token.length > 0) {
            //console.log('获取token有值',token)
            if (store.getters.roles.length === 0) {
                // 判断当前用户是否已拉取完user_info信息
                store.dispatch('GetInfo').then((res) => {
                    // console.log('返回',res);
                    var roles = res.row || [];
                    if (roles.length > 1) {// 多个角色
                        next({ path: '/selectRole' })
                        
                    }else if (roles.length == 1){
                        var role = roles[0];
                        if (role.roleType == 1) { // 学生
                            store.dispatch('GenerateRoutes',role.roleId).then(() => {
                                next({ path: '/studentHomePage' })
                            })
                        } else { // 老师
                            store.dispatch('GenerateRoutes',role.roleId).then(() => {
                                next({ path: '/' })
                            })
                            
                        }
                    }else {
                        Message.error('获取用户角色失败！')
                        NProgress.done()
                    }
                }).catch(err => {
                    store.dispatch('LogOut').then(() => {
                        Message.error(err)
                        next({ path: '/' })
                    })
                })
            } else {
                // console.log('没有角色')
                next()
            }
        } else {
            // console.log('跳转登录')
            location.href = 'https://account.ccnu.edu.cn/cas/login?service=http://10.222.7.139:8081/sws/checkLogin'
            // if (to.path == '/login') {
            //     next()
            // }else {
            //     next({ path: '/login',replace: true })
            // }
            NProgress.done()
        }
  }
  
})

router.afterEach(() => {
    NProgress.done()
})
