import request from '@/utils/request'

//排班信息列表
export function queryPbList(query) {
  return request({
    url: '/syfzXsyy/querySyfzXsyyPbList',
    method: 'post',
    data: query
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
//咨询师详情排班列表
export function queryZxsPbxxYyzt(query) {
  return request({
    url: 'syfzZxsb/queryZxsPbxxYyzt',
    method: 'post',
    data: query
  })
}









