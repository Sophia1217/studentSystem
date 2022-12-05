

import request from '@/utils/request'

//日常请销假学生请假单列表查询
export function getQJList(query) {
    return request({
      url: '/rcswrcqxj/queryRcqxjXsQjdList',
      method: 'post',
      data: query
    })
  }
  

//日常请销假学生XIAO假单列表查询
export function getXJList(query) {
  return request({
    url: '/rcswrcqxj/queryRcqxjXsXjdList',
    method: 'post',
    data: query
  })
}

//日常请假新增修改
export function importRcqxj(query) {
    return request({
      url: '/rcswrcqxj/importRcqxj',
      method: 'post',
      data: query
    })
  }

  

//日常请假学生审核撤销
export function cxById(query) {
  return request({
    url: '/rcswrcqxj/cxById',
    method: 'post',
    data: query
  })
}
///rcswrcqxj/deleteRcqxjById日常请销假删除
export function deleteRcqxjById(query) {
  return request({
    url: '/rcswrcqxj/deleteRcqxjById',
    method: 'post',
    data: query
  })
}
///rcswrcqxj/selectDetail日常请假学生详情
export function selectDetail(query) {
  return request({
    url: '/rcswrcqxj/selectDetail',
    method: 'post',
    data: query
  })
}
///rcswrcqxj/tjById日常请假学生提交审核
export function tjById(query) {
  return request({
    url: '/rcswrcqxj/tjById',
    method: 'post',
    data: query
  })
}
////rcswrcqxj/extendLeave日常请假学生续假
export function extendLeave(query) {
  return request({
    url: '/rcswrcqxj/extendLeave',
    method: 'post',
    data: query
  })
}