import request from '@/utils/request'

// 查询用户列表
export function queryUserPageList(data) {
  return request({
    url: '/manager/user/queryUserPageList',
    method: 'post',
    data: data
  })
}

// 用户编辑
export function updateUserRole(data) {
  return request({
    url: '/manager/user/updateUserRole',
    method: 'post',
    data: data
  })
}

// 查询用户数据权限
export function queryDataAuth(data) {
  return request({
    url: '/manager/user/queryDataAuth',
    method: 'post',
    data: data
  })
}


// 班级查询
export function queryClassList(data) {
  return request({
    url: '/class/queryClassList',
    method: 'post',
    data: data
  })
}

// 人员查询
export function queryStuList(data) {
  return request({
    url: '/class/queryStuList',
    method: 'post',
    data: data
  })
}

// 数据权限更新
export function updateDataAuth(data) {
  return request({
    url: '/manager/user/updateDataAuth',
    method: 'post',
    data: data
  })
}