import request from '@/utils/request'

// 查询
export function queryLwqkList(query) {
  return request({
    url: '/czdaZl/queryZlList',
    method: 'post',
    data: query
  })
}
//删除
export function deleteLwqk(query) {
    return request({
      url: '/czdaZl/deleteZl',
      method: 'post',
      data: query
    })
  }

//专利审核撤销
export function cxLwqk(query) {
    return request({
      url: '/czdaZl/cxById',
      method: 'post',
      data: query
    })
  }
  
//新增修改
export function importCzdaLwqk(query) {
    return request({
      url: '/czdaZl/importCzdaZl',
      method: 'post',
      data: query
    })
  }
  //提交审核
export function tjLwqk(query) {
    return request({
      url: '/czdaZl/tjById',
      method: 'post',
      data: query
    })
  }
