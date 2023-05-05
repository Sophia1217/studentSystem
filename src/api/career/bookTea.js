import request from '@/utils/request'

//预约详情
export function getSyfzXsyyDetail(data) {
  return request({
    url: '/syfzXsyy/getSyfzXsyyDetail',
    method: 'get',
    params: data
  })
}
//老师同意预约
export function lsPass(data) {
  return request({
    url: '/syfzXsyy/lsCheckSubscribe',
    method: 'post',
    data: data
  })
}
//老师拒绝预约
export function lsRefuse(data) {
  return request({
    url: '/syfzXsyy/lsRefuseSubscribe',
    method: 'post',
    data: data
  })
}
//老师待处理
export function queryDshList(query) {
  return request({
    url: '/syfzXsyy/querySyfzXsyyLsDclList',
    method: 'post',
    data: query
  })
}
//老师已处理
export function queryYshList(query) {
  return request({
    url: '/syfzXsyy/querySyfzXsyyLsYclList',
    method: 'post',
    data: query
  })
}
//老师取消预约
export function lsCancel(data) {
  return request({
    url: '/syfzXsyy/lsCancelSubscribe',
    method: 'post',
    data: data
  })
}
//老师更改实际咨询时间
export function updateSjZxsj(data) {
  return request({
    url: '/syfzXsyy/updateSjZxsj',
    method: 'post',
    data: data
  })
}

