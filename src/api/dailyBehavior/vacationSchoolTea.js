import request from '@/utils/request'

//教师端-待审核列表
export function queryDshList(data) {
  return request({
    url: '/rcswJqlxlx/queryLxlxsqFlowList',
    method: 'post',
    data: data
  })
}
//教师端-已审核列表
export function queryYshList(data) {
  return request({
    url: '/rcswJqlxlx/queryLxlxsqFlowedList',
    method: 'post',
    data: data
  })
}
//教师端-同意
export function tyFlow(data) {
  return request({
    url: '/rcswJqlxlx/tyFlow',
    method: 'post',
    data: data
  })
}
//教师端-拒绝
export function jjFlow(data) {
  return request({
    url: '/rcswJqlxlx/jjFlow',
    method: 'post',
    data: data
  })
}
//待审核列表导出
export function exportDsh(query) {
  return request({
    url: '/rcswJqlxlx/excelExportDsh',
    method: 'post',
    responseType: "blob",
    data: query
  })
}
//已处理列表导出
export function exportYsh(query) {
  return request({
    url: '/rcswJqlxlx/excelExportYsht',
    method: 'post',
    responseType: "blob",
    data: query
  })
}
