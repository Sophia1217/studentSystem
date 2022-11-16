import request from '@/utils/request'

// 论文期刊列表查询
export function queryLwqkList(query) {
  return request({
    url: '/czdaLwqk/queryLwqkList',
    method: 'post',
    data: query
  })
}
///czdaLwqk/deleteLwqk论文期刊删除
export function deleteLwqk(query) {
    return request({
      url: '/czdaLwqk/deleteLwqk',
      method: 'post',
      data: query
    })
  }
///czdaLwqk/cxById论文期刊审核撤销
export function cxLwqk(query) {
    return request({
      url: '/czdaLwqk/cxById',
      method: 'post',
      data: query
    })
  }
  
//论文期刊新增修改
export function importCzdaLwqk(query) {
    return request({
      url: '/czdaLwqk/importCzdaLwqk',
      method: 'post',
      data: query
    })
  }
  //论文期刊提交审核
export function tjLwqk(query) {
    return request({
      url: '/czdaLwqk/tjById',
      method: 'post',
      data: query
    })
  }
