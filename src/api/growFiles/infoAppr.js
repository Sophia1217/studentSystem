import request from '@/utils/request'

//待审核列表查询
export function queryDshList(query) {
  return request({
    url: '/czdaFlow/queryCzdaFlowList',
    method: 'post',
    data: query
  })
}

//已处理列表查询
export function queryYshList(query) {
  return request({
    url: '/czdaFlow/queryCzdaFlowedList',
    method: 'post',
    data: query
  })
}
//同意操作
export function tyFlow(query) {
  return request({
    url: '/czdaFlow/tyFlow',
    method: 'post',
    data: query
  })
}

//拒绝操作
export function jjFlow(query) {
  return request({
    url: '/czdaFlow/jjFlow',
    method: 'post',
    data: query
  })
}

//可退回列表查询
export function backFlow(query) {
  return request({
    url: '/czdaFlow/queryNodeFlowed',
    method: 'get',
    params: query
  })
}
//退回操作
export function thFinal(query) {
  return request({
    url: '/czdaFlow/htFlow',
    method: 'post',
    data: query
  })
}
//待审核成长档案待审核列表导出
export function texcelExportCzdaFlow(query) {
  return request({
    url: '/czdaFlow/excelExportCzdaFlow',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//成长档案已处理列表导出
export function excelExportCzdaFlowed(query) {
  return request({
    url: '/czdaFlow/excelExportCzdaFlowed',
    method: 'post',
    responseType:"blob",
    data: query
  })
}