import request from '@/utils/request'

// 查询用户列表
export function queryUserPageList(data) {
  return request({
    url: '/sws/manager/user/queryUserPageList',
    method: 'post',
    data: data
  })
}