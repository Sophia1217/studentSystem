

import request from '@/utils/request'

//学年查询
export function queryXn(query) {
    return request({
      url: '/commonMethod/queryXn',
      method: 'post',
      data: query
    })
  }
  
//学年小结设置查询
export function queryRcswXnxjsz(query) {
  return request({
    url: '/rcswXnxjsz/queryRcswXnxjsz',
    method: 'post',
    data: query
  })
}
//学年小结设置新增
export function importRcswXnxjsz(query) {
  return request({
    url: '/rcswXnxjsz/importRcswXnxjsz',
    method: 'post',
    data: query
  })
}
//学年小结设置开关修改
export function switchRcswXnxjsz(query) {
  return request({
    url: '/rcswXnxjsz/switchRcswXnxjsz',
    method: 'post',
    data: query
  })
}

//教师端-待审核列表导出
export function exportDsh(query) {
  return request({
    url: '/rcswXnxjFlow/excelExportRcswXnxjFlow',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//教师端-已处理列表导出
export function exportYsh(query) {
  return request({
    url: '/rcswXnxjFlow/excelExportRcswXnxjFlowed',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//教师端-已审核列表查询
export function queryYshList(query) {
  return request({
    url: '/rcswXnxjFlow/queryXnxjFlowedList',
    method: 'post',
    data: query
  })
}
//教师端-待审核列表查询
export function queryDshList(query) {
  return request({
    url: '/rcswXnxjFlow/queryXnxjFlowList',
    method: 'post',
    data: query
  })
}






