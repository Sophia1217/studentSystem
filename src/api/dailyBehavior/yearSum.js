

import request from '@/utils/request'

//学年查询
export function queryXn(query) {
    return request({
      url: '/commonMethod/queryXn',
      method: 'post',
      data: query
    })
  }
  
//学年小结设置查询
export function queryRcswXnxjsz(query) {
  return request({
    url: '/rcswXnxjsz/queryRcswXnxjsz',
    method: 'post',
    data: query
  })
}
//学年小结设置新增
export function importRcswXnxjsz(query) {
  return request({
    url: '/rcswXnxjsz/importRcswXnxjsz',
    method: 'post',
    data: query
  })
}
//学年小结设置开关修改
export function switchRcswXnxjsz(query) {
  return request({
    url: '/rcswXnxjsz/switchRcswXnxjsz',
    method: 'post',
    data: query
  })
}