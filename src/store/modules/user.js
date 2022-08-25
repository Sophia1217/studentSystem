import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    userId:'',
    roleId : '',
    roleType : '',
    avatar: '',
    pycc:'',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    },
    SET_ROLEID: (state, roleId) => {
        state.roleId = roleId
    },
    SET_ROLETYPE: (state, roleType) => {
        state.roleType = roleType
    },
    SET_PYCC: (state, pycc) => {
      state.pycc = pycc
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid).then(res => {
          setToken(res.token)
          commit('SET_TOKEN', res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
            getInfo().then(res => {
                // console.log('获取用户信息返回值',res)
                const avatar = require("@/assets/images/avatar.png")
                var roles = res.row || []
                if (roles.length > 0) { // 验证返回的roles是否是一个非空数组
                  commit('SET_ROLES', roles)
                  
                    if (roles.length == 1){
                        var role = roles[0];
                        commit('SET_USERID',role.userId)
                        commit('SET_ROLEID',role.roleId)
                        commit('SET_ROLETYPE',role.roleType)
                        
                    }
                    

                //   commit('SET_PERMISSIONS', res.permissions)
                } else {
                //     console.log('默认角色')
                //   commit('SET_ROLES', ['ROLE_DEFAULT'])
                    reject()
                }
              
              commit('SET_NAME', res.user.xm)
              commit('SET_PYCC',res.user.pycc)
              commit('SET_AVATAR', avatar)

                resolve(res)
              }).catch(error => {
                // console.log('用户信息错误',error)
                reject(error)
              })
      })
    },

    SaveRole({commit},role){
        return new Promise((resolve, reject) => {
            commit('SET_USERID',role.userId)
            commit('SET_ROLEID',role.roleId)
            commit('SET_ROLETYPE',role.roleType)
            resolve()
        })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
