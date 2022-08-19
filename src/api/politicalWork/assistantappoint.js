import request from '@/utils/request'

//辅导员列表
//sws/fdyrm/queryList
export function fdyList(query) {
    return request({
      url: '/assistant/queryList',
      method: 'post',
      data: query
    })
  }

// 辅导员免去
export function removeMoreAssistant(data) {
  return request({
    url: '/assistant/dismiss',
    method: 'post',
    data: data
  })
}
// //任命辅导员
 export function addOneAssistant(data) {
  return request({
    url: '/assistant/commission',
    method: 'post',
    data: data
  })
}
//查看详情
export function lookDetail(data) {
  return request({
    url: '/assistant/detail',
    method: 'post',
    data: data
  })
}
//导出

export function outAssistant(data) {
  return request({
    url: '/assistant/excelTest',
    method: 'post',
    data: data
  })
}