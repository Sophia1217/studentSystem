import request from '@/utils/request'

// 查询角色列表
export function queryRoleList(data) {
  return request({
    url: '/sws/manager/role/queryRoleList',
    method: 'post',
    data: data
  })
}

//查询树结构
export function queryTreeList(data) {
  return request({
    url: '/sws/manager/role/menuList',
    method: 'post',
    data: data
  })
}

//新增数据提交
export function savaTreeList(data) {
  return request({
    url: '/sws/manager/role/saveRole',
    method: 'post',
    data: data
  })
}


//删除
export function deleteList(data) {
  return request({
    url: '/sws/manager/role/deleteRole',
    method: 'post',
    data: data
  })
}

//编辑数据提交
export function savaEditList(data) {
  return request({
    url: '/sws/manager/role/updateRole',
    method: 'post',
    data: data
  })
}
