import request from '@/utils/request'

// 查询用户列表
export function queryUserPageList(data) {
  return request({
    url: '/sws/manager/user/queryUserPageList',
    method: 'post',
    data: data
  })
}

// 用户编辑
export function updateUserRole(data) {
  return request({
    url: '/sws/manager/user/updateUserRole',
    method: 'post',
    data: data
  })
}