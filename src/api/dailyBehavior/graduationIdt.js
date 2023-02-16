import request from '@/utils/request'

//鉴定表查询

export function queryRcswJdbsz(query) {
    return request({
      url: '/rcswJdbsz/queryRcswJdbsz',
      method: 'post',
      data: query
    })
  }
  

//鉴定表新增
export function importRcswJdbsz(query) {
  return request({
    url: '/rcswJdbsz/importRcswJdbsz',
    method: 'post',
    data: query
  })
}
//鉴定表开关修改
export function switchRcswJdbsz(query) {
  return request({
    url: '/rcswJdbsz/switchRcswJdbsz',
    method: 'post',
    data: query
  })
}
