import auth from '@/plugins/auth'
// import store from '@/store'
import router, { constantRoutes, dynamicRoutes ,stuRoutes} from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'
import InnerLink from '@/layout/components/InnerLink'
import { getToken, setToken, removeToken} from '@/utils/auth'
import store from '..'

const cacheRoutes= {
    addRoutes : []
}

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: [],
    AUTH:[],
    AUTHFLAG:false,
    EXCELCOUNT:0,
    SJAUTH:"1"
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      cacheRoutes.addRoutes = routes || []
      state.routes = constantRoutes.concat(routes)
    },
    SET_DEFAULT_ROUTES: (state, routes) => {
      state.defaultRoutes = constantRoutes.concat(routes)
    },
    SET_TOPBAR_ROUTES: (state, routes) => {
      state.topbarRouters = routes
    },
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes
    },
    SET_AUTH: (state, AUTH) => {
      state.AUTH = AUTH
    },
    SET_AUTHFLAG: (state, AUTHFLAG) => {
      state.AUTHFLAG = AUTHFLAG == "1" ? true :false
    },
    EXCELCOUNT:(state, EXCELCOUNT) => {
      state.EXCELCOUNT =  Number(EXCELCOUNT)
    },
    SET_SJAUTH:(state,res)=>{
      for(var i=0; i<res.length;i++){
        if( res[i].modId =='1305' && res[i].modId =='1306') { 
          state.SJAUTH ="1"}   else if(res[i].modId =='1305'){
        //书记权限是2
        state.SJAUTH ="2"
          }else{
        state.SJAUTH ="1"
      }
    }
    }
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit },roleId) {
      return new Promise(resolve => {
        // console.log('开始请求路由')
        var params = {
            roleId : roleId || ''
        }
        getRouters(params).then(res => {
            // console.log('获取用户菜单列表返回数据',res)
            var token = res.accessToken || ''
            setToken(token)
            var sdata = JSON.parse(JSON.stringify(res.menuRows))
            var rdata = JSON.parse(JSON.stringify(res.menuRows))
            var Adata = JSON.parse(JSON.stringify(res.menuRows))
            if (store.state.user.roleType == 1 ) { // 学生
                sdata = JSON.parse(JSON.stringify(stuRoutes))
                rdata = JSON.parse(JSON.stringify(stuRoutes))
                Adata = JSON.parse(JSON.stringify(stuRoutes))
            }
            const sidebarRoutes = filterAsyncRouter(sdata)
            var arr =Adata&& Adata.map(e => e.children);
            var arr1 =arr&& arr.flat();
            var tar =arr1&&arr1.map((item,index)=>{
                    return Object.assign({},{"auth":item.auth?item.auth:"","name":item.path?item.path:""})
            })
        
            commit('SET_SJAUTH', arr1)
            commit('SET_AUTH', tar)
            const rewriteRoutes = filterAsyncRouter(rdata, false, true)
            rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
            sidebarRoutes.push({ path: '*', redirect: '/404', hidden: true })
            router.addRoutes(sidebarRoutes);
            commit('SET_ROUTES', rewriteRoutes)
            commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
            commit('SET_DEFAULT_ROUTES', sidebarRoutes)
            commit('SET_TOPBAR_ROUTES', sidebarRoutes)
            resolve(rewriteRoutes)
        })
        // commit('SET_ROUTES', constantRoutes)
        // commit('SET_SIDEBAR_ROUTERS', constantRoutes)
        // commit('SET_DEFAULT_ROUTES', constantRoutes)
        // commit('SET_TOPBAR_ROUTES', constantRoutes)
        // resolve()
        // return
        // 向后端请求路由数据
        // getRouters().then(res => {
        //   const sdata = JSON.parse(JSON.stringify(res.data))
        //   const rdata = JSON.parse(JSON.stringify(res.data))
        //   const sidebarRoutes = filterAsyncRouter(sdata)
        //   const rewriteRoutes = filterAsyncRouter(rdata, false, true)
        //   const asyncRoutes = filterDynamicRoutes(dynamicRoutes);
        //   rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
        //   router.addRoutes(asyncRoutes);
        //   commit('SET_ROUTES', rewriteRoutes)
        //   commit('SET_SIDEBAR_ROUTERS', constantRoutes.concat(sidebarRoutes))
        //   commit('SET_DEFAULT_ROUTES', sidebarRoutes)
        //   commit('SET_TOPBAR_ROUTES', sidebarRoutes)
        //   resolve(rewriteRoutes)
        // })
      })
    }
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter(route => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path 
    }
    children = children.concat(el)
  })
  return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes) {
  const res = []
  routes.forEach(route => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route)
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
}

export const loadView = (view) => {
  if (process.env.NODE_ENV === 'development') {
    return (resolve) => require([`@/views/${view}`], resolve)
  } else {
    // 使用 import 实现生产环境的路由懒加载
    return () => import(`@/views/${view}`)
  }
}

export default permission
