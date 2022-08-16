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
    
//   console.log(to.path,next(),to)
  var token = to.query.token || ''
  if (token.length > 0) {
        if (token == '-1') {
            Message.error('获取用户失败！')
            // next({ path: '/' ,query:{},replace : true})
            NProgress.done()
            return
        }else {
            setToken(token)
            next({ path: '/' ,query:{},replace : true})
            NProgress.done()
            return;
        }
  }
  // 尝试获取token
    token = getToken() || ''
    if (token.length > 0) {
        if (store.getters.roles.length === 0) {
            // 判断当前用户是否已拉取完user_info信息
            store.dispatch('GetInfo').then((res) => {
                console.log('返回',res);
                var roles = res.row || [];
                if (roles.length > 1) {// 多个角色
                    next({ path: '/selectRole' })
                    
                }else if (roles.length == 1){
                    var role = roles[0];
                    if (role.roleType == 1) { // 学生
                        store.dispatch('GenerateRoutes',role.roleId).then(() => {
                            
                        })
                        next({ path: '/studentHomePage' })
                    } else { // 老师
                        next({ path: '/' })
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
            next()
        }
    } else {
        location.href = 'https://account.ccnu.edu.cn/cas/login?service=http://10.222.7.139:8081/sws/checkLogin'
        NProgress.done()
    }
})

router.afterEach(() => {
    NProgress.done()
})
