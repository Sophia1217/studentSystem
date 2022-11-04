import request from '@/utils/request'

// /czdaZgrz/cxById资格认证审核撤销
export function cxById(query) {
  return request({
    url: '/czdaZgrz/cxById',
    method: 'post',
    data: query
  })
}
//删除
export function deleteZgrz(query) {
    return request({
      url: '/czdaZgrz/deleteZgrz',
      method: 'post',
      data: query
    })
  }
//查询
  export function queryZgrzList(query) {
    return request({
      url: '/czdaZgrz/queryZgrzList',
      method: 'post',
      data: query
    })
  }
//更新
  export function importCzdaZgrz(query) {
    return request({
      url: '/czdaZgrz/importCzdaZgrz',
      method: 'post',
      data: query
    })
  }
  //审核
  export function tjById(query) {
    return request({
      url: '/czdaZgrz/tjById',
      method: 'post',
      data: query
    })
  }