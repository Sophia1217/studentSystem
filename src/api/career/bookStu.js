import request from '@/utils/request'

//教师列表
export function queryList(data) {
  return request({
    url: '/syfzXsyy/getSyfzXsyyDetail',
    method: 'get',
    params: data
  })
}
//预约详情
export function getSyfzXsyyDetail(data) {
  return request({
    url: '/syfzXsyy/getSyfzXsyyDetail',
    method: 'get',
    params: data
  })
}
//基本信息
export function getXsJbxx(data) {
  return request({
    url: '/syfzXsyy/getXsJbxx',
    method: 'get',
    params: data
  })
}
//预约
export function insertSyfzXsyyDetail(data) {
  return request({
    url: '/syfzXsyy/insertSyfzXsyyDetail',
    method: 'post',
    data: data
  })
}
//老师取消预约
export function lsCancelSubscribe(data) {
  return request({
    url: '/syfzXsyy/lsCancelSubscribe',
    method: 'post',
    data: data
  })
}
//老师同意预约
export function lsCheckSubscribe(data) {
  return request({
    url: '/syfzXsyy/lsCheckSubscribe',
    method: 'post',
    data: data
  })
}
//老师拒绝预约
export function lsRefuseSubscribe(data) {
  return request({
    url: '/syfzXsyy/lsRefuseSubscribe',
    method: 'post',
    data: data
  })
}
//老师待处理
export function querySyfzXsyyLsDclList(query) {
  return request({
    url: '/syfzXsyy/querySyfzXsyyLsDclList',
    method: 'post',
    data: query
  })
}
//老师已处理
export function querySyfzXsyyLsYclList(query) {
  return request({
    url: '/syfzXsyy/querySyfzXsyyLsYclList',
    method: 'post',
    data: query
  })
}
//我的预约
export function queryXsBookList(query) {
  return request({
    url: '/syfzXsyy/querySyfzXsyyXsList',
    method: 'post',
    data: query
  })
}
//学生取消预约
export function xsCancelBook(data) {
  return request({
    url: '/syfzXsyy/xsCancelSubscribe',
    method: 'get',
    params: data
  })
}
//学生评价
export function xsEvaluate(query) {
  return request({
    url: '/syfzXsyy/xsEvaluate',
    method: 'post',
    data: query
  })
}





