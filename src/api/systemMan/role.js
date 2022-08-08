import request from '@/utils/request'

// 查询角色列表
export function queryRoleList(data) {
  return request({
    url: '/sws/manager/role/queryRoleList',
    method: 'post',
    data: data
  })
}