import request from '@/utils/request'

//教师端-待审核列表导出
export function exportDsh(query) {
  return request({
    url: '/rcswJzsq/excelExportRcswJzsqFlow',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//教师端-已处理列表导出
export function exportYsh(query) {
  return request({
    url: '/rcswJzsq/excelExportRcswJzsqFlowed',
    method: 'post',
    responseType:"blob",
    data: query
  })
}
//教师端-已审核列表查询
export function queryYshList(query) {
  return request({
    url: '/rcswJzsq/queryJzsqFlowedList',
    method: 'post',
    data: query
  })
}
//教师端-待审核列表查询
export function queryDshList(query) {
  return request({
    url: '/rcswJzsq/queryJzsqFlowList',
    method: 'post',
    data: query
  })
}
//同意操作
export function tyFlow(query) {
  return request({
    url: '/rcswJzsq/tyFlow',
    method: 'post',
    data: query
  })
}
//拒绝操作
export function jjFlow(query) {
  return request({
    url: '/rcswJzsq/jjFlow',
    method: 'post',
    data: query
  })
}
//退回操作
export function thFinal(query) {
  return request({
    url: '/rcswJzsq/htFlow',
    method: 'post',
    data: query
  })
}
//学生端教师端-奖助申请-详情查询
export function getDetail(query) {
  return request({
    url: '/rcswJzsq/queryJzsqDetail',
    method: 'post',
    data: query
  })
}
//教师端-奖助申请-查询所有可申请资助项目的等级
export function queryAllDjByList(query) {
  return request({
    url: '/rcswJzsq/queryAllDjByZzxmIdList',
    method: 'post',
    data: query
  })
}
//教师端-批量修改
export function tjdjUpdate(query) {
  return request({
    url: '/rcswJzsq/teaUpdateByBatch',
    method: 'post',
    data: query
  })
}















