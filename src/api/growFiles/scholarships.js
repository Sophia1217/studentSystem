import request from '@/utils/request'

// /jxj/insertJxj奖学金新增
export function insertJxj(query) {
  return request({
    url: '/jxj/insertJxj',
    method: 'post',
    data: query
  })
}
//奖学金删除
export function deleteJxj(query) {
    return request({
      url: '/jxj/deleteJxj',
      method: 'post',
      data: query
    })
  }
///jxj/queryJxjList奖学金查询
  export function queryJxjList(query) {
    return request({
      url: '/jxj/queryJxjList',
      method: 'post',
      data: query
    })
  }
//奖学金更新
  export function updateJxj(query) {
    return request({
      url: '/jxj/updateJxj',
      method: 'post',
      data: query
    })
  }