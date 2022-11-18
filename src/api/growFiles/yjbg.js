import request from '@/utils/request'

// 查询
export function queryLwqkList(query) {
  return request({
    url: '/czdaYjbg/queryYjbgList',
    method: 'post',
    data: query
  })
}
//删除
export function deleteLwqk(query) {
    return request({
      url: '/czdaYjbg/deleteYjbg',
      method: 'post',
      data: query
    })
  }

//审核撤销
export function cxLwqk(query) {
    return request({
      url: '/czdaYjbg/cxById',
      method: 'post',
      data: query
    })
  }
  
//新增修改
export function importCzdaLwqk(query) {
    return request({
      url: '/czdaYjbg/importCzdaYjbg',
      method: 'post',
      data: query
    })
  }
  //提交审核
export function tjLwqk(query) {
    return request({
      url: '/czdaYjbg/tjById',
      method: 'post',
      data: query
    })
  }
